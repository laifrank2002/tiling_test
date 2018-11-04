var xhttp_handler = (
	function()
	{
		return {
			load_file: function(path,callback)
			{
				engine.log("Initiating XHTTP request to: " + path);
				// XHTTP request to load a json file to load the data for each image
				// This is done to make the files look prettier, because I have no life 
				var xobj = new XMLHttpRequest();
				xobj.overrideMimeType("application/json");
				xobj.open('GET', path, false); // set to false for synchronous mode
				// needed in order to load this file w/ images
				xobj.onreadystatechange = function () {
					if (xobj.readyState == 4 && xobj.status == "200") {
						// Required use of an anonymous callback 
						// as .open will NOT return a value but simply returns undefined in asynchronous mode
						callback(xobj.responseText);
					}
				};
				xobj.send(null); 
			},
		} // end return 
	}
)();