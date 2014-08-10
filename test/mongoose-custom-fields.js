var Mongoose = require('mongoose');
var expect = require('expect.js');
var customFields = require('../index.js');

var MySchema = new Mongoose.Schema();
MySchema.plugin(customFields);
var MyModel = Mongoose.model('MyModel', MySchema);

describe('mongoose-custom-fields', function() {
	it('should have property', function() {
		var object = new MyModel({ _customFields: [ { name: 'Sample', value: new Date() } ] });
		
		expect(object).to.have.property('_customFields');
	});
	
	describe('customField()', function() {
		it('should exist', function() {
			var object = new MyModel();

			expect(object.__proto__).to.have.key('customField');
		});
		it('should return undefined', function() {
			var object = new MyModel();

			expect(object.customField('theme')).to.not.be.ok();
		});
		it('should save new value', function() {
			var object = new MyModel();

			var tags = ['mongoose', 'custom-fields', 'schema'];
			object.customField('tags', tags);
			expect(object.customField('tags')).to.be(tags);
		});
		it('should update value', function() {
			var object = new MyModel();

			var now = new Date();
			var birthday = new Date('01/01/2000 00:00:00.000');
			object.customField('birthday', now);

			expect(object.customField('birthday')).to.be(now);

			object.customField('birthday', birthday);

			expect(object.customField('birthday')).to.be(birthday);
		});
		it('should remove value', function() {
			var object = new MyModel();

			var parent = Mongoose.Types.ObjectId();
			object.customField('parent', parent);
						
			expect(object.customField('parent')).to.be(parent);

			object.customField('parent', null);

			expect(object.customField('parent')).to.not.be.ok();
			expect(object.customKeys).to.have.length(0);
		});
		it('should work for falsey values', function() {
			var object = new MyModel();
			
			object.customField('comments', false);
			
			expect(object.customField('comments')).to.be(false);
			expect(object.customKeys).to.have.length(1);
			expect(object.customKeys[0]).to.be.eql('comments');
		});
		it('should remove falsey values', function() {
			var object = new MyModel();
						
			object.customField('comments', false);
						
			expect(object.customField('comments')).to.be(false);
			expect(object.customKeys).to.have.length(1);
			
			object.customField('comments', null);
			
			expect(object.customField('comments')).to.be(undefined);
			expect(object.customKeys).to.have.length(0);
		});
	});
	
	describe('customKeys', function() {
		it('should give empty list', function() {
			var object = new MyModel();
			
			expect(object.customKeys).to.be.an(Array);
			expect(object.customKeys).to.have.length(0);
		});
		it('should include keys', function() {
			var object = new MyModel();
			
			object.customField('theme', 'admin-dark.css');
			object.customField('tags', [ 'mongoose', 'custom-fields' ]);
			
			expect(object.customKeys).to.have.length(2);
			expect(object.customKeys).to.contain('theme');
			expect(object.customKeys).to.contain('tags');
		});
	});
});
