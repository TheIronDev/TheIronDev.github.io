/**
 * Project Bubbles - This model holds the basic config for the Project Bubbles
 */


define(['backbone'],
	function(Backbone){
		var ProjectBubbles = Backbone.Model.extend({
			defaults: {
				size: 6,
				current: 0,
				currentTransformClass: '',
				height: 7
			},
			initialize: function() {
				this.listenTo(this, 'change:current', this.updateClass);
			},
			bumpCurrent: function() {
				this.set('current', this.get('current') + 1);
			},
			updateClass: function(model, current) {
				var height = this.get('height'),
					size = this.get('size'),
					angle = 360 / size * current,
					currentTransformClass = 'rotate(' + angle + 'deg) translateY(-' + height + 'em)';

				return this.set('currentTransformClass', currentTransformClass);
			}
		});

		return ProjectBubbles;
	});