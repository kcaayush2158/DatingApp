setInterval(function () {
    $.ajax({
        url:'/api/direct/u/unreadMessage',
        method:'GET',
        success:function (data) {
            if(data === 0 || data ===null){
                $('#unread-message').text();
            }else{
                $('#unread-message').text(data);
            }
        }
    });
},3000);


$("#notification-button").click(function() {
    jQuery.ajax({
        url: '/api/users/notifications/get',
        method: 'get',
        type: 'json',
        beforeSend:function(){
            $('#container-notification').html('<img src="https://miro.medium.com/max/1600/0*ptDX0HfJCYpo9Pcs.gif"  class="ml-5 mt-5 mb-5" height="150" alt="loading...." />');

        },
        success: function(data) {
            var obj = JSON.parse(JSON.stringify(data));
            var responses = "";


            for (var i = 0; i <= obj.length; i++) {

                $.ajax({
                    url: '/api/notification/read/' + data[i].id,
                    method: 'POST',
                    type: 'JSON',
                    success: function(data) {
                        $('#notification-button').removeClass('btn-danger').addClass('btn-light');

                    }
                });

                var result = ` <div class="container-fluid">
                                    <div class="col-md-12">
                                       <a href="/user/profile/` + data[i].user.username + `"  class="custom-card" style="text-decoration: none; color: #313437;">
                                        <div class="row">
                                            <div class="col-md-0 ">
                                                <img height="60" src="` + data[i].user.profilePhoto + `" width="50" style=" border-radius: 50%;">
                                            </div>
                                            <div class="col-md-9 col-md-offset-2">
                                                <div class="notification-head">
                                                    <h6 >` + data[i].message + `</h6>
                                                    <time class="timeago" datetime="` + data[i].datetime_added + `"></time>
                                                </div>
                                            </div>

                                        </div>
                                        </a>
                                        <hr>
                                    </div>
                                </div>
                    `;

                responses += result;
                if(data === '' || data == null){
                    $('#container-notification').html('<h4 class="mt-5 text-center">Notification is Empty</h4>');
                }else{
                    $('#container-notification').html(responses);
                }


            }
        }
    });



});