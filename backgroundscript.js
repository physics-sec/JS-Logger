

var blk_sites = false;
var wht_sites = false;
var blk_funcs = false;
var wht_funcs = false;

chrome.runtime.onConnect.addListener(function (port)
{
	port.onMessage.addListener(function (msg)
	{
		chrome.storage.sync.get([
			'blk_sites',
			'wht_sites',
			'blacklisted_sites',
			'whitelisted_sites',
			'blk_funcs',
			'wht_funcs',
			'blacklisted_funcs',
			'whitelisted_funcs'
			], function(result) {
			blk_sites = result.blk_sites;
			wht_sites = result.wht_sites;
			blacklisted_sites = result.blacklisted_sites;
			whitelisted_sites = result.whitelisted_sites;
			blk_funcs = result.blk_funcs;
			wht_funcs = result.wht_funcs;
			blacklisted_funcs = result.blacklisted_funcs;
			whitelisted_funcs = result.whitelisted_funcs;
		});

		if ( (!blk_sites && !wht_sites) || (blk_sites && !blacklisted_sites.includes(msg.domain)) || (wht_sites  && whitelisted_sites.includes(msg.domain)))
		{
			if ( (!blk_funcs && !wht_funcs) || (blk_funcs && !blacklisted_funcs.includes(msg.func)) || (wht_funcs  && whitelisted_funcs.includes(msg.func)))
			{
				var args = msg.args;
				if (args !== undefined)
					args = args.join(", ").substr(1);
				log_entry = '%c' + msg.domain + '\n%c' + msg.func + '\n%cparams:' + args + '\n' + msg.dump + 'returned: ' + msg.result
				console.log(log_entry, 'font-weight: bold;', 'color: blue;', '');
				console.log('-------------------------------');
			}
		}
	})
})
