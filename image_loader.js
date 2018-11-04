var image_loader = (
	function()
	{
		
		var image_library = {};
		return {
			
			initialize: function()
			{
				engine.log("Loading image assets");
				// XHTTP request to load a json file to load the data for each image
				// This is done to make the files look prettier, because I have no life 
				var xobj = new XMLHttpRequest();
				xobj.overrideMimeType("application/json");
				xobj.open('GET', 'images/image_definitions.json', false); // set to false for synchronous mode
				// needed in order to load this file w/ images
				xobj.onreadystatechange = function () {
					if (xobj.readyState == 4 && xobj.status == "200") {
						// Required use of an anonymous callback 
						// as .open will NOT return a value but simply returns undefined in asynchronous mode
						callback(xobj.responseText);
					}
				};
				xobj.send(null); 
				
				function callback(data)
				{
					//engine.log(JSON.parse(data));
					var image_data = JSON.parse(data);
					// try and literally load images for each thing 
					for (let image_index = 0; image_index < image_data["image"].length; image_index++)
					{
						try
						{
							image_data["image"][image_index]["image"] = create_image(image_data["image"][image_index]["path"]);
							// ignore indexes, we're going to use names for these indices!
							image_library[image_data["image"][image_index]["name"]] = image_data["image"][image_index]; 
							engine.log(image_library[image_data["image"][image_index]["name"]]);
						}
						catch
						{
							engine.log("Resource not loaded, check your JSON!");
						}
					}
				}
			},
			
			//
			get_images: function()
			{
				return image_library;
			},
		}
	}
)();

function create_image(path) 
{
	var image = document.createElement("IMG");
	image.src = path;

	return image;
}
