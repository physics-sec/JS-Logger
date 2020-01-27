
function checkDomain(domain) {
	success = true;
	var status = document.getElementById('status');

	if(domain === '')
	{
		success = false;
		status.textContent = 'The domain can\'t be empty';
	}
	else if(!/^((http|https):\/\/)/.test(domain))
	{
		success = false;
		status.textContent = 'The domain must start with http(s)://';
	}
	else if (domain.replace('://', '').includes('/'))
	{
		success = false;
		status.textContent = 'Domains can\'t have slashes';
	}
	if (!success)
	{
		setTimeout(function() {
			status.textContent = '';
		}, 1000);
	}
	return success;
}

function checkFunction(funcname) {
	success = true;
	var status = document.getElementById('status');

	if(funcname === '')
	{
		success = false;
		status.textContent = 'The function name can\'t be empty';
	}
	else if(funcname.includes(' '))
	{
		success = false;
		status.textContent = 'The function name can\'t have spaces';
	}
	if (!success)
	{
		setTimeout(function() {
			status.textContent = '';
		}, 1000);
	}
	return success;
}

function addBlkDomain(){
	var ul = document.getElementById("listDomainsBlk");
	var candidate = document.getElementById("inputDomainBlk");
	if (!checkDomain(candidate.value))
	{
		return;
	}
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("inputDomainBlk").value = '';
}

function removeBlkDomain(){
	var ul = document.getElementById("listDomainsBlk");
	var candidate = document.getElementById("inputDomainBlk");
	if (!checkDomain(candidate.value))
	{
		return;
	}
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("inputDomainBlk").value = '';
}

function addWthDomain(){
	var ul = document.getElementById("listDomainWth");
	var candidate = document.getElementById("inputDomainWht");
	if (!checkDomain(candidate.value))
	{
		return;
	}
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("inputDomainWht").value = '';
}

function removeWthDomain(){
	var ul = document.getElementById("listDomainWth");
	var candidate = document.getElementById("inputDomainWht");
	if (!checkDomain(candidate.value))
	{
		return;
	}
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("inputDomainWht").value = '';
}

function addBlkFunc(){
	var ul = document.getElementById("listFuncsBlk");
	var candidate = document.getElementById("inputFuncBlk");
	if (!checkFunction(candidate.value))
	{
		return;
	}
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("inputFuncBlk").value = '';
}

function removeBlkFunc(){
	var ul = document.getElementById("listFuncsBlk");
	var candidate = document.getElementById("inputFuncBlk");
	if (!checkFunction(candidate.value))
	{
		return;
	}
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("inputFuncBlk").value = '';
}

function addWthFunc(){
	var ul = document.getElementById("listFuncsWth");
	var candidate = document.getElementById("inputFuncWth");
	if (!checkFunction(candidate.value))
	{
		return;
	}
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("inputFuncWth").value = '';
}

function removeWthFunc(){
	var ul = document.getElementById("listFuncsWth");
	var candidate = document.getElementById("inputFuncWth");
	if (!checkFunction(candidate.value))
	{
		return;
	}
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("inputFuncWth").value = '';
}

function filterParam(){
	var span = document.getElementById("filter_param_value");
	var input_user = document.getElementById("inputParamFilter").value;
	if (input_user === undefined || input_user === "")
		span.innerText = "";
	else
	{
		span.innerText = ". Searching for the param: " + input_user;
		document.getElementById("inputParamFilter").value = "";
	}
}

function save_options() {
	var blk_sites = document.getElementById('blk_sites').checked;
	var wht_sites = document.getElementById('wht_sites').checked;

	var list = document.getElementById("listDomainsBlk");
	var blacklisted_sites = list.innerText.split(/\n/);

	var list = document.getElementById("listDomainWth");
	var whitelisted_sites = list.innerText.split(/\n/);

	var blk_funcs = document.getElementById('blk_funcs').checked;
	var wht_funcs = document.getElementById('wht_funcs').checked;

	var list = document.getElementById("listFuncsBlk");
	var blacklisted_funcs = list.innerText.split(/\n/);

	var list = document.getElementById("listFuncsWth");
	var whitelisted_funcs = list.innerText.split(/\n/);

	var filter_param = document.getElementById('filter_param').checked;
	var paramFilter = document.getElementById("filter_param_value").innerText.substring(27);

	chrome.storage.sync.set({
		blk_sites: blk_sites,
		wht_sites: wht_sites,
		blacklisted_sites: blacklisted_sites,
		whitelisted_sites: whitelisted_sites,
		blk_funcs: blk_funcs,
		wht_funcs: wht_funcs,
		blacklisted_funcs: blacklisted_funcs,
		whitelisted_funcs: whitelisted_funcs,
		filter_param: filter_param,
		paramFilter: paramFilter
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 800);
	});
}

document.addEventListener('DOMContentLoaded', function () {

	document.getElementById('addBlkDomain').addEventListener('click', addBlkDomain);
	document.getElementById('removeBlkDomain').addEventListener('click', removeBlkDomain);
	document.getElementById('addWthDomain').addEventListener('click', addWthDomain);
	document.getElementById('removeWthDomain').addEventListener('click', removeWthDomain);
	document.getElementById('addBlkFunc').addEventListener('click', addBlkFunc);
	document.getElementById('removeBlkFunc').addEventListener('click', removeBlkFunc);
	document.getElementById('addWthFunc').addEventListener('click', addWthFunc);
	document.getElementById('removeWthFunc').addEventListener('click', removeWthFunc);
	document.getElementById('filterParam').addEventListener('click', filterParam);
	document.getElementById('save').addEventListener('click', save_options);

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

			document.getElementById('blk_sites').checked = blk_sites;
			document.getElementById('wht_sites').checked = wht_sites;
			document.getElementById('blk_funcs').checked = blk_funcs;
			document.getElementById('wht_funcs').checked = wht_funcs;
			document.getElementById('filter_param').checked = filter_param;


			var ul = document.getElementById("listDomainsBlk");
			for (var i = 0; i < blacklisted_sites.length; i++)
			{
				var li = document.createElement("li");
				li.appendChild(document.createTextNode(blacklisted_sites[i]));
				ul.appendChild(li);
			}

			var ul = document.getElementById("listDomainWth");
			for (var i = 0; i < whitelisted_sites.length; i++)
			{
				var li = document.createElement("li");
				li.appendChild(document.createTextNode(whitelisted_sites[i]));
				ul.appendChild(li);
			}

			var ul = document.getElementById("listFuncsBlk");
			for (var i = 0; i < blacklisted_funcs.length; i++)
			{
				var li = document.createElement("li");
				li.appendChild(document.createTextNode(blacklisted_funcs[i]));
				ul.appendChild(li);
			}

			var ul = document.getElementById("listFuncsWth");
			for (var i = 0; i < whitelisted_funcs.length; i++)
			{
				var li = document.createElement("li");
				li.appendChild(document.createTextNode(whitelisted_funcs[i]));
				ul.appendChild(li);
			}

			if (paramFilter !== undefined && paramFilter !== "")
			{
				var span = document.getElementById("filter_param_value");
				span.innerText = ". Searching for the param: " + paramFilter;
			}
	});
});
