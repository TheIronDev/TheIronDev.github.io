docpadConfig = {
	plugins: {
		ghpages: {
			deployRemote: 'origin',
			deployBranch: 'master'
		}
	},
	collections: {
		circles: function() {
			return this.getCollection("documents").findAll({isCirclePartial:true});
		}
	},
	watchOptions: {
		catchupDelay: 0
	}
};

module.exports = docpadConfig;