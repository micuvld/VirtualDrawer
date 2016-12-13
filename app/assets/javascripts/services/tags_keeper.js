virtualDrawer.service('tagsKeeper', function() {
	var tags = null;

	function getTags() {
		return tags;
    }

    function setTags(tagsToSet) {
    	tags = tagsToSet;
    }

	return {
		getTags: getTags,
		setTags: setTags
	}
})