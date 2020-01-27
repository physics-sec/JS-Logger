

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
			'whitelisted_funcs',
			'filter_param',
			'paramFilter'
			], function(result) {
				blk_sites = result.blk_sites;
				wht_sites = result.wht_sites;
				blacklisted_sites = result.blacklisted_sites;
				whitelisted_sites = result.whitelisted_sites;
				blk_funcs = result.blk_funcs;
				wht_funcs = result.wht_funcs;
				blacklisted_funcs = result.blacklisted_funcs;
				whitelisted_funcs = result.whitelisted_funcs;
				filter_param = result.filter_param;
				paramFilter = result.paramFilter;
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
				if (!filter_param || (filter_param && msg.args_JSLogger !== undefined && msg.args_JSLogger.includes(paramFilter)))
				{
					log_entry  = '%c' + msg.domain_JSLogger;
					log_entry += '\n%c' + msg.func_JSLogger;
					if (msg.args_JSLogger !== '')
						log_entry += '\n%cparams:' + msg.args_JSLogger;
					log_entry += '\n' + msg.dump_JSLogger;
					if (msg.result_JSLogger !== '' && msg.result_JSLogger !== undefined)
						log_entry += 'returned: ' + msg.result_JSLogger;
					if (msg.result_dump_JSLogger !== '')
						log_entry += '\n' + msg.result_dump_JSLogger;
					console.log(log_entry, 'font-weight: bold;', 'color: blue;', '');
					console.log('-------------------------------');
				}
			}
		}
	})
})
