 $(document).ready(function(){
        $("#btn-create-varient").click(function(event){
            event.preventDefault();

            $.ajax({
                    url:'/product/createproductvarient',
                    type:'POST',
                    data:$("#create-varient").serialize(),
                    success:function(result){
                     $("#create-varient").hide();
                            $("#addAnotherProductvarient").show();
                            $("#addAnotherProductvarient1").show();

                    },
                error:function(result){

                 $("#create-varient").hide();
                            $("#addAnotherProductvarient").show();
                            $("#addAnotherProductvarient1").show();
                    }


            });
        });
    });


    $(document).ready(function(){
        $("#addAnotherProductvarientbutton").click(function(event){
            event.preventDefault();
        $("#create-varient").show();
                            $("#addAnotherProductvarient").hide();
                            $("#addAnotherProductvarient1").hide();

        });
    });












$(document).ready(function(){
        $("#uploadproductImageslink").click(function(event){
            event.preventDefault();
        $("#productUpload").show();
							$("#productImages").hide();


        });
    });


$(document).ready(function(){
        $(".thumbnail").click(function(event){

alert($( this).find( "#arrayid" ).val());
$(this).closest( "div" ).remove();
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


  $(document).ready(function(){
        $("#savevariants").click(function(event){
            event.preventDefault();

            $.ajax({
                    url:'/product/createvarienttype',
                    type:'POST',
                    data:$("#variantform").serialize(),
                    success:function(result){

                            $("#varientblock").hide();
                            $("#addAnothervarainetType").show();
                            $("#addAnothervarainetType1").show();
                            $('input').tagsinput('removeAll');


                    },
                error:function(result){

                            $("#varientblock").hide();
                            $("#addAnothervarainetType").show();
                            $("#addAnothervarainetType1").show();

                             $('input').tagsinput('removeAll');
                    }


            });
        });
    });

$(document).ready(function(){
        $("#addAnothervarainetTypebutton").click(function(event){
            event.preventDefault();
        $("#varientblock").show();
                            $("#addAnothervarainetType").hide();
                            $("#addAnothervarainetType1").hide();

        });
    });
