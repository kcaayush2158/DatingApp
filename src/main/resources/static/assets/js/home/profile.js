$(document).ready(function () {
    jQuery.ajax({
        url:'/api/photos/all',
        method: 'get',
        type: 'text',
        success: function (data) {
            var obj = JSON.parse(JSON.stringify(data));
            var responses="";
            for(var i=0; i <=obj.length; i++) {
                var  result = `<div class="item">
                                          <a href="`+data[i].photoUrl+`" data-lightbox="user-photo">
                                               <div   style="background-image: url('`+ data[i].photoUrl +`'); background-position: center;background-size: cover; height: 250px;"></div>
                                           </a>
                                       </div> `;
                responses += result;
                $('#medias-body').html(responses);

            }
            $('#photo-total').text(obj[i].length);
        }, error: function (error) {
            console.log(error);
        }
    });

    $('.owl-carousel').owlCarousel({
        margin:10,
        loop:true,
        stagePadding: 50,
        center:true,
        autoWidth:true,
        items:4
    });
})
