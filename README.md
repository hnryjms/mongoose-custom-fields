# mongoose-custom-fields

Dynamically extend your [Mongoose.js](http://mongoosejs.com/) schemas with unstructured custom fields.

## Installation

	$ npm install mongoose-custom-fields

mongoose-custom-fields does not require the `mongoose` module directly but expects you to have it installed.

## Usage

### Adding mongoose-custom-fields to your schema

mongoose-custom-fields uses Mongoose's built-in schema pluggability to extend your existing schemas.



```js
var customFields = require('mongoose-custom-fields');

var PostSchema = new Schema({ /* ... */ });
PostSchema.plugin(customFields);

var Post = mongoose.model('Post', PostSchema);
```

### Saving & updating custom fields

You can save custom fields to your objects with one simple method call to your objects.

```js
var post = new Post();

post.customField('tags', [ 'simple', 'mongoose', 'fields' ]);
post.customField('comments', false);

post.save(function(err) {
	// Do other cool stuff
});
```

### Accessing custom fields

After fields have been saved, you can access them with the same method in your object.

```js
Post.findById(req.query.id, function(err, post) {
	var tags = post.customField('tags');

	// Do other cool stuff
});
```

You can also get a list of currently saved custom properties with the `customKeys` virtual property.

```js
Post.findById(req.query.id, function(err, post) {
	var properties = post.customKeys;

	// properties will be [ 'tags', 'comments' ]
});
```

### Removing existing custom fields

You can remove saved custom fields by setting their value explicitly to `null`. Note that falsey values do not remove the field.

```js
Post.findById(req.query.id, function(err, post) {
	post.customField('comments', null);
});
```

## Testing

We use the [mocha](http://visionmedia.github.io/mocha/) testing framework. To run tests, first install the module with development dependencies.

	$ npm install

You can run tests through npm or through mocha. Both will have the same result.

	$ npm test
	$ mocha test

## License

This software is published in the Public Domain. See LICENSE file for more details.
