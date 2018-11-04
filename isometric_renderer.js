// notes
/*
	C1 - C4
	|    |
	C2 - C3
 */

var isometric_renderer = (
	function()
	{
		var DEF_TILE_SIZE = 16;
		var DEF_TILE_OFFSET = 1; // space between tiles - not implemented
		var DEF_TILE_STRETCH_FACTOR = 2; // stretching the tile bfo tiles - not implemented 
		
		var DEF_MAP_HEIGHT = 10;
		var DEF_MAP_WIDTH = 15;
		
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		var current_map;
		
		var offset_x = 50;
		var offset_y = 200;
		
		var tile_offset_x = 0;
		var tile_offset_y = 0;
		
		var map_orientation = 0;
		
		return {
			
			initialize: function()
			{
				engine.log("Initializing isometric renderer...");
				current_map = new Map("0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1",10,4);
				isometric_renderer.draw();
			},
			
			draw: function()
			{
				isometric_renderer.clear();
				// draws the isometric map from the current map
				
				engine.log(map_orientation);
				// handling in rotation
				let new_offset_x = offset_x;
				let new_offset_y = offset_y;
				
				let new_tile_offset_x = tile_offset_x;
				let new_tile_offset_y = tile_offset_y;
				
				let map_height = DEF_MAP_HEIGHT;
				let map_width = DEF_MAP_WIDTH;
				
				switch(map_orientation)
				{
					case 1:						
						map_height = DEF_MAP_WIDTH;
						map_width = DEF_MAP_HEIGHT;
						new_tile_offset_x = map_height - tile_offset_y - 1;
						new_tile_offset_y = tile_offset_x;
						break;
					case 2:
						new_tile_offset_x = map_width - tile_offset_x - 1;
						new_tile_offset_y = map_height - tile_offset_y - 1;
						break;
					case 3:
						map_height = DEF_MAP_WIDTH;
						map_width = DEF_MAP_HEIGHT;
						new_tile_offset_x = tile_offset_y;
						new_tile_offset_y = map_width - tile_offset_x - 1;
						break;
					default:
						
						// do nothing
				} // end switch
				
				
				// default render
				// draw the bloody border so I can see where it bloody is!
				context.strokeStyle = "rgba(211, 211, 211, 1)";
				context.lineWidth = 3;
				
				context.beginPath();
				context.moveTo(new_offset_x, new_offset_y);
				context.lineTo(new_offset_x+map_width*DEF_TILE_SIZE
					,new_offset_y+map_width*DEF_TILE_SIZE*0.5);
				context.lineTo(new_offset_x+(DEF_TILE_SIZE*(map_height+map_width))
					,new_offset_y+0.5*DEF_TILE_SIZE*(map_width-map_height));
				context.lineTo(new_offset_x+(map_height)*DEF_TILE_SIZE
					,new_offset_y-((map_height)*DEF_TILE_SIZE*0.5));
				context.closePath();
				context.stroke();
				
				// reset for def
				// line styling
				context.lineWidth = 1;
				context.strokeStyle = "rgba(222, 222, 222, 1)";
				
				switch(map_orientation)
				{
					case 1:						
						
						break;
					case 2:
						// do nothing 
						break;
					case 3:
						break;
					default:
						
						// do nothing
				} // end switch
				
				// draw tiles and lines 
				for (let y = 0; y < map_height + 0; y++)
				{
					for (let x = 0; x < map_width + 0; x++)
					{
						// technical debt in reorganizing, STILL NEED TO ADD IN BFO
						
						// lines
						context.beginPath();
						context.moveTo(offset_x+(DEF_TILE_SIZE*2*y)-(DEF_TILE_SIZE*y)+(DEF_TILE_SIZE*x)
							,offset_y+(DEF_TILE_SIZE*x/2)+(DEF_TILE_SIZE*y/-2));
						context.lineTo(offset_x+DEF_TILE_SIZE+(DEF_TILE_SIZE*2*y)-(DEF_TILE_SIZE*y)+(DEF_TILE_SIZE*x)
							,offset_y+DEF_TILE_SIZE/2+(DEF_TILE_SIZE*x/2)+(DEF_TILE_SIZE*y/-2));
						context.lineTo(offset_x+DEF_TILE_SIZE*2+(DEF_TILE_SIZE*2*y)-(DEF_TILE_SIZE*y)+(DEF_TILE_SIZE*x)
							,offset_y+(DEF_TILE_SIZE*x/2)+(DEF_TILE_SIZE*y/-2));
						context.lineTo(offset_x+DEF_TILE_SIZE+(DEF_TILE_SIZE*2*y)-(DEF_TILE_SIZE*y)+(DEF_TILE_SIZE*x)
							,offset_y+DEF_TILE_SIZE/-2+(DEF_TILE_SIZE*x/2)+(DEF_TILE_SIZE*y/-2));
						/*
						context.lineTo(offset_x+(20*x)-(10*x)+(10*y)
							,offset_y+(5*y)+(-5*x));
						*/
						
						context.closePath();
						context.stroke();
						// get tile type and draw
						// get based on x/y for particular orientation
						// this is the hard part!
						// .get_tile((x+tile_offset_x),(y+tile_offset_y))
						let new_x = x;
						let new_y = y;
						switch(map_orientation)
						{
							case 1:
								new_x = map_height - y - 1;
								new_y = x;
								break;
							case 2:
								new_x = map_width - x - 1;
								new_y = map_height - y - 1;
								break;
							case 3:
								new_x = y;
								new_y = map_width - x - 1;
								break;
							default:
							
						}
						switch(current_map.get_tile((new_x+tile_offset_x),(new_y+tile_offset_y)))
						{
							case "0":
								//engine.log("tile pos: " + (x+tile_offset_x) + "," + (y+tile_offset_y) + " tile:" + current_map.get_tile(x+tile_offset_x,y+tile_offset_y));
								context.fillStyle='#22ff22';
								context.fill();
								break;
							case "1":
								//engine.log("tile pos: " + (x+tile_offset_x) + "," + (+tile_offset_y) + " tile:" + current_map.get_tile(x+tile_offset_x,y+tile_offset_y));
								context.fillStyle='#99ff99';
								context.fill();
								break;
							default:
								//engine.log("tile pos: " + (x+tile_offset_x) + "," + (y+tile_offset_y) + " tile:" + current_map.get_tile(x+tile_offset_x,y+tile_offset_y));
								context.fillStyle='#ffffff';
								context.fill();
						}
						
						// render all the images and other cool objects! 
						
					} // end x
				} // end y
			},
			
			/*
			// draws a simple canvas map for debugging
			draw_isometric_map: function()
			{
				engine.log("Drawing simple map...");
				context.moveTo(offset_x,offset_y);
				
				// draw a giant map
				for (let y = tile_offset_y; y < 20 + tile_offset_y; y++)
				{
					for (let x = tile_offset_x; x < 10 + tile_offset_x; x++)
					{
						// technical debt in reorganizing, STILL NEED TO ADD IN BFO
						context.beginPath();
						context.moveTo(offset_x+(DEF_TILE_SIZE*2*y)-(DEF_TILE_SIZE*y)+(DEF_TILE_SIZE*x)
							,offset_y+(DEF_TILE_SIZE*x/2)+(DEF_TILE_SIZE*y/-2));
						context.lineTo(offset_x+DEF_TILE_SIZE+(DEF_TILE_SIZE*2*y)-(DEF_TILE_SIZE*y)+(DEF_TILE_SIZE*x)
							,offset_y+DEF_TILE_SIZE/2+(DEF_TILE_SIZE*x/2)+(DEF_TILE_SIZE*y/-2));
						context.lineTo(offset_x+DEF_TILE_SIZE*2+(DEF_TILE_SIZE*2*y)-(DEF_TILE_SIZE*y)+(DEF_TILE_SIZE*x)
							,offset_y+(DEF_TILE_SIZE*x/2)+(DEF_TILE_SIZE*y/-2));
						context.lineTo(offset_x+DEF_TILE_SIZE+(DEF_TILE_SIZE*2*y)-(DEF_TILE_SIZE*y)+(DEF_TILE_SIZE*x)
							,offset_y+DEF_TILE_SIZE/-2+(DEF_TILE_SIZE*x/2)+(DEF_TILE_SIZE*y/-2));

						context.closePath();
						context.stroke();
						context.fillStyle='#22ff22';
						context.fill();

					}
				}
				
				//context.stroke();
			},
			*/
			// draws a square 2d based map for debugging and transforms
			/*
			draw_square_map: function()
			{

				engine.log("Drawing square tile map...");
				for (let x = tile_offset_x; x < 20 + tile_offset_x; x++)
				{
					for (let y = tile_offset_y; y < 20 + tile_offset_y; y++)
					{
						context.moveTo(offset_x+((DEF_TILE_SIZE+DEF_TILE_OFFSET)*x)
							,offset_y+((DEF_TILE_SIZE+DEF_TILE_OFFSET)*y));
						context.lineTo(offset_x+((DEF_TILE_SIZE+DEF_TILE_OFFSET)*x)
							,offset_y+DEF_TILE_SIZE+((DEF_TILE_SIZE+DEF_TILE_OFFSET)*y));
						context.lineTo(offset_x+DEF_TILE_SIZE+((DEF_TILE_SIZE+DEF_TILE_OFFSET)*x)
							,offset_y+DEF_TILE_SIZE+((DEF_TILE_SIZE+DEF_TILE_OFFSET)*y));
						context.lineTo(offset_x+DEF_TILE_SIZE+((DEF_TILE_SIZE+DEF_TILE_OFFSET)*x)
							,offset_y+((DEF_TILE_SIZE+DEF_TILE_OFFSET)*y));
						context.lineTo(offset_x+((DEF_TILE_SIZE+DEF_TILE_OFFSET)*x)
							,offset_y+((DEF_TILE_SIZE+DEF_TILE_OFFSET)*y));
						
					}
				}
				context.stroke();
			},
			*/
			draw_tile: function(x,y)
			{
				/*
				context.moveTo(offset_x+(20*x),offset_y+(10*y));
				
				context.lineTo(offset_x+10+(20*x),offset_y+5+(10*y));
				context.lineTo(offset_x+20+(20*x),offset_y+(10*y));
				context.lineTo(offset_x+10+(20*x),offset_y-5+(10*y));
				context.lineTo(offset_x+(20*x),offset_y+(10*y));
				
				context.stroke();
				*/
			},
			
			rotate_clockwise: function()
			{
				if (map_orientation >= 3)
				{
					map_orientation = 0;
				}
				else
				{
					map_orientation = map_orientation + 1;
				}
				isometric_renderer.draw();
			},
			
			rotate_counterclockwise: function()
			{
				if (map_orientation <= 0)
				{
					map_orientation = 3;
				}
				else
				{
					map_orientation = map_orientation - 1;
				}
				isometric_renderer.draw();
			},
			// converters
			
			/*
			isometric_to_cartesian: function(point)
			{
				return new Point(Math.round((point.x - point.y)/1.5),Math.round((point.x/3) + (point.y/1.5)))
			},
			
			cartesian_to_isometric: function(point)
			{
				return new Point(point.x + point.y, Math.round(point.y-(point.x/2)))
			},
			*/
			
			// tile checker
			getTile: function(point)
			{
				var x = point.x-offset_x;
				var y = point.y-offset_y;
				if (x > 0 && y >0)
				{
					// find out if tile exists
					
					// logging
					engine.log("The tile clicked was at:" + x + "," + y);
					engine.notify("The tile clicked was at:" + x + "," + y);
				}
			},
			
			
			// FOR TESTING PURPOSES
			getTileCartesian: function(point)
			{
				var x = Math.floor((point.x-offset_x)/(DEF_TILE_SIZE+DEF_TILE_OFFSET) + 1);
				var y = Math.floor((point.y-offset_y)/(DEF_TILE_SIZE+DEF_TILE_OFFSET) + 1);
				if (x > 0 && y >0)
				{
					// find out if tile exists
					
					// logging
					engine.log("The tile clicked was at:" + x + "," + y);
					engine.notify("The tile clicked was at:" + x + "," + y);
				}
				
				
			},
			
			moveToTile: function(point)
			{
				tile_offset_x = point.x;
				tile_offset_y = point.y;
			},
			
			moveToTileUp: function()
			{
				tile_offset_y = tile_offset_y + 1;
				isometric_renderer.draw();
			},
			moveToTileDown: function()
			{
				tile_offset_y = tile_offset_y - 1;
				isometric_renderer.draw();
			},
			moveToTileLeft: function()
			{
				tile_offset_x = tile_offset_x - 1;
				isometric_renderer.draw();
			},
			moveToTileRight: function()
			{
				tile_offset_x = tile_offset_x + 1;
				isometric_renderer.draw();
			},
			//
			
			set_map: function(map)
			{
				this.map = map;
			},
			
			clear: function()
			{
				context.clearRect(0,0,canvas.width,canvas.height);
			}
		};
	}
)();

var tiles = image_loader.get_images();

function Point(x,y)
{
	this.x = x;
	this.y = y;
}
