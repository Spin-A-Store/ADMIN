/// used by rich text editor

 $(document).ready(function() {
        function initToolbarBootstrapBindings() {
          var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
              'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
              'Times New Roman', 'Verdana'
            ],
            fontTarget = $('[title=Font]').siblings('.dropdown-menu');
          $.each(fonts, function(idx, fontName) {
            fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
          });
          $('a[title]').tooltip({
            container: 'body'
          });
          $('.dropdown-menu input').click(function() {
              return false;
            })
            .change(function() {
              $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
            })
            .keydown('esc', function() {
              this.value = '';
              $(this).change();
            });

          $('[data-role=magic-overlay]').each(function() {
            var overlay = $(this),
              target = $(overlay.data('target'));
            overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
          });

          if ("onwebkitspeechchange" in document.createElement("input")) {
            var editorOffset = $('#editor').offset();

            $('.voiceBtn').css('position', 'absolute').offset({
              top: editorOffset.top,
              left: editorOffset.left + $('#editor').innerWidth() - 35
            });
          } else {
            $('.voiceBtn').hide();
          }
        }

        function showErrorAlert(reason, detail) {
          var msg = '';
          if (reason === 'unsupported-file-type') {
            msg = "Unsupported format " + detail;
          } else {
            console.log("error uploading file", reason, detail);
          }
          $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
            '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
        }

        initToolbarBootstrapBindings();

        $('#editor').wysiwyg({
          fileUploadError: showErrorAlert
        });

        window.prettyPrint;
        prettyPrint();
      });
 
    <!-- /bootstrap-wysiwyg -->
    /// used by rich text editor


 $(document).ready(function() {


   $('#editor').change(function() { 
        $("#productNamesavebutton").removeAttr("disabled");
   }); 

$("#SGSKU").on("ifChanged", function(){


  
        if($(this).is(":checked")) {                
            $("#sku").attr("disabled", "disabled");
        }
        else {
            $("#sku").removeAttr("disabled");
        }
})


 $("#productNamesavebutton").click(function(event){
            event.preventDefault();
            $("#descr").val($("#editor").html());




    
            if($("#productid").val().length>0){

                $.ajax({
                    url:'/product/updateproductdescription',
                    type:'POST',
                    data:$("#productNamesaveform").serialize(),
                    success:function(result){
                       
                            

                    },
                error:function(result){

               

            }
      }
      
      );

            }else{
      
            $.ajax({
                    url:'/product/createproduct',
                    type:'POST',
                    data:$("#productNamesaveform").serialize(),
                    success:function(result){
                       $("#productid").val(result._id);
                       $("#sku").val(result.sku);
                       $("#sku").attr("disabled", "disabled");
                       $("#SGSKU").attr("disabled", "disabled");
                       $("#title").attr("disabled", "disabled");
                       $("#productNamesavebutton").attr("disabled", "disabled");
                       $( "#profile-tab").css( 'pointer-events', 'auto' );
                       $( "#profile-tab2").css( 'pointer-events', 'auto' );
                       
                            

                    },
                error:function(result){

               

            }
      }
      
      );

          }
     




 })


 })



<!-- //Image upload---------------------------------------------->

$(document).ready(function(){
Dropzone.autoDiscover = false; // keep this line if you have multiple dropzones in the same page
  $(".dropzone").dropzone({
    init: function() {
    this.on("sending", function(file, xhr, formData) {
       
       var value1 = $('#productid').val();
     
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

<!-- //Image upload---------------------------------------------->

$(document).ready(function(){

  $("#imageuploadclose").click(function(){

   $.ajax({
                    url:'/product/getproductImagebyproductid',
                    type:'GET',
                    data:{"var":$('#productid').val()},
                    success:function(result){
                        var markup="";
                       for (i = 0; i < result.assets.imgs.length; i++) {
                            markup=markup+thumbNailmarkup(result.assets.imgs[i].img.src)
                           }
                            
$('#imageholder').html(markup)
                    },
                error:function(result){

               

            }
      }
      
      );

  });



})


var thumbNailmarkup=function(path){

                        var data='<div class="col-md-55">';
                        data=data+'<div class="thumbnail">';
                          data=data+'<div class="image view view-first">';
                            data=data+'<img style="width: 100%; display: block;" src="';
                            data=data+path
                            data=data+'" alt="image" />';
                            data=data+'<div class="mask">';
                              data=data+'<p>Your Text</p>';
                              data=data+'<div class="tools tools-bottom">';
                                data=data+'<a href="#"><i class="fa fa-link"></i></a>';
                                data=data+'<a href="#"><i class="fa fa-pencil"></i></a>';
                                data=data+'<a href="#"><i class="fa fa-times"></i></a>';
                              data=data+'</div>';
                            data=data+'</div>';
                          data=data+'</div>';
                          data=data+'<div class="caption">';
                           data=data+' <p></p>';
                          data=data+'</div>';
                        data=data+'</div>';
                     data=data+' </div>';

                     return data;


}




