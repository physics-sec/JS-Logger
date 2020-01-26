
//var port = chrome.runtime.connect();

var port;

var reconnectToExtension = function () {
    port = null;
    setTimeout(connectToExtension, 1000 * 1);
};

var connectToExtension = function () {
    port = chrome.runtime.connect();
    port.onDisconnect.addListener(reconnectToExtension);
};

connectToExtension();


window.addEventListener("message", function (event)
{
	while (port === null);
	port.postMessage(event.data);
}, false);

chrome.storage.sync.set({
	blk_sites: true,
	wht_sites: false,
	blacklisted_sites: [
		'https://www.youtube.com',
		'https://www.google.com'
	],
	whitelisted_sites: [],
	blk_funcs: false,
	wht_funcs: false,
	blacklisted_funcs: [],
	whitelisted_funcs: []
});

var s = document.createElement('script');
s.src = chrome.extension.getURL('hook.js');
document.documentElement.appendChild(s);
