// adds an event listener that detects which tile in a grid is being clicked based on set parameters
var tile_detector = (
	function()
	{
		
		return {
			// mouse event
			getMouseClick: function (event)
			{
				//engine.log("Mouse clicked at: [" + event.offsetX + "," + event.offsetY + "]");
				//isometric_renderer.getTileCartesian(new Point(event.offsetX,event.offsetY));
			},
		}
	}
)();
