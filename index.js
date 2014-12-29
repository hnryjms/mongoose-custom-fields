// Mongoose customFields plugin

var _ = require('underscore');

var customFields = function(schema, options) {
	schema.add({
		_customFields: [ {
			name: { type: String },
			value: { type: {} } 
		} ]
	});
	schema.methods.customField = function(name, value) {
		var property = _.findWhere(this._customFields, { name: name });

		if (name && property && value === undefined) {
			return property.value;
		} else if (name && value != null) {
			if (property) {
				property.value = value;
				// this.markModified('customFields');
			} else {
				this._customFields.push({ name: name, value: value });
			}
		} else if (name) {
			this._customFields = _.without(this._customFields, property);
		} else {
			throw new Error("You cannot call this function with no arguments.");
		}
	}
	schema.virtual('customKeys').get(function(){
		return _.reduce(this._customFields, function(keys, prop) { keys.push(prop.name); return keys; }, []);
	});
}

module.exports = exports = customFields;