$(document).ready(function () {

    const myformPassword = $('#my-form-group-password');
    myformPassword.hide();
    $("#my-roomType").change(function () {
        const value = this.value;
        if(value === "PRIVATE"){
            myformPassword.show();
            myformPassword.val('');
        }else{
            myformPassword.hide();

        }
    });

})
