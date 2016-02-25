
var BaseEntity = function (settings)
{
	var __ = this;
	__.id = false;    

	__.fill = function(data)
	{
		for (var name in data) {
			if (typeof __[name] != 'undefined') {
				__[name] = data[name];
			}
		}
	}
};

module.exports = {

	Player : function(data)
	{

		var __ = this;

		__.hp = 100;
		__.x = 0;
		__.y = 0;

		__.init = function()
		{
			BaseEntity.call(this);
		    __.prototype = new BaseEntity();
		    __.prototype.constructor = __;
		    __.fill(data);
		    return __;
		}
		
		__.get = function(){
			return {
				id: __.id,
				hp: __.hp,
				x: __.x,
				y: __.y
			}
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
