// map object 
function map_object (image,properties)
{
	this.image = image;
	this.properties = properties;
}

// structured like this due to the default asynchronous callback with XHTTP requests
// default definitions
var map_objects;

var load_map_objects = function(data)
{
	map_objects = JSON.parse(data);
}

xhttp_handler.load_file("map_objects.json",load_map_objects);
engine.log(map_objects);



