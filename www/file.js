	//PhoneGap file API implementation
//	/*
	function onErrorReadFile() {
		console.log('Unable to read file');
	}
	function onErrorLoadFs() {
		console.log('Unable to load file system');
	}
	function onErrorCreateFile() {
		console.log('Unable to create file');
	}
	function writeFile(fileEntry, dataObj, isAppend) {
		// Create a FileWriter object for our FileEntry (log.txt).
		fileEntry.createWriter(function (fileWriter) {

			fileWriter.onwriteend = function() {
				console.log("Successful file read...");
				readFile(fileEntry);
			};

			fileWriter.onerror = function (e) {
				console.log("Failed file read: " + e.toString());
			};

			// If we are appending data to file, go to the end of the file.
			if (isAppend) {
				try {
					fileWriter.seek(fileWriter.length);
				}
				catch (e) {
					console.log("file doesn't exist!");
				}
			}
			fileWriter.write(dataObj);
		});
	}
	function createFile(dirEntry, fileName, isAppend) {
		// Creates a new file or returns the file if it already exists.
		dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

			writeFile(fileEntry, null, isAppend);

		}, onErrorCreateFile);

	}
	function saveFile(dirEntry, fileData, fileName) {

		dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

			writeFile(fileEntry, fileData);

		}, onErrorCreateFile);
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
		window.requestFileSystem(window.PERSISTENT, 0, function (fs) {

			console.log('file system open: ' + fs.name);
			createFile(fs.root, "newTempFile.txt", false);

		}, onErrorLoadFs);
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
			console.log('file system open: ' + dirEntry.name);
			var isAppend = true;
			createFile(dirEntry, fileName, isAppend);
		}, onErrorLoadFs);
	}
	
	window.addEventListener('filePluginIsReady',requestFS(),false);
	//*/
	function fail(error) {
		console.log("error : "+error.code);
	}
	
	function gotFileWriter(writer) {
		writer.onwrite = function(evt) {
			console.log("write success");
		};

		writer.write("some sample text");
		writer.abort();
		// contents of file now 'some different text'
	}

	function gotFileEntry(fileEntry) {
		fileEntry.createWriter(gotFileWriter, fail);
	}
	function gotFS(fileSystem) {
		fileSystem.root.getFile("readme.txt", {create: true}, gotFileEntry, fail);
	}
	
	function onDeviceReady() {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	}

	document.addEventListener("deviceready", onDeviceReady, false);