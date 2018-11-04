// simple map, taken from Wandering 
function Map(string, width, height) 
{

    string = string.split("\n").join(""); //removes line breaks

    this.map_array = string.split(",");
    this.width = width;
    this.height = height;

    this.special_tiles = []; //for special tiles
    this.map_objects = [];

    for (var i = 0; i < width * height; i = i + 1) {
        this.special_tiles[i] = null; //start out with no special tiles, for now.
        this.map_objects[i] = null; //start out with no objects on the map
    }
}

//give it a pair of co-ordinates, and it'll give you where to find that tile in the array
Map.prototype.get_tile_position = function(width, height) {
	if ((width < this.width) && width >= 0 && (height < this.height) && height >= 0)
	{
		return width + height * this.width;
	}
};

//returns a tile from the map
Map.prototype.get_tile = function(width, height) {
    var tile_pos = this.get_tile_position(width, height);
    return this.map_array[tile_pos];
};

//sets a tile in the map. permanently.
Map.prototype.set_tile = function(width, height, new_tile) {
    var tile_pos = this.get_tile_position(width, height);
    this.map_array[tile_pos] = new_tile;
};

// map objects 
Map.prototype.set_map_object = function(width, height, new_map_object) {
    var map_object_pos = this.get_tile_position(width, height);
    this.map_objects[map_object_pos] = new_map_object;
};

Map.prototype.get_map_object = function(width, height) {
    var map_object_pos = this.get_tile_position(width, height);
    return this.map_objects[map_object_pos];
};

Map.prototype.remove_map_object = function(width, height) {
    var map_object_pos = this.get_tile_position(width, height);
    this.map_objects[map_object_pos] = null; //set it to null
};