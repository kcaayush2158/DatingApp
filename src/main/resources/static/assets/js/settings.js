let passwordForm = $('#password-form');
passwordForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
        url:passwordForm.attr('action'),
        data:passwordForm.serialize(),
        method:'POST',
        success:function(){
            $('#response').html('<div class="alert alert-success" role="alert"><strong>Success <i class="fa fa-check-circle"></i> </strong> Password has been changed </div>').fadeOut(5000);
            $('#oldpassword').val('');
            $('#password').val('');
        },error:function () {
            console.log("error");
            $('#response').html('<div class="alert alert-danger" role="alert"><strong>Error <i class="fa fa-times-circle-o"></i> </strong> Invalid Password </div>').fadeOut(5000);
        }
    });
});


$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("custom-button");
const customText = document.getElementById("custom-text");

$('#custom-button').click(function () {
    realFileBtn.click();
});


realFileBtn.change(function () {
    if(realFileBtn.value){
        customText.innerText=realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    }else {
        customText.innerText= "No file choosen , yet";
    }
})

var readURL = function(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.profile-pic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
};

