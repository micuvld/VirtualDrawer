/**
 * Created by vlad on 29.10.2016.
 */
virtualDrawer.controller('SideNavController', function ($scope, $timeout, $mdSidenav, $log) {
    // console.log(angular.element('#my-dropzone')[0]);
    // var myDropzone = new Dropzone(angular.element(document.querySelector( '#my-dropzone' ))[0]);
    //
    // myDropzone.on("drop", function(file){
    //     console.log("hi")
    // })

    Dropzone.options.myDropzone = {
        init: function() {
            this.on("drop", function(file) { alert("Added file."); });
        },
        autoProcessQueue: false
    };
});