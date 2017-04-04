/* Main.js - the main scripts of the scouting app */
var JC = jCode.noConflict();
var JQ = jQuery.noConflict();
var anim = true;
var fileName;
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
		countUp('gearCountAuto',0,3);
	});
	JC('#gearCountADN').on('click',function(){
		countDown('gearCountAuto',0,3);
	});
	JC('#gearCountTUP').on('click',function(){
		countUp('gearCountTele',0,15);
	});
	JC('#gearCountTDN').on('click',function(){
		countDown('gearCountTele',0,15);
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
	},60000), timer;
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
	function toCSV(JSON) {
		clearInterval(autosave);
		autosave = null;
		//Write to local storage
		var ls = window.localStorage, csv = "Name,Match,Team,Alliance,Gears in Auto,Gears in Teleop,Climbed,Balls in Auto,Balls in Teleop,Mobile\n";
		for(var csjson in tableJSON.JSON) {
			csv += csjson + ",";
			if(tableJSON.JSON[csjson] === "mobile") {
				csv += "\n";
			}
		}
		ls.setItem('table',csv);
		autosaveTimer();
	}
	function toTextFile(TEXT) {
		clearInterval(autosave);
		autosave = null;
		//Write to local storage
		var ls = window.localStorage;
		ls.setItem('text',TEXT);
		autosaveTimer();
	}
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
			climb,autoFuelScore,mobile,teleFuelScore;
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
			//Check auto fuel scoring
			if(document.getElementById('shotFuel').checked) {
				autoFuelScore = "yes";
			} else {
				autoFuelScore = "no";
			}
			//Check tele fuel scoring
			if(document.getElementById('ball1').checked) {
				teleFuelScore = "no";
			} else if(document.getElementById('ball2').checked) {
				teleFuelScore = "some";
			} else if(document.getElementById('ball3').checked) {
				teleFuelScore = "tons";
			}
			//Check auto mobility
			if(document.getElementById('mobile').checked) {
				mobile = "yes";
			} else {
				mobile = "no";
			}
			//Build JSON object
			this.JSON = {
				name : name.value,
				match : match.value,
				team : team.value,
				ally : allyCol,
				gearAuto : autoGear.textContent,
				gearTele : teleGear.textContent,
				climb : climb,
				ballAuto : autoFuelScore,
				ballTele : teleFuelScore,
				mobile : mobile
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
			//Check auto fuel scoring
			if(document.getElementById('shotFuel').checked) {
				autoFuelScore = "yes";
			} else {
				autoFuelScore = "no";
			}
			//Check tele fuel scoring
			if(document.getElementById('ball1').checked) {
				teleFuelScore = "no";
			} else if(document.getElementById('ball2').checked) {
				teleFuelScore = "some";
			} else if(document.getElementById('ball3').checked) {
				teleFuelScore = "tons";
			}
			//Check auto mobility
			if(document.getElementById('mobile').checked) {
				mobile = "yes";
			} else {
				mobile = "no";
			}
			//Build JSON object
			this.JSON = {
				name : name.value,
				match : match.value,
				team : team.value,
				ally : allyCol,
				gearAuto : autoGear.textContent,
				gearTele : teleGear.textContent,
				climb : climb,
				ballAuto : autoFuelScore,
				ballTele : teleFuelScore,
				mobile : mobile
			}
			//Compile Notes and Comments differently, will export into text file separately
			this.NC = ("Auto Notes & Comments:\n\n" + autoNC.value + "\n\nTele-op Notes & Comments:\n\n" + teleNC.value);
			console.log(this.JSON);
			window.localStorage.setItem('json',JSON.stringify(this.JSON));
			window.localStorage.setItem('notes',JSON.stringify(this.NC));
			toCSV(this.JSON);
			toTextFile(this.NC);
			autosaveTimer();
			return;
		}
	}
	
	function countUp(elem,floor,ceil) {
		var num = document.getElementById(elem).textContent;
		if(num < floor) {
			num = floor;
			JC('#' + elem).text(num);
			return;
		} else if(num >= ceil) {
			num = ceil;
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
			num = floor;
			JC('#' + elem).text(num);
			return;
		} else if(num > ceil) {
			num = ceil;
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
});
