$(document).ready(function(){
        $("#uploadproductImageslink").click(function(event){
            event.preventDefault();
        $("#productUpload").show();
							$("#productImages").hide();


        });
    });

$(document).ready(function(){
Dropzone.autoDiscover = false; // keep this line if you have multiple dropzones in the same page
  $(".dropzone").dropzone({
    init: function() {
    this.on("sending", function(file, xhr, formData) {
       var value = $('#storeid').val();
       var value1 = $('#productid').val();
       formData.append("storeid", value); // Append all the additional input data of your form here!
       formData.append("productid", value1);
    });
},
   paramName:"userPhoto",
  acceptedFiles: "image/*",
    url: '/product/productimageupload',
    maxFiles: 10, // Number of files at a time
  maxFilesize: 10, //in MB
    maxfilesexceeded: function(file) {
        alert('You have uploaded more than 1 Image. Only the first file will be uploaded!');
    },
  success: function (response) {

   // console.log('Image -> '+x.img+', Thumb -> '+x.thumb);          // Just to return the JSON to the console.
  },
  addRemoveLinks: true,
  removedfile: function(file) {
    var _ref;
       return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
     }

  });

});
