
/**
 * Created by vlad on 28.10.2016.
 */
virtualDrawer.controller('TagController', ['$scope', '$http', '$timeout', function($scope,$http,$timeout) {
    $scope.colors = ['#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];
    $scope.tags = ['a'];
    $scope.dropzones = [];
    $scope.searchTag = "";

    $scope.newTagDropzone = null;
    $scope.newTagName = "";
    $scope.tagNameInput = "";

    $scope.currentEditingTag = "";
    $scope.oldNameOfCurrentEditingTag = "";
    var editableTags = false;

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

    $scope.$on('editButtonsForTagController', function() {
        editableTags = !editableTags;
    });

    $scope.getEditableStatus = function() {
        return editableTags ? "editable-tag-container" : "tag-container";
    }

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
        if (editableTags == true) {
            $scope.currentEditingTag = tag;
            $scope.oldNameOfCurrentEditingTag = tag.name;
            $scope.toggleModalEdit();
        } else {
            window.location = "/items/" + tag.id;
        }
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
        console.log("hi");
        console.log($scope.newTagName);
        $scope.tagNameInput.setAttribute("value", $scope.newTagName);
    	$scope.newTagDropzone.processQueue();
        $scope.toggleModal();
        window.location.reload();
    }
}]);