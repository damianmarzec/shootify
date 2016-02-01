
var BaseEntity = function (settings)
{
	var __ = this;
	__.id = false;    

	__.fill = function(data)
	{
		for (var name in data) {
			if (typeof __[name] != 'undefined') {
				__[name] = data[name];
				console.log(name);
			}
		}
	}
};

module.exports = {

	Player : function(data)
	{

		var __ = this;

		__.hp = 100;

		__.init = function()
		{
			BaseEntity.call(this);
		    __.prototype = new BaseEntity();
		    __.prototype.constructor = __;
		    __.fill(data);

		}

	},

	Map : function(data)
	{

		var __ = this;

		__.width = 100;    
		__.height = 100;

		__.init = function()
		{
			__.fill(data);
		}
	}
};
