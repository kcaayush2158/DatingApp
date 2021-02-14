$(document).ready(function() {

    $.ajax({
        url: '/api/v1/likes/all',
        method: 'GET',
        type: 'json',
        success: function(data) {
            const obj = JSON.parse(JSON.stringify(data));

            let responses;
            for (var i = 0; i < obj.length; i++) {
                var results = `
             <div class="row" style="float: left;">   
                <a href= "/user/profile/` + data[i].likedBy.username + `" id="card-href " style="list-style-type:none;text-decoration:none;" >  
                  <div class="card bg-light  mb-3 mr-5  ml-5 mt-2 "  id="custom-card-design"> 
                     <img class="card-img-top image-thumbnail"   id="card-img" src="` + data[i].likedBy.profilePhoto + `"  alt="Card image cap"> 
                     <div class="card-body" >
                        <h5 class="card-title "  >` + data[i].likedBy.firstName + ' ' + data[i].likedBy.lastName + ' ,' + data[i].likedBy.aboutMe.age + ` </h5>
                        <p class="card-text" id="card-bio" >` + data[i].likedBy.aboutMe.bio + `</p>
                    </div>
                    </div>
                </a>
             </div>            
            `;
                responses += results;
                $('#container-users-likes').html(responses);

            }

        }
    });
    $.ajax({
        url: '/api/v1/likes/u/all',
        method: 'GET',
        type: 'json',
        success: function(data) {
            var responses;
            var obj = JSON.parse(JSON.stringify(data));
            for (let i = 0; i <  obj.length; i++) {
                var results = `
             <div class="row" style="float: left;">   
                <a href= "/user/profile/` + data[i].likedTo.username + `" id="card-href " style="list-style-type:none;text-decoration:none;" >  
                  <div class="card bg-light  mb-3 mr-5  ml-5 mt-2 "  id="custom-card-design"> 
                     <img class="card-img-top image-thumbnail" id="card-img" src="` + data[i].likedTo.profilePhoto + `"  alt="Card image cap"> 
                     <div class="card-body" >
                        <h5 class="card-title">` + data[i].likedTo.firstName + ' ' + data[i].likedTo.lastName + ' ,' + data[i].likedTo.aboutMe.age + ` </h5>
                        <p class="card-text" id="card-bio" >` + data[i].likedTo.aboutMe.bio + `</p>
                    </div>
                    </div>
                </a>
             </div>            
            `;
                responses += results;
                $('#you-liked-container').html(responses);
            }

        }
    });

    $.ajax({
        url: '/api/v1/likes/users/count',
        method: 'GET',
        type: 'text',
        success: function(data) {
            $('#you-liked').text(data);


        },
        complete: function() {
            $.ajax({
                url: '/api/v1/likes/you-liked/count',
                method: 'GET',
                type: 'text',
                success: function(data) {
                    $('#likes-count').text(data);
                },
                complete: function() {}
            });
        }

    });



});