
var send_data_to_bkg = function (func, args, dump, result)
{
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
	"postMessage",
	"send_data_to_bkg",
	"dumpObj",
	"open",
	"setTimeout"
]

window.open = new Proxy(window.open, apply_handle);
window.setTimeout = new Proxy(window.setTimeout, apply_handle);
document.createElement = new Proxy(document.createElement, apply_handle);
Element.prototype.appendChild = new Proxy(Element.prototype.appendChild, apply_handle);
Element.prototype.removeChild = new Proxy(Element.prototype.removeChild, apply_handle);
Element.prototype.addEventListener = new Proxy(Element.prototype.addEventListener, apply_handle);
Element.prototype.removeEventListener = new Proxy(Element.prototype.removeEventListener, apply_handle);

var funciones = [];
var variables = [];

for (var prop in this)
{
	if (this.hasOwnProperty(prop) && this[prop] instanceof Function && !dont_hook.includes(this[prop].name))
	{
		this[prop] = new Proxy(this[prop], apply_handle);
		funciones.push( [this[prop]] );

	}
	else if (this.hasOwnProperty(prop) && (!this[prop] instanceof Function))
	{
		variables.push( [prop, this[prop]] );
	}
}

console.log("Loaded JS Logger.")
