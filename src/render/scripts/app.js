/**
 * App.js - entry point for my views / etc
 */


define(['jquery', 'views/projectBubbles'],
	function($, ProjectBubbles) {
		$(document).ready(function(){
			var projectBubbles = new ProjectBubbles();
		});
	});