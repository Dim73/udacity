/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false,
            priority: false,
            deleted: false
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		},

        // Toggle the `priority` state of this todo item.
        prioritized: function () {

            this.save({
                priority: !this.get('priority')
            });
            app.todos.sort();
            app.todos.trigger('reset');
        },

        toggleDelete: function() {
            this.save({
                deleted: !this.get('deleted'),
                completed: this.get('deleted')
            });
        }
	});
})();
