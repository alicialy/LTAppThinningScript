var readline = require('readline'),
    fs = require('fs');

var UnUsedImport = function(filePath) {
	this.filePath = filePath
	var index = filePath.indexOf('.');
	this.fileName = filePath.substring(0, index)
	this.unUsedClassArr = []
}

UnUsedImport.prototype = {
	getUsedClass: function(cb) {
		var self = this
		var rl = readline.createInterface({
		    input: fs.createReadStream(self.filePath),
		    output: process.stdout,
		    terminal: false
		});
		rl.on('line', function(line) {
			if (line.indexOf('#') > -1) {
				var isFind = self._findClassName(line, '#import ');
				if (!isFind) {
					isFind = self._findClassName(line, '#include ');
				} 
			}
		});

		rl.on('close', function(line) {
			cb(self)
		});
	},

	getUnusedImport: function(cb) {
		var self = this
		var rl = readline.createInterface({
		    input: fs.createReadStream(self.filePath),
		    output: process.stdout,
		    terminal: false
		});
		rl.on('line', function(line) {
			//console.log("line " +  line.indexOf('#') );
			isImportLine = false;
			if (self.unUsedClassArr.length > 0) {
				self._findUnused(line);
			}
		});

		rl.on('close', function(line) {
			cb(self)
		});
	},

	_findClassName: function(line, marcoKey) {
		var index = line.indexOf(marcoKey);
		//console.log("marcoKey:" + marcoKey)
		if (index > -1) {
			var className = line.substring(marcoKey.length + 1, line.length)
			index = className.indexOf('.h');
			className = className.substring(0, index)
			// console.log("className:" + className)
			if (className != this.fileName) {
				this.unUsedClassArr.push(className)
			}
			return true;
		} else {
			return false;
		}
	},

	_findUnused: function(line) {
		var tempArr = this.unUsedClassArr;

		for (var i = 0; i < this.unUsedClassArr.length; i++) {
			var className = this.unUsedClassArr[i]
			var toFindStr = className + " ";
			if (line.indexOf(toFindStr) > -1) {
				tempArr.splice(i, 1)
			}
		}

		this.unUsedClassArr = tempArr;
	},

	
}

if (!process.argv[2]) {
	console.log('usage: node unused_import.js filepath')
	return
}


var unUsedImport = new UnUsedImport(process.argv[2])
unUsedImport.getUsedClass(function() {
	//console.log("unused:" + unUsedImport.unUsedClassArr)
	unUsedImport.getUnusedImport(function() {
		var ret = unUsedImport.unUsedClassArr;
		//console.log ("ret:" + ret);
		for (var i in ret) {
			console.log(ret[i] + '.h' + '\t')
		}
	});
});
