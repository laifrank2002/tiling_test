var key_handler = (
	function()
	{
		var initialized = false;
		
		return {
			initialize: function()
			{
				if(!initialized)
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
					initialized = true;
				}
				else
				{
					engine.log("Keyhandler is already initialized!");
				}
			},
			// DOESN'T WORK
			remove: function()
			{
				if(initialized)
				{
					engine.log("Removing keyhandler...");
					initialized = false;
					removeEventListener("keydown",function(e) 
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
				else
				{
					engine.log("Keyhandler has not been initialized!");
				}
			},
		} // end of return 
	}
)();