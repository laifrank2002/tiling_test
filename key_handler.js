var key_handler = (
	function()
	{
		
		return {
			initialize: function()
			{
				engine.log("Initializing key handler...");
				addEventListener("keydown", function(e) 
				{
					switch (e.keyCode) 
					{
						case 87:
						case 38:
							isometric_renderer.moveToTileUp();
							engine.log("UP key pressed");
							break;

						case 83:
						case 40:
							isometric_renderer.moveToTileDown();
							engine.log("DOWN key pressed");
							break;
							
						case 65:
						case 37:
							isometric_renderer.moveToTileLeft();
							engine.log("LEFT key pressed");
							break;

						case 68:
						case 39:
							isometric_renderer.moveToTileRight();
							engine.log("RIGHT key pressed");
							break;
					}
				});
			}
		}
	}
)();