$(document).ready(function () {
    $.ajax({
        url: '/api/v1/visits',
        method: 'GET',
        type: 'json',
        success: function (data) {
            var obj = JSON.parse(JSON.stringify(data));
            var response = '';
            for (var i = 0; i < obj.length; i++) {
                var cards = `

            <div class="row" style="float: left;">   
                   <a href= "/user/profile/` + data[i].receivedUser.username + `" id="card-href " style="list-style-type:none;text-decoration:none;" >  
            <div class="card bg-light  mb-3 mr-5  ml-5 mt-2 "  id="custom-card-design"> 
           <img class="card-img-top image-thumbnail"   id="card-img" src="` + data[i].receivedUser.profilePhoto + `"  alt="Card image cap"> 
           <div class="card-body" >
           <h5 class="card-title "  >` + data[i].receivedUser.firstName + ' ' + data[i].receivedUser.lastName + ' ,' + data[i].receivedUser.aboutMe.age + ` </h5>
           <p class="card-text" id="card-bio" >` + data[i].receivedUser.aboutMe.bio + `</p>
            </div>
              </div>
              
            </a>
            </div>
       
            `;

                response += cards;
                $('#container-users-visits').html(response);
            }

        }
    })


    $.ajax({
        url: '/api/v1/visits/users/count',
        method: 'GET',
        type: 'text',
        success: function (data) {
            console.log(data);
            $('#visits').text(data);

        }
    });

});
