// notes
/*
	C1 - C4
	|    |
	C2 - C3
 */

var isometric_renderer = (
	function()
	{
		var DEF_TILE_SIZE = 12;
		var DEF_TILE_OFFSET = 1; // space between tiles - not implemented
		var DEF_TILE_STRETCH_FACTOR = 2; // stretching the tile bfo tiles - not implemented 
		
		var DEF_MAP_HEIGHT = 12;
		var DEF_MAP_WIDTH = 25;
		
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		var current_map;
		
		var offset_x = 50;
		var offset_y = 200;
		
		var tile_offset_x = 0;
		var tile_offset_y = 0;
		
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
				
				// draw tiles and lines 
				for (let y = 0; y < DEF_MAP_HEIGHT + 0; y++)
				{
					for (let x = 0; x < DEF_MAP_WIDTH + 0; x++)
					{
						// technical debt in reorganizing, STILL NEED TO ADD IN BFO
						
						// line styling
						
						context.strokeStyle = "rgba(211, 211, 211, 1)";
						
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
						switch(current_map.get_tile((x+tile_offset_x),(y+tile_offset_y)))
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
						

					} // end x
				} // end y
				
				// draw the bloody border so I can see where it bloody is!
				context.strokeStyle = "rgba(211, 211, 211, 1)";
				context.lineWidth = 2;
				
				context.beginPath();
				context.moveTo(offset_x, offset_y);
				
				// TESTING DEBUG VALUES ONLY
				context.lineTo(offset_x+DEF_MAP_WIDTH*DEF_TILE_SIZE
					,offset_y+DEF_MAP_WIDTH*DEF_TILE_SIZE*0.5);
				context.lineTo(offset_x+(DEF_TILE_SIZE*(DEF_MAP_HEIGHT+DEF_MAP_WIDTH))
					,offset_y+0.5*DEF_TILE_SIZE*(DEF_MAP_WIDTH-DEF_MAP_HEIGHT));
				context.lineTo(offset_x+(DEF_MAP_HEIGHT)*DEF_TILE_SIZE
					,offset_y-((DEF_MAP_HEIGHT)*DEF_TILE_SIZE*0.5));
				context.closePath();
				context.stroke();
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

function Point(x,y)
{
	this.x = x;
	this.y = y;
}

