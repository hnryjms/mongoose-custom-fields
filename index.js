// Mongoose customFields plugin

var _ = require('underscore');

var customFields = function(schema, options) {
	schema.add({
		_customFields: [ {
			name: { type: String, unique: true },
			value: { type: {} } 
		} ]
	});
	schema.methods.customField = function(name, value) {
		var property = _.findWhere(this._customFields, { name: name });

		if (property && !value && value !== null) {
			return property.value;
		} else if (name && value) {
			if (property) {
				property.value = value;
				// this.markModified('customFields');
			} else {
				this._customFields.push({ name: name, value: value });
			}
		} else if (name) {
			this._customFields = _.without(this._customFields, property);
		}
	}
	schema.virtual('customKeys').get(function(){
		return _.reduce(this._customFields, function(keys, prop) { keys.push(prop.name); return keys; }, []);
	});
}

module.exports = exports = customFields;