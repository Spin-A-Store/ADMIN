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

$(document).ready(function(){ 
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
      'plugins' : ['state','contextmenu','wholerow']
    }).on('create_node.jstree', function (e, data) {
            
             
         
        }).on('rename_node.jstree', function (e, data) {

          console.debug(data);
         
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
});