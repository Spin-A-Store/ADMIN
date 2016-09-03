   $( document ).ready(function() {


$( "#loginbutton" ).click(function(e) {
   e.preventDefault();



   if($("#loginform input[name=username]").val().trim().length==0 || $("#loginform input[name=password]").val().trim().length==0){
    $("#alertmessage").show();
    $("#alertmessage").text("Fields can not be empty");
   }else{
           clearErrorMessage();
           $(".loading").show();
                 $.ajax({
                    url:'/loginadmin',
                    type:'POST',
                    data:$("#loginform").serialize(),
                    success:function(result){
                     $(".loading").hide();
                       if(result.excpcode=="S000" || result.excpcode=="S001"){
                         $("#alertmessage").show();
                         $("#alertmessage").text(result.excpmesg);
                       }else{
                        window.location.href = "/product/producthome";
                           }

                    },
                error:function(result){
                    $(".loading").hide();
                      $("#alertmessage").show();
                         $("#alertmessage").text("Error occured");
                    }


            });


   }



});


$( "#registerbutton" ).click(function(e) {
   e.preventDefault();



   if($("#registerform input[name=storename]").val().trim().length==0 || $("#registerform input[name=password]").val().trim().length==0||$("#registerform input[name=username]").val().trim().length==0){
    $("#alertmessage").show();
    $("#alertmessage").text("Fields can not be empty");
   }else{
           clearErrorMessage();
            $(".loading").show();

             $.ajax({
                    url:'/registerstore',
                    type:'POST',
                    data:$("#registerform").serialize(),
                    success:function(result){
                     $(".loading").hide();
                       if(result.excpcode=="S000" || result.excpcode=="S001"){
                         $("#alertmessage").show();
                         $("#alertmessage").text(result.excpmesg);
                       }else{
                        window.location.href = "/product/producthome";
                           }

                    },
                error:function(result){
                    $(".loading").hide();
                      $("#alertmessage").show();
                         $("#alertmessage").text("Error occured");
                    }


            });


   }



});










});




  var clearErrorMessage=function(){
 $("#alertmessage").hide();
  $("#alertmessage").text('');

  }










