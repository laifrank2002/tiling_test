// notes
/*
	C1 - C4
	|    |
	C2 - C3
 */

var isometric_renderer = (
	function()
	{
		var DEF_TILE_SIZE = 10;
		var DEF_TILE_OFFSET = 0; // space between tiles
		var DEF_TILE_STRETCH_FACTOR = 2; // stretching the tile bfo this
		
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		var map;
		
		var offset_x = 50;
		var offset_y = 200;
		return {
			
			draw: function()
			{
				
			},
			
			// draws a simple canvas map for debugging
			draw_isometric_map: function()
			{
				engine.log("Drawing simple map...");
				context.moveTo(offset_x,offset_y);
				
				// draw a giant map
				for (let y = 0; y < 20; y++)
				{
					for (let x = 0; x < 20; x++)
					{
						context.beginPath();
						context.moveTo(offset_x+(20*x)-(10*x)+(10*y)
							,offset_y+(5*y)+(-5*x));
						context.lineTo(offset_x+10+(20*x)-(10*x)+(10*y)
							,offset_y+5+(5*y)+(-5*x));
						context.lineTo(offset_x+20+(20*x)-(10*x)+(10*y)
							,offset_y+(5*y)+(-5*x));
						context.lineTo(offset_x+10+(20*x)-(10*x)+(10*y)
							,offset_y-5+(5*y)+(-5*x));
						/*
						context.lineTo(offset_x+(20*x)-(10*x)+(10*y)
							,offset_y+(5*y)+(-5*x));
						*/
						context.closePath();
						context.stroke();
						context.fillStyle="#22ff22";
						context.fill();

					}
				}
				
				//context.stroke();
			},
			// draws a square 2d based map for debugging and transforms
			draw_square_map: function()
			{
				engine.log("Drawing square tile map...");
				for (let x = 0; x < 20; x++)
				{
					for (let y = 0; y < 20; y++)
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
			
			draw_tile: function(x,y)
			{
				context.moveTo(offset_x+(20*x),offset_y+(10*y));
				
				context.lineTo(offset_x+10+(20*x),offset_y+5+(10*y));
				context.lineTo(offset_x+20+(20*x),offset_y+(10*y));
				context.lineTo(offset_x+10+(20*x),offset_y-5+(10*y));
				context.lineTo(offset_x+(20*x),offset_y+(10*y));
				
				context.stroke();
			},
			
			// converters
			
			isometric_to_cartesian: function(point)
			{
				return new Point(Math.round((point.x - point.y)/1.5),Math.round((point.x/3) + (point.y/1.5)))
			},
			
			cartesian_to_isometric: function(point)
			{
				return new Point(point.x + point.y, Math.round(point.y-(point.x/2)))
			},
			
			// tile checker
			getTile: function(point)
			{
				
			},
			
			
			// FOR TESTING PURPOSES
			getTileCartesian: function (point)
			{
				var x = Math.floor((point.x-offset_x)/(DEF_TILE_SIZE+DEF_TILE_OFFSET) + 1);
				var y = Math.floor((point.y-offset_y)/(DEF_TILE_SIZE+DEF_TILE_OFFSET) + 1);
				if (x > 0 && y >0)
				{
					// find out if tile exists
					
					// logging
					engine.log("The tile clicked was at:" + x + "," + y);
					engine.post("The tile clicked was at:" + x + "," + y);
				}
				
				
			},
			
			//
			
			set_map: function(map)
			{
				this.map = map;
			},
			
			initialize: function()
			{
				engine.log("Initializing isometric renderer...");
				isometric_renderer.draw_isometric_map();
			},
		};
	}
)();

function Point(x,y)
{
	this.x = x;
	this.y = y;
}