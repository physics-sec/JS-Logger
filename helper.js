
function addBlkDomain(){
	var ul = document.getElementById("listDomainsBlk");
	var candidate = document.getElementById("inputDomainBlk");
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("inputDomainBlk").value = '';
}

function removeBlkDomain(){
	var ul = document.getElementById("listDomainsBlk");
	var candidate = document.getElementById("inputDomainBlk");
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("inputDomainBlk").value = '';
}

function addWthDomain(){
	var ul = document.getElementById("listDomainWth");
	var candidate = document.getElementById("inputDomainWht");
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("inputDomainWht").value = '';
}

function removeWthDomain(){
	var ul = document.getElementById("listDomainWth");
	var candidate = document.getElementById("inputDomainWht");
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("inputDomainWht").value = '';
}

function addBlkFunc(){
	var ul = document.getElementById("listFuncsBlk");
	var candidate = document.getElementById("inputFuncBlk");
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("inputFuncBlk").value = '';
}

function removeBlkFunc(){
	var ul = document.getElementById("listFuncsBlk");
	var candidate = document.getElementById("inputFuncBlk");
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("inputFuncBlk").value = '';
}

function addWthFunc(){
	var ul = document.getElementById("listFuncsWth");
	var candidate = document.getElementById("inputFuncWth");
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("inputFuncWth").value = '';
}

function removeWthFunc(){
	var ul = document.getElementById("listFuncsWth");
	var candidate = document.getElementById("inputFuncWth");
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("inputFuncWth").value = '';
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

	chrome.storage.sync.set({
		blk_sites: blk_sites,
		wht_sites: wht_sites,
		blacklisted_sites: blacklisted_sites,
		whitelisted_sites: whitelisted_sites,
		blk_funcs: blk_funcs,
		wht_funcs: wht_funcs,
		blacklisted_funcs: blacklisted_funcs,
		whitelisted_funcs: whitelisted_funcs
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
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
	document.getElementById('save').addEventListener('click', save_options);

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
			console.log('ahi te va:' + result.blk_sites);
			blk_sites = result.blk_sites;
			wht_sites = result.wht_sites;
			blacklisted_sites = result.blacklisted_sites;
			whitelisted_sites = result.whitelisted_sites;
			blk_funcs = result.blk_funcs;
			wht_funcs = result.wht_funcs;
			blacklisted_funcs = result.blacklisted_funcs;
			whitelisted_funcs = result.whitelisted_funcs;

			document.getElementById('blk_sites').checked = blk_sites;
			document.getElementById('wht_sites').checked = wht_sites;
			document.getElementById('blk_funcs').checked = blk_funcs;
			document.getElementById('wht_funcs').checked = wht_funcs;


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
	});
});

