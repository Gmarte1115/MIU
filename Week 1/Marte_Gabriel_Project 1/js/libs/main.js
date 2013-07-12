window.addEventListener("DOMContentLoaded", function(){


	function $(x){
		var selectElement = document.getElementById(x);
		return selectElement;
	}

	function addGroup (){
		var getFormTag = document.getElementsByTagName("form");
			selectList = $("select");
			createSelect = document.createElement("select");
			createSelect.setAttribute("id", "groups");
			
		for (var i=0, e=listGroups.length; i<e; i++){
			var createOption = document.createElement("option");
			var addOptText = listGroups[i]; 
			createOption.setAttribute("value", listGroups[i]);
			createOption.innerHTML = addOptText;
			createSelect.appendChild(createOption);
		}
		selectList.appendChild(createSelect);
	}

	function getSelRadio(){
		var radios = document.forms[0].sex;
		for (var i=0; i<radios.length; i++){
			if (radios[i].checked){
				sexValue = radios[i].value;
			}
		}
	}
	
	function getSelChBox(){
		if ($("vip").checked){
			vipValue = $("vip").value;
		}else{
			vipValue = "No";
		}
	}
	
	function switchControls(o){
		switch(o){
			case "on":
				$("contactForm").style.display = "none";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "none";
				$("addItem").style.display = "inline";
				break;
			case "off":
				$("contactForm").style.display = "block";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addItem").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeLocalData(key){
		if(!key){
			var id = Math.floor(Math.random()*10000001);
		}else{
			id = key;
		}
		getSelRadio();
		getSelChBox();
		
		var item = 			{};
			item.group =	["Group: ", $('groups').value];
			item.fname =	["First Name: ", $('fname').value];
			item.lname = 	["Last Name: ", $('lname').value];
			item.pnum = 	["Phone Number: ", $('pnum').value];
			item.email=		["Email: ", $('email').value];
			item.vip =		["Is a VIP ", vipValue];	
			item.sex =		["Sex: ", sexValue];
			item.bday = 	["Birthday: ", $('bday').value];
			item.notes = 	["Comments: ", $('comments').value];
			
		localStorage.setItem(id, JSON.stringify(item));
		alert("Contact Uploaded!");
	}
		
	function getLocalData(){
		switchControls("on");
		if(localStorage.length === 0){
			testData();
			alert("No Contacts, test data loaded.");	
		}
		var createDiv = document.createElement("div");
		createDiv.setAttribute("id", "items");
		var createList = document.createElement("ul");
		createDiv.appendChild(createList);
		document.body.appendChild(createDiv);
		$("items").style.display = "block";
		for (var i=0, lsLen = localStorage.length; i<lsLen; i++){
			var createLi = document.createElement("li");
			var createlinksli = document.createElement("li"); 
			createList.appendChild(createLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var objData = JSON.parse(value);
			var createSub = document.createElement("ul");
			createLi.appendChild(createSub);
			getProfilePic(objData.group[1], createSub);
			for (var o in objData){
				var createSubLi = document.createElement("li");
				createSub.appendChild(createSubLi);
				var subText = objData[o][0] + " " + objData[o][1];
				createSubLi.innerHTML = subText;
				createSubLi.appendChild(createlinksli);
			}
			createConLinks(localStorage.key(i), createlinksli);	
		}
	}
	
	function getProfilePic(catName, createSub){
		var profilePicLi = document.createElement("li");
		createSub.appendChild(profilePicLi);
		var newPic = document.createElement("img");
		var picSrc = newPic.setAttribute("src", "image/"+ catName + ".png");
		profilePicLi.appendChild(newPic);
	}
	
	function testData(){
		var json = {
			"contact01": {
				"group": ["Group:", "Personal"],
				"fname": ["First Name:", "Gabriel"],
				"lname": ["Last Name:", "Marte"],
				"pnum":  ["Phone Number:", "9175553011"],
				"email": ["Email:", "Gmarte2206@live.com"],
				"vip": 	 ["Is a VIP:", "No"],
				"sex":   ["Sex:", "Male"],
				"bday":  ["Birthday:", "11-15-1983"],
				"notes": ["Notes:", "First contact saved"]
			},
			"contact02": {
				"group": ["Group:", "Work"],
				"fname": ["First Name:", "Yomaly"],
				"lname": ["Last Name:", "Decruz"],
				"pnum":  ["Phone Number:", "9175550011"],
				"email": ["Email:", "yomaly@live.com"],
				"vip": 	 ["Is a VIP:", "Yes"],
				"sex":   ["Sex:", "Female"],
				"bday":  ["Birthday:", "12-09-1983"],
				"notes": ["Notes:", "Second contact saved"]
			}
		}
		for(var n in json){
				var id = Math.floor(Math.random()*10000001);
				localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

	
	function createConLinks(key, createlinksli){
		var editConLink = document.createElement("a");
		editConLink.href = "#";
		editConLink.key = key;
		var editConText = "Edit Contact";
		editConLink.addEventListener("click", editConItem);
		editConLink.innerHTML = editConText;
		createlinksli.appendChild(editConLink);
		
		var lineBreak = document.createElement("br");
		createlinksli.appendChild(lineBreak);
		
		var delConLink = document.createElement("a");
		delConLink.href = "#";
		delConLink.key = key;
		var delConText = " Delete Contact";
		delConLink.addEventListener("click", delConItem);
		delConLink.innerHTML = delConText;
		createlinksli.appendChild(delConLink);
		
	}
	
	function editConItem (){
		var value = localStorage.getItem(this.key);
		var item  = JSON.parse(value);
		
		switchControls("off");
		
		$("groups").value = item.group[1];
		$("fname").value = item.fname[1];
		$("lname").value = item.lname[1];
		$("pnum").value = item.pnum[1];
		$("email").value = item.email[1];
		var radios = document.forms[0].sex;
		if (item.vip[1] == "Yes"){
			$("vip").setAttribute("checked", "checked");
		}
		for (var i=0; i<radios.length; i++){
			if(radios[i].value == "Male" && item.sex[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Female" && item.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$("bday").value = item.bday[1];
		$("comments").value = item.notes[1];
		
		saveData.removeEventListener("click", storeLocalData);
		$("submit").value = "Edit Contact";
		var editConSubmit = $("submit");
		editConSubmit.addEventListener("click", validateForm);
		editConSubmit.key = this.key;
	}
	
	function validateForm(e){
		var getGroupData = $("groups");
		var getFnameData = $("fname");
		var getLnameData = $("lname");
		var getPnumData  = $("pnum");
		var getEmailData = $("email");
		
		errorCheck.innerHTML = "";
		getGroupData.style.border = "1px solid black";
		getFnameData.style.border = "1px solid red";
		getLnameData.style.border = "1px solid red";
		getPnumData.style.border  =	"1px solid red";
		getEmailData.style.border = "1px solid red";
		
		var errorMsgAry = [];
		
		if(getGroupData.value === "-Choose contact group-"){
			var groupSelError = "Please choose a group to add this contact too.";
			getGroupData.style.border = "1px solid red";
			errorMsgAry.push(groupSelError);
		}
		
		if(getFnameData.value === ""){
			var fnameEntryError = "Please enter a first name";
			getFnameData.style.border = "1px solid red";
			errorMsgAry.push(fnameEntryError);
		} 
		
		if(getLnameData.value === ""){
			var lnameEntryError = "Please enter a last name";
			getLnameData.style.border = "1px solid red";
			errorMsgAry.push(lnameEntryError);
		}  
		
		var rePnum = /^[0-9-]+[0-9-]+[0-9-]+$/;
		if (!(rePnum.exec(getPnumData.value))){
			var pnumEntryError = "Please enter a valid phone number"
			getPnumData.style.border = "1px solid red";
			errorMsgAry.push(pnumEntryError);
		} 
		
		var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!(reEmail.exec(getEmailData.value))){
			var emailEntryError = "Please enter a valid email address"
			getEmailData.style.border = "1px solid red";
			errorMsgAry.push(emailEntryError);
		} 
		
		if(errorMsgAry.length >= 1){
			for(var i=0; i<errorMsgAry.length; i++){
				var errorTxt = document.createElement("li");
				errorTxt.innerHTML = errorMsgAry[i];
				errorCheck.appendChild(errorTxt);
			}
			o.preventDefault();
			return false;
		}else{
			storeLocalData(this.key);
		}
	}
	
	function delConItem(){
		var ask = confirm("You are about to delete this contact, click ok to continue");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Contact was deleted.");
			window.location.reload();
		}else{
			alert("Contact was not deleted.");
		}
	}
	
	function clearLocalData(){
		if(localStorage.lenth === 0){
			alert("No contacts to delete!");
		}else{
			localStorage.clear();
			alert("All contacts deleted!");
			window.location.reload();
			return false;
		}
	}
	
	var listGroups = ["-Choose contact group-", "Personal", "Work", "Acquaintance"],
		sexValue
		vipValue = "No",
		errorCheck = $("errors");
	;
	addGroup ();
	
	
	var showLinkData = $('displayLink');
	showLinkData.addEventListener("click", getLocalData);
	
	var eraseLinkData = $('clear');
	eraseLinkData.addEventListener("click", clearLocalData);
	
	var saveData = $('submit');
	saveData.addEventListener("click", validateForm);
	
});




















