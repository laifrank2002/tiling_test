var engine = {
	_log: true,
	
	log: function(message)
	{
		if(engine._log)
		{
			console.log(message);
		}
	},
	
	notify: function(message)
	{
		var message_panel = document.getElementById("console");
		
		// clever way to keep the message bar short
		if (message_panel.childNodes.length > 28 ) {
            message_panel.removeChild(message_panel.childNodes[9]);
        }
		
		var messageElement = document.createElement("DIV");
		messageElement.innerHTML = message;
		message_panel.appendChild(messageElement);
	},
	
	initialize: function()
	{
		engine.log("Initializing...");
		isometric_renderer.initialize();
		key_handler.initialize();
	},
};