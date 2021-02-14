    $(document).ready(function () {

        function clearconsole() {
            console.log(window.console);
            if(window.console || window.console.firebug) {
                console.clear();
            }
        }

        var formPrivateMessage = $('#form-private-message');

        formPrivateMessage.submit(function (e) {
            e.preventDefault();
            $.ajax({
                url: formPrivateMessage.attr('action'),
                method: formPrivateMessage.attr('method'),
                data: formPrivateMessage.serialize(),
                success: function () {
                    $('#private-message-response').html('<div class="container mx-auto"> <div class="alert alert-success" role="alert"><strong>Success </strong> Your message has been send</div></div> ').fadeOut(5000);
                },complete:function () {
                            clearconsole();
                }
            });


        });

        setInterval(function () {
            $.ajax({
                url: '/api/direct/inbox',
                method: 'GET',
                type: 'json',
                beforeSend: function (data) {
                    var obj = JSON.parse((JSON.stringify(data)));
                    var results = "";

                    for (var i = 0; i <= obj.length; i++) {
                        var response = "<img src='https://monitoraoj.nl/wp-content/plugins/maojkaartnl/assets/images/loading.gif' height='100'  alt='loading....'><br>"
                        results += response;
                    }
                    $('#user-listview').html(results);
                },
                success: function (data) {
                    var obj = JSON.parse(JSON.stringify(data));
                    var results = "";
                    var flag=0;
                    for (var i = 0; i <= obj.length; i++) {

                        const encodedId = btoa(data[i].id);



                        var response = `
                            <a  id="myLink" href="/api/message/u/`+data[i].messageId+`" th:href="@{'/api/message/u/'`+data[i].messageId+`}">
                            <div class="messages mt-4">
                                <div class="message-header" style="color: black;">
                                    <div class="container-fluid">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <img src="` + data[i].receiver.profilePhoto + `" height="80" width="80" style="object-fit: cover">
                                                </div>
                                                <div class="col-md-10">
                                                    <div class="container-fluid">
                                                        <div class="col-md-12">
                                                            <div class="row">
                                                                <div class="col-md-10">
                                                                    <h4 id="user-username" class="ml-1">
                                                                        <b>` + data[i].receiver.username + `</b>
                                                                    </h4>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="user-notification">
                                                                       <b>     <span class="badge badge-warning" id="unread-messages-`+flag+`"> 
                                                                            </span></b>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12">
                                                                <div class="row">
                                                                    <div class="col-md-10">
                                                                        <div id="user-message"><b>` + data[i].message + `</b>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-2">
                                                                        <div id="user-time">` + data[i].date + `</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
</a>
<br>
`;
                        $('#myLink').click(function (e) {
                            e.preventDefault();
                            console.log('clicked');

                            $.ajax({
                                url:'/api/message/u/'+data[i].messageId,
                                method:'GET',
                                type:'JSON',
                                success:function (data) {
                                    var obj = JSON.parse(JSON.stringify(data));

                                    console.log(data);
                                },complete:function () {
                                    clearconsole();
                                }

                            });
                        })


                        $.ajax({
                            'url': '/api/direct/u/'+data[i].receiver.id+'/count',
                            'method': 'GET',
                            success: function (data) {
                                $('#unread-messages-'+flag).text(data);
                            }
                        });

                        $('#myLink').click(function () {
                            console.log("clicked");
                            $.ajax({
                                url: '/api/direct/u/' + encodedId + '/message',
                                type: 'JSON',
                                method: 'GET',
                                success: function (data) {
                                    $('#user-username').text(data.username);
                                },complete:function () {
                                    clearconsole();
                                }
                            });
                        });


                        flag++
                        results += response;
                        $('#user-listview').empty().html(results);
                    }

                }
            })
        }, 1000);




});
