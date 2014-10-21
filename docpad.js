docpadConfig = {
	plugins: {
		ghpages: {
			deployRemote: 'origin',
			deployBranch: 'master'
		}
	},
	collections: {
		projects: function() {
			return this.getCollection("documents").findAll({isProject:true});
		}
	}
}

module.exports = docpadConfig