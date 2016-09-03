/*   $( document ).ready(function() {



 
                 $.ajax({
                    url:'/product/getCategoryTreeByStoreid',
                    type:'GET',
                    success:function(result){

                      $('#container').jstree({
                                  'core' : {
                                        'data':'/',
                                       'children' : result
                                           }
                                      });
                     

                    },
                error:function(result){
                    

                    }});
 





});
*/

/*$(document).ready(function(){ 
    //fill data to tree  with AJAX call
    $('#container').jstree({
        'core' : {
      'data' : {
              'url' : '/product/getCategoryTreeByStoreid',
              'data' : function (node) {
                return { 'id' : node.id };
              },
              "dataType" : "json"
            }
            ,'check_callback' : true,
            'themes' : {
              'responsive' : false
            }
      },
      "checkbox" : { 
    "three_state" : false
},
      'plugins' : ['state','contextmenu','wholerow','checkbox']
    }).on('create_node.jstree', function (e, data) {
            
             
         
        }).on('rename_node.jstree', function (e, data) {
         
          $.post( "/product/renameCategory",{"category":data.instance.get_path(data.node,'/')}, function() {
                                  
                                         })
                                       .done(function() {
                                       
                                         })
                                        .fail(function() {
                                         
                                         })
                                       .always(function() {
                                     
                                     });







        }).on('delete_node.jstree', function (e, data) {
          $.get('response.php?operation=delete_node', { 'id' : data.node.id })
            .fail(function () {
              data.instance.refresh();
            });
        });
});*/

  $(document).ready(function() {
        var handleDataTableButtons = function() {
          if ($("#datatable-buttons").length) {
            $("#datatable-buttons").DataTable({
              dom: "Bfrtip",
              buttons: [
                {
                  extend: "copy",
                  className: "btn-sm"
                },
                {
                  extend: "csv",
                  className: "btn-sm"
                },
                {
                  extend: "excel",
                  className: "btn-sm"
                },
                {
                  extend: "pdfHtml5",
                  className: "btn-sm"
                },
                {
                  extend: "print",
                  className: "btn-sm"
                },
              ],
              responsive: true
            });
          }
        };

        TableManageButtons = function() {
          "use strict";
          return {
            init: function() {
              handleDataTableButtons();
            }
          };
        }();

        $('#datatable').dataTable();

        $('#datatable-keytable').DataTable({
          keys: true
        });

        $('#datatable-responsive').DataTable();

        $('#datatable-scroller').DataTable({
          ajax: "js/datatables/json/scroller-demo.json",
          deferRender: true,
          scrollY: 380,
          scrollCollapse: true,
          scroller: true
        });

        $('#datatable-fixed-header').DataTable({
          fixedHeader: true
        });

        var $datatable = $('#datatable-checkbox');

        $datatable.dataTable({
          'order': [[ 1, 'asc' ]],
          'columnDefs': [
            { orderable: false, targets: [0] }
          ]
        });
       /* $datatable.on('draw.dt', function() {
          $('input').iCheck({
            checkboxClass: 'icheckbox_flat-green'
          });
        });*/

        TableManageButtons.init();
      });


      ////////////////////////////////////////////////////////////////////////////////////////////

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
$("#SGSKU").on("change", function(){


  
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




      
            $.ajax({
                    url:'/product/createproduct',
                    type:'POST',
                    data:$("#productNamesaveform").serialize(),
                    success:function(result){
                       
                               window.location.href = "/product/producthome";

                    },
                error:function(result){

               

            }
      }
      
      );

        
     




 })













    })