/**
 * require.js config
 */
require.config({
	baseUrl: '/scripts/',
	deps: ['app'],
	paths: {
		jquery: 'lib/jquery',
		backbone: 'lib/backbone-min',
		underscore: 'lib/underscore-min'
	},
	shim: {
		jquery: {
			exports: 'jquery'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});