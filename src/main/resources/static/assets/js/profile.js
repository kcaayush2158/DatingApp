$(document).ready(function() {
    $('.owl-carousel').owlCarousel();
    $('#file-upload').hide();

    $('#container-photos').click(function(){
        $('#file').trigger('click');
        $('#file-upload').show();

    });

var formPhoto = $('#form-photo-delete');
formPhoto.submit(function (e) {
    console.log(formPhoto.attr('action'));
    e.preventDefault();
    $.ajax({
        url:formPhoto.attr('action'),
        method:'POST',
        formMethod:formPhoto.attr('method'),
        success:function () {
            $('#message-photo').html('<div class="alert alert-success" role="alert"><strong>Success <i class="fa fa-check-circle"></i></strong>  Photo has been deleted</div>"').fadeOut(5000);
        }
    });
});

//used

    var formUserPhoto = $('#form-user-photo');
    formUserPhoto.submit(function (event) {
        event.preventDefault();
        $.ajax({
            url:formUserPhoto.attr('action'),
            method:'POST',
            data:formUserPhoto.serialize(),
            success:function () {
                $('#message-photo').html("<div class=\"alert alert-success\" role=\"alert\"><strong>Success</strong>  <i class=\"fa fa-check-circle\"></i>Photo has been updated</div>").fadeOut(5000);
            }
        });
    });

    var _URL = window.URL || window.webkitURL;

    $('#uploadPreview').hide();
    $('#button-photo-upload').hide();
    $('#uploadPreview').hide();
   var photoDismiss =   $('#photo-dismiss');
    photoDismiss.hide();
    $("#actual-btn").change(function(e) {
        $('#uploadPreview').show();
        var image, file;
        if ((file = this.files[0])) {
            image = new Image();
            image.onload = function() {
                src = this.src;
                $('#uploadPreview').html(`<div id="upload-picture " style="background: url('`+ src+`');  height: 300px; width: 300px;object-fit: cover;background-repeat: no-repeat;background-size: cover;" >    </div> `);
                photoDismiss.show();
                $('#uploadPreview').show();
                $('#actual-btn').hide();
                e.preventDefault();
                $('#button-photo-upload').show();
            }
        }
        image.src = _URL.createObjectURL(file);
    });

    photoDismiss.click(function () {
        $('#photoDismiss').show();
        $('#uploadPreview').hide();
        $('#button-photo-upload').hide();
        photoDismiss.hide();
    });
});


$('#button-photo-upload').click(function () {
        $('#btn-photo-submit').click();
        const photoUpload = $('photo-form');
        $.ajax({
            url : '',
            method:'POST',
            success:function () {
                $('#').html("<div class='alert alert-success' role='alert'><strong>Success <i class='fa fa-check-circle'></i> </strong> </div>")
            }
        })
});

const actualBtn = document.getElementById('actual-btn');
const fileChosen = document.getElementById('file-chosen');



actualBtn.change( function(){
    fileChosen.textContent = this.files[0].name;
})


