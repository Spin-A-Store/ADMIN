$(document).ready(function() {
var storeid=$( "#storeid" ).val();
var url="/product/getProductAndVarientbystoreId?var1="+storeid;

$.get( url, function( serviceresposne ) {

$('.custompagination').pagination({
dataSource: serviceresposne,
pageSize: 10,
    formatResult: function(data) {
        for (var i = 0, len = data.length; i < len; i++) {

            var temp=data[i];
            data[i]='<div class="panel panel-default"><div class="panel-heading"><div class="row"><div class="col-xs-2"><img alt="" src="" class="img-responsive"></div>';
            data[i]=data[i]+'<div class="col-xs-6"><h4 class="panel-title"><a href="#';
            data[i]=data[i]+temp._id;
            data[i]=data[i]+'" data-parent="#accordion" data-toggle="collapse" class="collapsed">';
            data[i]=data[i]+temp.name;
            data[i] = data[i]+'</a></h4></div>';

            data[i] = data[i]+'<div class="col-xs-1"><a   href="/product/modifyproduct?var=';
            data[i]=data[i]+temp._id;
            data[i]=data[i]+ '"> <span class="fa fa-edit " style="color:black;"></span> </a></div> </div></div>';
            data[i] = data[i]+'</div>';
        }
    },
callback: function(data, pagination) {
    $('.paginationcontainer').html(data);

}
})
})
})



$(document).ready(function() {


$( ".addimagepicicon" ).click(function() {

});


})

/*$(document).ready(function() {


$( ".avr" ).click(function() {

var url="/product/getproductbyproductid?var="+$(this).val();
$.get( url, function( serviceresposne ) {
    var htmlresposne;
    alert(serviceresposne.variants.attrs.length)
  for (i = 0; i < serviceresposne.variants.attrs.length; i++) {
    htmlresposne='<div class="form-group">';
    htmlresposne=htmlresposne+'<label class="col-md-4 control-label" for="lastname">';
    htmlresposne=htmlresposne+serviceresposne.variants.attrs[i].name;
    htmlresposne=htmlresposne+'</label><div class="col-md-6"><select class="form-control" id="sel1"> <option>select one</option>';
    for (j = 0; j < serviceresposne.variants.attrs.values.length; j++) {
        htmlresposne=htmlresposne+'<option>';
        htmlresposne=htmlresposne+serviceresposne.variants.attrs.values[j];
        htmlresposne=htmlresposne+'</option>';

    }

htmlresposne=htmlresposne+'</select></div></div>';

}

alert(htmlresposne);

})

});


})*/

$(document).delegate('.avr', 'click', function() {
    var pid=$(this).val();
    var url="/product/getproductbyproductid?var="+$(this).val();
    $( "#reverse" ).replaceWith('<div id="marker">  </div>' );
$.get( url, function( serviceresposne ) {
    var htmlresposne='<div id="reverse"><input type="hidden" name="pid"';
    htmlresposne=htmlresposne+'value="'+pid+'">';

  for (i = 0; i < serviceresposne.variants.attrs.length; i++) {
    htmlresposne=htmlresposne+'<div class="form-group">';
    htmlresposne=htmlresposne+'<label class="col-md-4 control-label" for="lastname">';

    htmlresposne=htmlresposne+serviceresposne.variants.attrs[i].name;
    htmlresposne=htmlresposne+'</label><div class="col-md-6"><select class="form-control" name="'
    htmlresposne=htmlresposne+serviceresposne.variants.attrs[i].name+'"> <option>select one</option>';

    for (j = 0; j < serviceresposne.variants.attrs[i].values.length; j++) {
        htmlresposne=htmlresposne+'<option value="'+serviceresposne.variants.attrs[i].values[j]+'">';
        htmlresposne=htmlresposne+serviceresposne.variants.attrs[i].values[j];
        htmlresposne=htmlresposne+'</option>';

    }

htmlresposne=htmlresposne+'</select></div></div>';

}

$( "#marker" ).replaceWith( htmlresposne+'</div>' );


})
});





