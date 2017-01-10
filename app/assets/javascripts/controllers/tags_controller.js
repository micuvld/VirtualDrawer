
/**
 * Created by vlad on 28.10.2016.
 */
virtualDrawer.controller('TagController', ['$scope', '$http', '$timeout', function($scope,$http,$timeout) {
    $scope.tags = ['a'];
    $scope.dropzones = [];
    $scope.searchTag = "";

    $scope.newTagDropzone = null;
    $scope.newTagName = "";
    $scope.tagNameInput = "";

    $scope.hoveredTagId = -1;

    $scope.currentEditingTag = "";
    $scope.oldNameOfCurrentEditingTag = "";

    function Tag(id, name) {
        this.id = id;
        this.name = name;

        this.deleteSelf = function() {
            $http(
                {
                    url:'/tags',
                    method:'DELETE',
                    params: {
                        username: 'oneName',
                        tagId: this.id
                    },
                    headers: {
                        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                    }
                })
                .then(function(result) {
                        getAllTags();
                        $scope.toggleModalEdit();
                    }
                );
        }

        this.updateSelf = function() {        
            $http(
                {
                    url:'/tags',
                    method:'PUT',
                    params: {
                        username: 'oneName',
                        tagId: this.id,
                        tagNewName: this.name
                    },
                    headers: {
                        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                    }
                })
                .then(function(result) {
                        getAllTags();
                        $scope.toggleModalEdit();
                    }
                );
        }
    }

    getAllTags();

    function getAllTags() {
            $http(
        {
            url:'/tags',
            method:'GET',
            params: {username: 'oneName'}
        })
        .then(function(result) {
                $scope.tags = result.data.map(function(elem) {
                    return new Tag(elem.id, elem.name)
                });
                $timeout(createDropzones, 50);
                console.log($scope.tags);
            }
        );
    }

    $scope.tagAction = function(tag) {
        window.location = "/items/" + tag.id;
    }

    function createDropzones() {
        $scope.dropzones = [];
        Dropzone.autoDiscover = false;
        for (var index in $scope.tags) {
            var dropzoneTagId = "formDropzoneTag" + $scope.tags[index].id;
            createDropzoneElement($scope.tags[index], dropzoneTagId);
        }

        if ($scope.newTagDropzone == null) {
            createDropzoneNewTag("new-tag-modal-form");
        }
    }

    function createDropzoneElement(tag, dropzoneTagId) {
        var form = document.createElement('form');
        form.classList.add('dropzone');
        form.classList.add('tag');
        form.method = 'post';
        form.action = '/upload';
        form.id = dropzoneTagId;
        form.innerHTML = tag.name;
        document.getElementById('tag_' + tag.id).appendChild(form);

        var dropzone = new Dropzone(form,
            {
                init: function() {
                    this.on("sending", function(file,xhr,formData) {
                    	console.log($scope.newTagName);
                        formData.append("username", "oneName");
                        formData.append("tag_name", tag.name);
                        formData.append("item_type", "file");
                        formData.append("alternative_name", '');
                    });
                    this.on("complete", function (file) {
                        if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                            dropzone.removeAllFiles();
                        }
                    });
                },
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                clickable: false,
                createImageThumbnails: false,
                dictDefaultMessage: ''
            });

        $scope.dropzones.push(dropzone);
    }

    function createDropzoneNewTag(dropzoneTagId) {
        var form = document.createElement('form');
        form.classList.add('dropzone');
        form.classList.add('new-tag');
        form.method = 'post';
        form.action = '/upload';
        form.id = dropzoneTagId;
        form.innerHTML = "New tag";

        $scope.tagNameInput = document.createElement("input");
        $scope.tagNameInput.type = "text";
        $scope.tagNameInput.name = "tag_name"
        $scope.tagNameInput.hidden = true;

        form.appendChild($scope.tagNameInput);
        document.getElementById('new_tag_button').appendChild(form);

        $scope.newTagDropzone = new Dropzone(form,
            {
                init: function() {
                    this.on("drop", function(file) {
                        $scope.toggleModalNew();
                    });
                    this.on("sending", function(file,xhr,formData) {
                        formData.append("username", "oneName");
                        formData.append("item_type", "file");
                        formData.append("alternative_name", '');
                    });
                    this.on("complete", function (file) {
                        if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                            $scope.newTagDropzone.removeAllFiles();
                        }
                    });
                },
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                autoProcessQueue:false,
                clickable: false,
                createImageThumbnails: false,
                dictDefaultMessage: ''
            });
    }

    $scope.createNewTagAndUploadFile = function() {
        $scope.tagNameInput.setAttribute("value", $scope.newTagName);
    	$scope.newTagDropzone.processQueue();
        $scope.toggleModalNew();
        getAllTags();
    }

    $scope.showButtonsForTag = function(tagId) {
        $scope.hoveredTagId = tagId;
    }

    $scope.editButtonIsVisible = function(tagId) {
        return tagId == $scope.hoveredTagId
    }

    $scope.toggleEditTag = function(tag) {
        $scope.currentEditingTag = tag;
        $scope.oldNameOfCurrentEditingTag = tag.name;
        $scope.toggleModalEdit();
    }
}]);