
function addItem1(){
	var ul = document.getElementById("dynamic-list1");
	var candidate = document.getElementById("candidate1");
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("candidate1").value = '';
}

function removeItem1(){
	var ul = document.getElementById("dynamic-list1");
	var candidate = document.getElementById("candidate1");
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("candidate1").value = '';
}

function addItem2(){
	var ul = document.getElementById("dynamic-list2");
	var candidate = document.getElementById("candidate2");
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("candidate2").value = '';
}

function removeItem2(){
	var ul = document.getElementById("dynamic-list2");
	var candidate = document.getElementById("candidate2");
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("candidate2").value = '';
}

function addItem3(){
	var ul = document.getElementById("dynamic-list3");
	var candidate = document.getElementById("candidate3");
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("candidate3").value = '';
}

function removeItem3(){
	var ul = document.getElementById("dynamic-list3");
	var candidate = document.getElementById("candidate3");
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("candidate3").value = '';
}

function addItem4(){
	var ul = document.getElementById("dynamic-list4");
	var candidate = document.getElementById("candidate4");
	var li = document.createElement("li");
	li.setAttribute('id',candidate.value);
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li);
	document.getElementById("candidate4").value = '';
}

function removeItem4(){
	var ul = document.getElementById("dynamic-list4");
	var candidate = document.getElementById("candidate4");
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
	document.getElementById("candidate4").value = '';
}

function save_options() {
	var blk_sites = document.getElementById('blk_sites').checked;
	var wht_sites = document.getElementById('wht_sites').checked;

	var list = document.getElementById("dynamic-list1");
	var blacklisted_sites = list.innerText.split(/\n/);

	var list = document.getElementById("dynamic-list2");
	var whitelisted_sites = list.innerText.split(/\n/);

	var blk_funcs = document.getElementById('blk_funcs').checked;
	var wht_funcs = document.getElementById('wht_funcs').checked;

	var list = document.getElementById("dynamic-list3");
	var blacklisted_funcs = list.innerText.split(/\n/);

	var list = document.getElementById("dynamic-list4");
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

	document.getElementById('additem1').addEventListener('click', addItem1);
	document.getElementById('removeitem1').addEventListener('click', removeItem1);
	document.getElementById('additem2').addEventListener('click', addItem2);
	document.getElementById('removeitem2').addEventListener('click', removeItem2);
	document.getElementById('additem3').addEventListener('click', addItem3);
	document.getElementById('removeitem3').addEventListener('click', removeItem3);
	document.getElementById('additem4').addEventListener('click', addItem4);
	document.getElementById('removeitem4').addEventListener('click', removeItem4);

	document.getElementById('save').addEventListener('click', save_options);

	var ul = document.getElementById("dynamic-list1");

	var li = document.createElement("li");
	li.setAttribute('id', 'youtube');
	li.appendChild(document.createTextNode('https://www.youtube.com'));
	ul.appendChild(li);

	var li = document.createElement("li");
	li.setAttribute('id', 'google');
	li.appendChild(document.createTextNode('https://www.google.com'));
	ul.appendChild(li);

	document.getElementById('blk_sites').checked = true;
	document.getElementById('wht_sites').checked = false;
	document.getElementById('blk_funcs').checked = false;
	document.getElementById('wht_funcs').checked = false;

});

