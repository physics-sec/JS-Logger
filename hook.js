
var send_data_to_bkg = function (func, args, dump, result)
{
	var result_dump = dumpObj(result);
	if (result !== null && result !== undefined)
		result = result.toString()

	msg_JSLogger = JSON.parse(JSON.stringify({
		domain_JSLogger: window.origin,
		func_JSLogger: func,
		args_JSLogger: args,
		dump_JSLogger: dump,
		result_JSLogger: result,
		result_dump_JSLogger: result_dump
	}));
	window.postMessage(msg_JSLogger, "*");
}

var dumpObj = function (obj)
{
	dump = "";
	if (obj instanceof HTMLObjectElement && obj.data !== '')
		dump += "data: " + obj.data + "\n";

	if (obj instanceof HTMLDivElement && obj.innerHTML !== '')
		dump += "innerHTML: " + obj.innerHTML + "\n";

	if (obj instanceof HTMLFrameElement && obj.src !== '')
	{
		dump += "src: " + obj.src + "\n";
		if (obj.contentDocument && obj.contentDocument.innerHTML !== '')
			dump += "contentDocument.innerHTML: " + obj.contentDocument.innerHTML + "\n";
	}
	return dump;
}

apply_handle = {
	apply: function (target, thisArg, args)
	{
		if (args[0] != "debugger")
		{
			args_list = args.join(", ");
			dump = dumpObj(args[0]);
			result = target.apply(thisArg, args);
			send_data_to_bkg(target.name, args_list, dump, result);
			return result;
		}
	}
}

// Hooks

dont_hook = [
	"send_data_to_bkg",
	"dumpObj",
	"postMessage"
]

contexts = [
	this,
	document,
	window,
	console,
	Element.prototype
]

for (var i = contexts.length - 1; i >= 0; i--)
{
	var context = contexts[i];
	var names = [];

	for (name in context)
	{
		names.push(name);
	}

	for (var j = names.length - 1; j >= 0; j--)
	{
		var name = names[j];
		try {
			if (context[name] instanceof Function && !dont_hook.includes(name))
			{
				dont_hook.push(name);
				context[name] = new Proxy(context[name], apply_handle);
			}
		}
		catch(err) {
			continue
		}
	}
}

console.log('JS Logger: Logging ' + dont_hook.length + ' functions');
