$(document).ready(function() {
   // var clearConsole = function clearconsole() {
   //      console.log(window.console);
   //      if(window.console || window.console.firebug) {
   //          console.clear();
   //      }
   //  }
    var createRoom = $('#form-room');

    createRoom.submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: createRoom.attr('action'),
            data: createRoom.serialize(),
            method: 'POST',
            success: function(data) {
                $('#alert').html(`   <div class="alert alert-success" role="alert">  Room is created Successfully </div> `);
                pollMyChatRooms()
                pollAllChatRooms()
                countMyRooms()

            },complete:function(){
                clearConsole()
            },
            error: function() {
                $('#alert').html(`<div class="alert alert-danger" role="alert">Room is already existed</div> `);
            }
        });
    });


    //counts the total no of rooms which is created by the users;
    var countMyRooms = function() {
        jQuery.ajax({
            url: '/api/chatroom/my/count',
            dataType: 'text',
            method: 'get',
            success: function(response) {
                $('#my-chatroom').text(response);
            },complete:function () {
                clearConsole();
            }
        });


    };

    var isActive = true;

    let pollAllChatRooms = function() {
        if (isActive) {
            jQuery.ajax({
                url: '/api/chatrooms/all',
                dataType: 'json',
                type: 'get',
                beforeSend: function(data) {
                    if(data === null || data === ''){
                        $('.results').html("<h1>No Room is created . <strong>Click <i class='fa fa-plus-circle'></i> to create room</strong></h1>");
                    }

                    $('.results').html('<img src="https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif" height="150" style="margin-left: 40%; margin-top:20%;" >');
                },
                success: function(data) {
                    $('.ajax-loader').css("visibility", "hidden");
                    var obj = JSON.parse(JSON.stringify(data));

                    var responses = "";

                    for (var i = 0; i <= obj.length; i++) {
                        var result = `
                            <div class="col-md-4">
                               <div class="card mb-2 mr-3  ml-2 mt-5 " id="custom-card-design" >
                                    <div class="card-body">
                                         <h5 class="card-title text-center  mb-2">` + data[i].chatRoomName + `</h5>
                                        <p class="mt-4 mb-5" id="chatDescription">` + data[i].chatRoomDescription + `</p>
                            

                                           `
                        var res;
                        if (obj[i].type === "PUBLIC") {
                            res = `
                                 <form action="/chatroom/public/` + data[i].chatRoomId + `" method="GET" >
                                      <button class='btn  btn-block mt-4 mb-2 btn-join-room-public' type='submit' >
                                       <b> <i class="fa fa-plus-circle"></i> Join Room</b>
                                      </button>
                                  </form>
                            </div>
                          </div>
                            </div>
     `
                        } else {
                            res = `
<button type="button mt-4" class="btn btn-block  btn-join-room-private mt-3 mb-2"  data-toggle="modal" data-target="#private-room" >
<b><i class="fa fa-plus-circle"></i> Join Room</b>
</button>
<!-- Modal -->
<div class="modal fade" id="private-room" tabindex="-1" role="dialog" aria-labelledby="private-roomTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title" id="private-roomTitle">Private Room</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body">
            <form action="/chatroom/private/` + data[i].chatRoomId + `" method="POST">
               <div class="form-group" id="form-group-password">
                  <label for="password-chatroom">Password :</label>
                  <input type="password" class="form-control" id="password-chatroom" name="password-chatroom"/>
                  <button type="submit" class="btn btn-block btn-secondary mt-5" ><i class="fa fa-save"></i> Save Changes</button>
               </div>
            </form>
         </div>
      </div>
   </div>
</div>
</div>
</div>
</div>
                                      `
                        }
                        ``;


                        responses += result.concat(res);
                        $('.results').html(responses);
                        $('#broadcast').text(data.length);
                    }
                },
                complete: function () {
                pollAllChatRooms();
                clearConsole();
                },
                error: function() {
                    pollAllChatRooms();
                }
            });


        }
    };



    let pollMyChatRooms = function() {
        if (isActive) {
            jQuery.ajax({
                url: '/api/my/chatroom',
                dataType: 'json',
                type: 'GET',
                beforeSend: function(data) {
                    const myChatRooms = $('#myChatRoom');
                    if(data === null || data === ''){
                        myChatRooms.html("<h1>No Room is created . <strong>Click <i class='fa fa-plus-circle'></i> to create room</strong></h1>");
                    }
                    myChatRooms.html('<img src="https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif" height="150" style="margin-left: 40%; margin-top:20%;" >');

                },
                success: function(data) {
                    if(data === null || data === ''){
                        $('.results').html("<h1>No Room is created . <strong>Click <i class='fa fa-plus-circle'></i> to create room</strong></h1>");
                    }

                    $('.ajax-loader').css("visibility", "hidden");
                    var obj = JSON.parse(JSON.stringify(data));

                    var responses = "";

                    for (var i = 0; i <= obj.length; i++) {
                        const chatRoomResponse = $('#my-chatroom-response');

                        var result = `
                            <div class="col-md-4">
                               <div class="card mb-2 mr-3  ml-2 mt-5 " id="custom-card-design" >
                                    <div class="card-body">
                                         <h5 class="card-title text-center  mb-2">` + data[i].chatRoomName + `</h5>
                                        <p class="mt-4 mb-5" id="chatDescription">` + data[i].chatRoomDescription + `</p>
                            

                                           `
                        var res;
                        if (obj[i].type === "PUBLIC") {
                            res = `
                                 <form action="/chatroom/public/` + data[i].chatRoomId + `" method="GET" >
                                      <button class='btn  btn-block mt-4 btn-join-room-public mb-2' type='submit' >
                                       <b> <i class="fa fa-plus-circle"></i> Join Room</b>
                                      </button>
                                  </form>
                        <form action="/api/chatroom/` + data[i].chatRoomId + `/delete" method="POST" id="my-public-chat-room-form-delete">
                          <button class="btn btn-danger btn-block" type="submit"  ><i class="fa fa-trash"></i> Delete Room </button>
                        
                        </form>
                            
                    
                                  
<!-- Button trigger modal -->
<button type="button" class="btn btn-light btn-block" data-toggle="modal" data-target="#modelSettings` + i + `">
Settings <i class="fa fa-gear"></i>
</button>
<!-- Modal -->
<div class="modal fade" id="modelSettings` + i + `" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
   <div class="modal-dialog" role="document">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title">Settings</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>
         
         <div class="modal-body">
            <form action="/api/chatroom/` + data[i].chatRoomId + `/update" id="form-room-`+ i + `" method="POST">
               <h6 th:text="'Created Date :'` + data[i].createdTime + `"> </h6>
               <div class="form-group">
                  <label for="my-public-chat-room-name">Room Name : </label>
                  <input type="text" class="form-control " required name="chatRoomName" id="my-public-chat-room-name-` + i + `" value="` + data[i].chatRoomName + `" >
               </div>
               <div class="form-group">
                  <label for="my-public-chat-room-description">Room Description :</label>
                  <textarea class="form-control" name="roomDescription" required id="my-public-chat-room-description` + i + `"  >` + data[i].chatRoomDescription + `</textarea>
               </div>
               <div class="form-group">
                  <label for="my-public-room-type">Room Type :</label>
                  <select class="form-control" required name="roomType" id="my-public-chat-room-type-` + i + `">
                     <div th:if="` + data[i].type + ` == 'PRIVATE'}">
                        <option value="` + data[i].type + `" selected >` + data[i].type + `</option>
                        <option value="PRIVATE"  >PRIVATE</option>
                     </div>
                  </select>
               </div>
               <div class="form-group" id="my-public-form-group-password-`+i+ `">
                  <label for="password">Password :</label>
                  <input type="password" required class="form-control" name="password" autocomplete id="my-public-chat-room-password-`+i+`">
               </div>
              <button class="btn btn-primary btn-block " type="submit"><i class="fa fa-save"></i> Save</button>
              </form>
        
         </div>
         <div class="modal-footer">
             
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close
            </button>
          
  
         </div>
          
      </div>
   </div>
</div>

                            </div>
                          </div>
                            </div>
     `



                        } else {
                            res = `
<button type="button mt-4" class="btn btn-block btn-join-room-private  mt-3 mb-2"   data-toggle="modal" data-target="#private-room" >
<b><i class="fa fa-plus-circle"></i> Join Room</b>
</button>
        </form>
             <form action="/api/chatroom/` + data[i].chatRoomId + `/delete" method="POST" id="my-private-chat-room-form-delete">
               <button class="btn btn-danger btn-block" type="submit"><i class="fa fa-trash"></i> Delete Room </button>
            </form>
<!-- Modal -->
<div class="modal fade" id="private-room" tabindex="-1" role="dialog" aria-labelledby="private-roomTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title" id="private-roomTitle">Private Room</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body">
            <form action="/chatroom/private/` + data[i].chatRoomId + `" method="POST">
               <div class="form-group">
                  <label for="password-chatroom">Password :</label>
                  <input type="password"  required class="form-control" id="password-chatroom-` + i + `" autocomplete name="password-chatroom"/>
                  <button type="submit" class="btn btn-block btn-secondary mt-5" ><i class="fa fa-save"></i>  Save changes</button>
               </div>
            </form>
         </div>
      </div>
   </div>
</div>

<!-- Button trigger modal -->
<button type="button" class="btn btn-light btn-block" data-toggle="modal" data-target="#modelSettings` + i + `">
Settings <i class="fa fa-gear"></i>
</button>
<!-- Modal -->
<div class="modal fade" id="modelSettings` + i + `" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
   <div class="modal-dialog" role="document">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title">Settings</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>
         
         <div class="modal-body">
            <form action="/api/chatroom/` + data[i].chatRoomId + `/update"  id="my-private-form-room-` + i + `" method="POST">
               <h6 th:text="'Created Date :'` + data[i].createdTime + `"> </h6>
               <div class="form-group">
                  <label for="my-private-chat-room-name">Room Name : </label>
                  <input type="text" class="form-control" required name="chatRoomName" id="my-private-chat-room-name-` + i + `" value="` + data[i].chatRoomName + `" >
               </div>
               <div class="form-group">
                  <label for="my-private-chat-room-description">Room Description :</label>
                  <textarea class="form-control" required name="roomDescription" id="my-private-chat-room-description-` + i + `"  >` + data[i].chatRoomDescription + `</textarea>
               </div>
               <div class="form-group">
                  <label for="my-private-chat-room-type">Room Type :</label>
                  <select class="form-control" required name="roomType" id="my-private-chat-room-type-` + i + `">
                     <div th:if="` + data[i].type + ` == 'PRIVATE'}">
                        <option value="` + data[i].type + `"   >` + data[i].type + `</option>
                        <option value="PUBLIC"  selected >PUBLIC</option>
                     </div>
                 
                  </select>
               </div>
               <div class="form-group" id="my-private-form-group-password-` + i + `">
                  <label for="my-private-chat-room-password-` + i + `">Password :</label>
                  <input type="password" class="form-control" required autocomplete name="password" id="my-private-chat-room-password-` + i + `" >
               </div>
             <button class="btn btn-primary btn-block" type="submit"><i class="fa fa-save"></i> Save</button>
             
         </div>
          
         <div class="modal-footer">

            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close
            </button>
           
           
         </div>
         
        
      </div>
   </div>
</div>

                            </div>
                          </div>
                            </div>
                                      `
                        }
                        ``;

                        const deletePublicChatRoom = $('#my-public-chat-room-form-delete');
                        deletePublicChatRoom.submit(function (e) {
                            e.preventDefault();
                            $.ajax({
                                url:deletePublicChatRoom.attr("url"),
                                method:'POST',
                                type:'json',
                                data: deletePublicChatRoom.serialize(),
                                success:function(){
                                    pollAllChatRooms()
                                    pollMyChatRooms()
                                },
                                error:function () {
                                    alert("deleted");
                                    pollAllChatRooms()
                                    pollMyChatRooms()
                                }
                            });
                        });

                        responses += result.concat(res);
                        $('#myChatRoom').html(responses);
                        $('#broadcast').text(data.length);
                        $('#form-room-'+i).parsley();
                        $('#my-private-form-room-'+i).parsley();


                        const privatePasswordChatRoomForm = $('#my-private-form-group-password-' + i);
                        privatePasswordChatRoomForm.hide();

                        $("#my-private-chat-room-type-" + i).change(function() {
                            const value = this.value;
                            if (value === "PRIVATE") {
                                privatePasswordChatRoomForm.show();
                                privatePasswordChatRoomForm.val('');
                            } else {
                                privatePasswordChatRoomForm.hide();

                            }
                        });

                        const publicPasswordChatRoomForm = $('#my-public-form-group-password-'+ i);
                        publicPasswordChatRoomForm.hide();

                        $("#my-public-chat-room-type-" + i).change(function() {
                            console.log("changed");
                            const value = this.value;
                            if (value === "PRIVATE") {
                                publicPasswordChatRoomForm.show();
                                publicPasswordChatRoomForm.val('');
                            } else {
                                publicPasswordChatRoomForm.hide();

                            }
                        });



                    }
                },
                complete: function () {
                    pollMyChatRooms()
                    clearConsole()
                },
                error: function() {
                    pollMyChatRooms();
                }
            });

        }
    };





    const myFormPassword = $('#form-group-password');
    myFormPassword.hide();
    $("#roomType").change(function () {
        const value = this.value;
        if(value === "PRIVATE"){
            myFormPassword.show();
            myFormPassword.val('');
        }else{
            myFormPassword.hide();

        }
    });




    // used for the searching the chatroom
    $('#search_box').keyup(function() {
        let search_term = $('#search_box').val();

        $.ajax({
            url: '/api/chatroom/search/' + search_term,
            dataType: 'JSON',
            type: 'GET',
            beforeSend: function() {
                $('.results').html('<img src="https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif" height="150" style="margin-left: 40%; margin-top:20%;" >');

            },
            success: function(response) {
                if (search_term.length >= 0 && responses == null) {
                    $('.results').html("<h4 class='text-center mt-5 offset-md-5'>Rooms Not Available</h4>");
                }
                var chatroom = JSON.parse(JSON.stringify(response));
                if (search_term.length === null || search_term.length === 0) {
                    pollAllChatRooms()
                } else {
                    var responses;
                    for (let i = 0; i < chatroom.length; i++) {
                        const results = `
                              <div class="col-md-4">  
                                    <div class="card mb-2 mr-3  ml-2 mt-5 "  id="custom-card-design" >
                                      <div class="card-body" style="background-color: white;">
                                        <h5 class="card-title  text-center  mb-2" id="card-title">` + response[i].chatRoomName + `</h5>
                                        <p class="mt-4 mb-5" id="chatDescription">` + response[i].chatRoomDescription + `</p>
                                                                                 
`;

                        var res;

                        if (response[i].type === "PUBLIC") {
                            res = `
                                 <form action="/chatroom/public/` + response[i].chatRoomId + `" method="GET" >
                                      <button class='btn  btn-block mt-4 mb-2 btn-join-room-public' type='submit' >
                                       <b> <i class="fa fa-plus-circle"></i> Join Room</b>
                                      </button>
                                  </form>
                            </div>
                          </div>
                            </div>
     `
                        } else {
                            res = `
                            <form action="/chatroom/private/` + response[i].chatRoomId + `" method="GET" >
                              <button type="button mt-4" class="btn btn-block  btn-join-room-private mt-3 mb-2"  >
                                 <b><i class="fa fa-plus-circle"></i> Join Room</b>
                                 </button>
               </form>
                 </div>
                          </div>
                            </div>

                                      `
                        }
                        ``;


                        responses += results.concat(res);

                        $('.results').html(responses);
                    }
                }
            },
            complete:function(){
                clearConsole()
            },
            error: function() {
                pollAllChatRooms();
            }


        });
    });

    $('#pills-my-room-tab').click(function() {

        $('#form-search').hide();
        $('#navbar-brand').text("My Rooms");
    });
    $('#pills-all-rooms-tab').click(function() {

        $('#form-search').show();
        $('#navbar-brand').text("All Rooms");
    });



    var shoutOutForm = $('#form-shout-out');
    shoutOutForm.submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: shoutOutForm.attr("action"),
            data: shoutOutForm.serialize(),
            method: shoutOutForm.attr("method"),
            success: function() {
                pollShoutOut();
            },
            complete:function(){
                clearConsole()
            },
            error: function() {
                pollShoutOut();
            }
        });

    });


    var pollShoutOut = function() {
        if (isActive) {
            jQuery.ajax({
                url: '/api/chatrooms/shoutout/all',
                type: 'GET',
                data_type: 'JSON',
                success: function(data) {
                    var obj = JSON.parse(JSON.stringify(data));
                    var results = '';
                    for (var i = 0; i <= obj.length; i++) {
                        template = '<li> <div class="message"> <div class="row"> <img style="object-fit: cover; height: 50px ;width: 50px; " src="' + data[i].user.profilePhoto + ' "> <b ><h6 style="font-size: 16px;color: #004a95;" class="ml-2">' + data[i].user.username + ' </h6><p class="ml-2" style="width: 20px;">  ' + data[i].message + ' </p></b></div></div></li>'
                        results += template;
                        $('#shoutout-message').html(results);

                    }

                    if (data === null || data === '') {
                        $('#shoutout-message').html("<h2 class='text-center'>No Rooms Available</h2>");
                    }
                },complete:function () {
                    clearConsole()
                }
            })
        }
    }



    countMyRooms();
    pollMyChatRooms();
    pollAllChatRooms();
    pollShoutOut();


});