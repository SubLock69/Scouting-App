/* Main.js - the main scripts of the scouting app */
var JC = jCode.noConflict();
var JQ = jQuery.noConflict();
var anim = true;
//Normal Page load using JCode
JC(function(){
	JC('#navBTN').click(function(){
		showNav();
	});
	JC('#closeBTN').click(function(){
		hideNav();
	});
	JC('#cover').click(function(){
		hideNav();
	});
	JC('#homeBTN').click(function(){
		home();
	});
	JC('#autoBTN').click(function(){
		auto();
	});
	JC('#teleBTN').click(function(){
		tele();
	});
	JC('#startMatch').click(function(){
		auto();
	});
	JC('#toTeleMatch').click(function(){
		tele();
	});
	JC('#toHome').click(function(){
		home();
	});
	JC('#toAutoMatch').click(function(){
		auto();
	});
	JC('#finishMatch').click(function(){
		home();
		tableJSON();
	});
	//Counters
	var AG = 0, TG = 0;
	//Counting functions
	JC('#gearCountAUP').on('click',function(){
		countUp('gearCountAuto',0,25);
	});
	JC('#gearCountADN').on('click',function(){
		countDown('gearCountAuto',0,25);
	});
	JC('#gearCountTUP').on('click',function(){
		countUp('gearCountTele',0,25);
	});
	JC('#gearCountTDN').on('click',function(){
		countDown('gearCountTele',0,25);
	});
	//Settings Tab
	JC('#settingsBTN').click(function(){
		hideNav();
		//Begin Animation
		JC('#settings').css('margin-top','0');
	});
	JC('#closeSettings').click(function(){
		JC('#cover').css('opacity','0');
		setTimeout(function(){
			JC('#cover').css('z-index','-10');
		},300);
		//Begin Animation
		JC('#settings').css('margin-top','200%');
	});
	//Settings switches
	JC('#animIN').click(function(){
		if(anim) {
			JC('#animIN').css('background-color','#bbb');
			JC('#animSUB').css('transform','translate(0px)');
			//Set opposite value
			anim = false;
			//Toggle the animations
			JQ('#wrapper *').css('transition','none');
			JQ('#main > div').css('opacity','1').css('display','none');
			JC('#home').css('display','block');
			JC('#settings').css('display','block');
		} else {
			JC('#animIN').css('background-color','#00e6e2');
			JC('#animSUB').css('transform','translate(15px)');
			//Set opposite value
			anim = true;
			//Toggle the animations
			JQ('#wrapper *').css('transition','all 0.3s ease');
			JQ('#main > div').css('opacity','0').css('display','none');
			JC('#home').css('display','block').css('opacity','1');
			JC('#settings').css('display','block').css('opacity','1');
		}
	});
	//Blur events to set to min/max
	document.getElementById('match').onblur = function(){
		if(document.getElementById('match').value > 999) {
			document.getElementById('match').value = 1;
			console.log('Match number too high!');
		}
	};
	document.getElementById('team').onblur = function(){
		if(document.getElementById('team').value > 6999) {
			document.getElementById('team').value = 2826;
			console.log('Team number too high!');
		}
	};
	//Autosave timer
	var autosave = setInterval(function(){
		tableJSON(true);
	},10000), timer;
	document.getElementById('autosaveTimer').onblur = function(){
		clearInterval(autosave);
		autosaveTimer();
	};
	//Quick Page Functions
	function showNav() {
		JC('#nav').css('left','0');
		JC('#main').css('margin-left','35%');
		JC('#cover').css({
			'left':'35%',
			'opacity':'1',
			'z-index':'10000'
		});
	}
	function hideNav() {
		JC('#nav').css('left','-50%');
		JC('#main').css('margin-left','0');
		JC('#cover').css('left','0').css('opacity','0');
		setTimeout(function(){
			JC('#cover').css('z-index','-10');
		},300);
	}
	function home() {
		hideNav();
		//Begin Animation
		if(!anim) {
			JC('#auto').css('display','none');
			JC('#tele').css('display','none');
			JC('#home').css('display','block');
		} else {
			JC('#auto').css('opacity','0');
			JC('#tele').css('opacity','0');
			JC('#home').css('display','block');
			setTimeout(function(){
				JC('#auto').css('display','none');
				JC('#tele').css('display','none');
				JC('#home').css('opacity','1');
			},250);
		}
		//Change buttons
		JC('#startMatch').css('display','block');
		JC('#toHome').css('display','none');
		JC('#toAutoMatch').css('display','none');
		JC('#toTeleMatch').css('display','none');
		JC('#finishMatch').css('display','none');
	}
	function auto() {
		hideNav();
		//Begin Animation
		if(!anim) {
			JC('#home').css('display','none');
			JC('#tele').css('display','none');
			JC('#auto').css('display','block');
		} else {
			JC('#home').css('opacity','0');
			JC('#tele').css('opacity','0');
			JC('#auto').css('display','block');
			setTimeout(function(){
				JC('#home').css('display','none');
				JC('#tele').css('display','none');
				JC('#auto').css('opacity','1');
			},250);
		}
		//Change buttons
		JC('#startMatch').css('display','none');
		JC('#toHome').css('display','block');
		JC('#toAutoMatch').css('display','none');
		JC('#toTeleMatch').css('display','block');
		JC('#finishMatch').css('display','none');
	}
	function tele() {
		hideNav();
		//Begin Animation
		if(!anim) {
			JC('#auto').css('display','none');
			JC('#home').css('display','none');
			JC('#tele').css('display','block');
		} else {
			JC('#auto').css('opacity','0');
			JC('#home').css('opacity','0');
			JC('#tele').css('display','block');
			setTimeout(function(){
				JC('#auto').css('display','none');
				JC('#home').css('display','none');
				JC('#tele').css('opacity','1');
			},250);
		}
		//Change buttons
		JC('#startMatch').css('display','none');
		JC('#toHome').css('display','none');
		JC('#toAutoMatch').css('display','block');
		JC('#toTeleMatch').css('display','none');
		JC('#finishMatch').css('display','block');
	}
	function autosaveTimer() {
		timer = Number(document.getElementById('autosaveTimer').value);
		if(timer === 0) {
			console.log('Defaulted to 10 seconds, timer === 0 or "" or null!')
			timer = 10;
		}
		console.log('Autosave time = ' + timer + ' seconds');
		autosave = setInterval(function(){
			tableJSON(true);
		},(timer * 1000));
	};
	function tableJSON(noValidate) {
		clearInterval(autosave);
		autosave = null;
		//Generate data structure vars
		var name = document.getElementById('name'),
			match = document.getElementById('match'),
			team =document.getElementById('team'),
			ally,allyCol,
			autoNC = document.getElementById('autoNC'),
			teleNC = document.getElementById('teleNC'),
			autoGear = document.getElementById('gearCountAuto'),
			teleGear = document.getElementById('gearCountTele'),
			climb;
		if(noValidate) {
			//Check for radio button checked
			if(document.getElementById('redA').checked) {
				ally = true;//true = red
				allyCol = "red";
			} else if(document.getElementById('blueA').checked) {
				ally = false;//false = blue
				allyCol = "blue";
			}
			//Check for climb buttons
			if(document.getElementById('climbYes').checked) {
				climb = "yes";
			} else if(document.getElementById('climbNo').checked) {
				climb = "no";
			}
			//Build JSON object
			this.JSON = {
				name : name.value,
				match : match.value,
				team : team.value,
				ally : allyCol,
				gearAuto : autoGear.textContent,
				gearTele : teleGear.textContent,
				climb : climb
			}
			//Compile Notes and Comments differently, will export into text file separately
			this.NC = ("Auto Notes & Comments:\n\n" + autoNC.value + "\n\nTele-op Notes & Comments:\n\n" + teleNC.value);
			console.log(this.JSON);
			autosaveTimer();
			return;
		} else {
			//Check for radio button checked
			if(document.getElementById('redA').checked) {
				ally = true;//true = red
				allyCol = "red";
			} else if(document.getElementById('blueA').checked) {
				ally = false;//false = blue
				allyCol = "blue";
			}
			//Check for climb buttons
			if(document.getElementById('climbYes').checked) {
				climb = "yes";
			} else if(document.getElementById('climbNo').checked) {
				climb = "no";
			}
			//Validate data
			if(name.value === "" || name.value === null) {
				alert('Name value either not input or is invalid! Go back and try again!');
				autosaveTimer();
				return false;
			}
			if(match.value === "" || match.value === null) {
				alert('Match number value either not input or is invalid! Go back and try again!');
				autosaveTimer();
				return false;
			}
			if(team.value === "" || team.value === null) {
				alert('Team number value either not input or is invalid! Go back and try again!');
				autosaveTimer();
				return false;
			}
			//Build JSON object
			this.JSON = {
				name : name.value,
				match : match.value,
				team : team.value,
				ally : allyCol,
				gearAuto : autoGear.textContent,
				gearTele : teleGear.textContent,
				climb : climb
			}
			//Compile Notes and Comments differently, will export into text file separately
			this.NC = ("Auto Notes & Comments:\n\n" + autoNC.value + "\n\nTele-op Notes & Comments:\n\n" + teleNC.value);
			console.log(this.JSON);
			toCSV(this.JSON);
			toTextFile(this.NC);
			autosaveTimer();
			return;
		}
	}
	function toCSV(JSON) {
		clearInterval(autosave);
		autosave = null;
		var fs = requestFS();
		var CSV = "";
		writeFile(fs.files.getFile("match_" + tableJSON.JSON.match + "_team_" + tableJSON.JSON.team + ".csv",{create: true, exclusive: false}),CSV);
		autosaveTimer();
	}
	function toTextFile(TEXT) {
		clearInterval(autosave);
		autosave = null;
		var fs = requestFS();
		writeFile(fs.files.getFile("match_" + tableJSON.JSON.match + "_team_" + tableJSON.JSON.team + "_NC.txt",{create: true, exclusive: false}),tableJSON.NC);
		autosaveTimer();
	}
	function countUp(elem,floor,ceil) {
		var num = document.getElementById(elem).textContent;
		if(num < floor) {
			num = 0;
			JC('#' + elem).text(num);
			return;
		} else if(num >= ceil) {
			num = 25;
			JC('#' + elem).text(num);
			return;
		} else {
			num++;
			JC('#' + elem).text(num);
			return;
		}
	}
	function countDown(elem,floor,ceil) {
		var num = document.getElementById(elem).textContent;
		if(num <= floor) {
			num = 0;
			JC('#' + elem).text(num);
			return;
		} else if(num > ceil) {
			num = 25;
			JC('#' + elem).text(num);
			returnl
		} else {
			num--;
			JC('#' + elem).text(num);
			return;
		}
	}
	//Start making the startup scripts
	JC('#animIN').css('background-color','#00e6e2');
	JC('#animSUB').css('transform','translate(15px)');
	home();
	//PhoneGap file API implementation
	///*
	function onErrorReadFile() {
		console.log('Unable to read file');
	}
	function onErrorLoadFs() {
		console.log('Unable to load file system');
	}
	function onErrorCreateFile() {
		console.log('Unable to create file');
	}
	function writeFile(fileEntry, dataObj) {
		// Create a FileWriter object for our FileEntry (log.txt).
		fileEntry.createWriter(function (fileWriter) {

			fileWriter.onwriteend = function() {
				console.log("Successful file write...");
				readFile(fileEntry);
			};

			fileWriter.onerror = function (e) {
				console.log("Failed file write: " + e.toString());
			};

			// If data object is not passed in,
			// create a new Blob instead.
			if (!dataObj) {
				dataObj = new Blob(['some file data'], { type: 'text/plain' });
			}

			fileWriter.write(dataObj);
		});
	}
	function readFile(fileEntry) {
		fileEntry.file(function (file) {
			var reader = new FileReader();

			reader.onloadend = function() {
				console.log("Successful file read: " + this.result);
				displayFileData(fileEntry.fullPath + ": " + this.result);
			};

			reader.readAsText(file);

		}, onErrorReadFile);
	}
	function requestFS() {
		return window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

			console.log('file system open: ' + fs.name);
			fs.files.getFile("test.txt", { create: true, exclusive: false }, function (fileEntry) {

				console.log("fileEntry is file?" + fileEntry.isFile.toString());
				// fileEntry.name == 'someFile.txt'
				// fileEntry.fullPath == '/someFile.txt'
				writeFile(fileEntry, null);

			}, onErrorCreateFile);

		}, onErrorLoadFs);
	}
	window.addEventListener('filePluginIsReady',requestFS(),false);
	//*/
});
