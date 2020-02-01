
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


function apply_handle (context) {
	context = context.toString().slice(8, -1);
	handle = {
		apply: function (target, thisArg, args)
		{
			args_list = args.join(", ");
			dump = dumpObj(args[0]);
			result = target.apply(thisArg, args);
			funcname = context + '.' + target.name
			send_data_to_bkg(funcname, args_list, dump, result);
			return result;
		}
	}
	return handle;
}

function proxyAll (contexts) {

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
				if (context[name] instanceof Function && !dont_hook.includes(context[name]))
				{
					context[name] = new Proxy(context[name], apply_handle(context));
					dont_hook.push(context[name]);
				}
			}
			catch(err) {
				continue
			}
		}
	}
}


dont_hook = [
	send_data_to_bkg,
	dumpObj,
	postMessage,
	proxyAll,
	apply_handle,
	setInterval
]

contexts = [
	this,
	document,
	console,
	Element.prototype
]

proxyAll(contexts)

setInterval(function () {
	proxyAll( [window] );
}, 100);
