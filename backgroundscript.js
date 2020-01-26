

chrome.runtime.onConnect.addListener(function (port)
{
	loadFilters = function () {
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
	}

	chrome.storage.onChanged.addListener(function(changes, namespace) {
		loadFilters();
	  });

	port.onMessage.addListener(function (msg)
	{
		if (typeof blk_sites === 'undefined')
			loadFilters();

		if ( (!blk_sites && !wht_sites) || (blk_sites && !blacklisted_sites.includes(msg.domain_JSLogger)) || (wht_sites  && whitelisted_sites.includes(msg.domain_JSLogger)))
		{
			if ( (!blk_funcs && !wht_funcs) || (blk_funcs && !blacklisted_funcs.includes(msg.func_JSLogger)) || (wht_funcs  && whitelisted_funcs.includes(msg.func_JSLogger)))
			{
				log_entry = '%c' + msg.domain_JSLogger + '\n%c' + msg.func_JSLogger + '\n%cparams:' + msg.args_JSLogger + '\n' + msg.dump_JSLogger + 'returned: ' + msg.result_JSLogger
				console.log(log_entry, 'font-weight: bold;', 'color: blue;', '');
				console.log('-------------------------------');
			}
		}
	})
})
