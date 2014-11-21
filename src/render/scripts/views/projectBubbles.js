/**
 * This view controls animation for the bubbles around my avatar
 */

define(['backbone', 'models/projectBubbles'],
	function(Backbone, ProjectBubblesModel){
		var ProjectBubbles = Backbone.View.extend({
			el: '.avatar-project-container',
			events: {
				'mouseover .circle': 'focusBubble',
				'mouseout .circle': 'unFocusBubble'
			},
			initialize: function() {

				var $circles = this.$('.circle');

				this.model = new ProjectBubblesModel();

				this.model.set('size', $circles.length);
				this.transformCircles($circles.slice(1));
			},
			focusBubble: function(event) {
				var $bubble = $(event.currentTarget),
					moreInfoHtml = $bubble.find('.circle-more-info').html();

				this.$('.focus-more-info').html(moreInfoHtml);
				this.$el.addClass('moreInfo');
			},
			unFocusBubble: function(event) {
				this.$el.removeClass('moreInfo');
			},
			transformCircles: function(projects) {
				var model = this.model,
					self = this;

				if (projects && projects.length) {

					this.model.bumpCurrent();
					projects.each(function() {
						var $project = $(this);
						$project.css('transform', model.get('currentTransformClass'));
					});

					setTimeout(function(){
						self.transformCircles(projects.slice(1));
					}, 150);
				}
			}
		});

		return ProjectBubbles;
});