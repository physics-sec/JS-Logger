
var send_data_to_bkg = function (func, args, dump, result)
{
	if (result !== null && result !== undefined)
		result = result.toString()

	msg_JSLogger = JSON.parse(JSON.stringify({
		domain_JSLogger: window.origin,
		func_JSLogger: func,
		args_JSLogger: args,
		dump_JSLogger: dump,
		result_JSLogger: result
	}));
	window.postMessage(msg_JSLogger, "*");
}

var dumpObj = function (obj)
{
	dump = "";
	if (obj instanceof HTMLObjectElement)
		dump += "data: " + obj.data + "\n";

	if (obj instanceof HTMLDivElement)
		dump += "innerHTML: " + obj.innerHTML + "\n";

	if (obj instanceof HTMLFrameElement)
	{
		dump += "src: " + obj.src + "\n";
		if (obj.contentDocument)
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

dont_hook = [
	"send_data_to_bkg",
	"dumpObj",
	"postMessage"
]

for (var name in this)
	if (this[name] instanceof Function && !dont_hook.includes(this[name].name))
	{
		dont_hook.push(this[name].name);
		this[name] = new Proxy(this[name], apply_handle);
	}

var names = [];
for (name in document)
	names.push(name);

for (var i = names.length - 1; i >= 0; i--)
	if (document[names[i]] instanceof Function && !dont_hook.includes(names[i]))
	{
		dont_hook.push(name);
		document[names[i]] = new Proxy(document[names[i]], apply_handle);
	}

var names = [];
for (name in window)
	names.push(name);

for (var i = names.length - 1; i >= 0; i--)
	if (window[names[i]] instanceof Function && !dont_hook.includes(names[i]))
	{
		dont_hook.push(name);
		window[names[i]] = new Proxy(window[names[i]], apply_handle);
	}

var names = [];
for (name in console)
	names.push(name);

for (var i = names.length - 1; i >= 0; i--)
	if (console[names[i]] instanceof Function && !dont_hook.includes(names[i]))
	{
		dont_hook.push(name);
		console[names[i]] = new Proxy(console[names[i]], apply_handle);
	}

var names = [];
for (name in Element.prototype)
	names.push(name);

for (var i = names.length - 1; i >= 0; i--)
{
	try {
		if (Element.prototype[names[i]] instanceof Function && !dont_hook.includes(names[i]))
		{
			dont_hook.push(name);
			Element.prototype[names[i]] = new Proxy(Element.prototype[names[i]], apply_handle);
		}
	}
	catch(err) {
		continue
	}
}

