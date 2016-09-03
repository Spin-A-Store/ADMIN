  $(document).ready(function(){
        $("#btn-create").click(function(event){
            event.preventDefault();

            $.ajax({
                    url:'/product/createproduct',
                    type:'POST',
                    data:$("#createproductform").serialize(),
                    success:function(result){
                      $("#createproductform").hide();
                            $("#addAnotherProduct").show();
                            $("#addAnotherProduct1").show();

                    },
                error:function(result){
						$("#createproductform").hide();
							$("#addAnotherProduct").show();
							$("#addAnotherProduct1").show();

                    }


            });
        });
    });



	  $(document).ready(function(){
        $("#addAnotherProductbutton").click(function(event){
            event.preventDefault();
        $("#createproductform").show();
							$("#addAnotherProduct").hide();
							$("#addAnotherProduct1").hide();

        });
    });
