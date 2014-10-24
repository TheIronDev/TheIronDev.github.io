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
	}
}

module.exports = docpadConfig