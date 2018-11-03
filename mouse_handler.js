// adds an event listener that detects which tile in a grid is being clicked based on set parameters
var mouse_handler = (
	function()
	{
		
		return {
			// mouse event
			getMouseClick: function (event)
			{
				engine.log("Mouse clicked at: [" + event.offsetX + "," + event.offsetY + "]");
				//isometric_renderer.getTile(new Point(event.offsetX,event.offsetY));
			},
		}
	}
)();
