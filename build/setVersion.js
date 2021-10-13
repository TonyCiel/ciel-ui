function Version() {}

let fs = require("fs");
let path = require('path');
Version.prototype.apply = function(compiler){
	compiler.plugin('done', function(){
		let json = require('../package.json');
		let jsonVersion = json.version;
		let versions = jsonVersion.split('.');
		var mainVersion = versions[0];
		var numberVersion = versions[1];
		var version = versions[2];
		if(version < 9) {
			version = Number(version) + 1;
		} else {
			version = 0;
			if(numberVersion > 9) {
				mainVersion ++;
			}
			numberVersion > 9 ? numberVersion = 0 : numberVersion++;
		}
		json.version = `${mainVersion}.${numberVersion}.${version}`;
		let buildConfigPath = path.resolve(__dirname, `../package.json`);
		fs.writeFileSync(buildConfigPath, JSON.stringify(json, null, '\t'));
		let versionListPath = path.resolve(__dirname, `../build/versions.json`);
		let versionJson = require('../build/versions.json');
		versionJson.versions.push(json.version);
		fs.writeFileSync(versionListPath, JSON.stringify(versionJson, null, '\t'));
		
		
	})
}
module.exports = Version;