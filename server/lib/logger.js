
module.exports = {

	log : function(message)
	{
		filePath = "logs"
		fs = require('fs');

		if (typeof message === "object") {
			// message = JSON.stringify(message);
		}

		fs.appendFile(filePath, message + '\n', function (err) {
			if (err) throw err;
			console.log(message);
		});		
	}
};