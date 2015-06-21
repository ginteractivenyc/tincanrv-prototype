tincanrvApp.controller("homeCtrl", function($scope, tincanFactory, $location, $routeParams) {

if (memcachejs.get("access_token")) {
    // we got something, and it hasn't expired
    $('#splashNav').hide()
    $('#mainNav').show()

    tincanFactory.getUser( memcachejs.get("tincanuser"), memcachejs.get("access_token")).success(function(success) {
        $('#loggedin').html(success.user[0].username);
        $routeParams.nameHolder = success.user[0].username;


}).error(function(error){

});




  }
else {
    $('#splashNav').show()
    $('#mainNav').hide()
    // nothing is retrieved, the cache has expired or nothing was set there
}






  tincanFactory.homeTiles().success(function(data) {
    //spinner.stop();
    $scope.homeTiles = data.users;
    //console.log($scope.homeTiles);
    function chunk(arr, size) {
      var newArr = [];
      for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
      }
      return newArr;
    }
    $scope.chunkedData = chunk($scope.homeTiles, 3);
  }).error(function(error) {

  });
  $scope.openItem = function($event) {
    nameHolder.length = 0;
    var pushThis = angular.element($event.currentTarget).attr('data-id');
    $location.path("itemview/" + pushThis);
    setTimeout(function() {
      nameHolder.push(pushThis);
      console.log(nameHolder)
    }, 200)

  }

  $scope.howItWorks = function() {
      $location.path("howitworks/");

    }
    //open signup form
  $scope.signUp = function() {
      $('.formHolder, #signUpForm').fadeIn();
    }
    //open signup form


  $scope.loginSubmit = function() {
    //alert()
    var username = $('#logInForm input#username').val();
    var password = $('#logInForm input#password').val();
    var newContent = {
      username: username,
      password: password
    };
    var newContentString = $.param(newContent);


    tincanFactory.loginUser(newContentString).success(function(success) {
      $('#loginModal').modal('hide')
<<<<<<< HEAD
        //$('#welcomeUser').fadeIn();
      console.log(success.user[0].username)
      //return false;
=======

>>>>>>> 6bc4ee33a6788c47b0504a7836490fc448eb139a
      $scope.loggedUser = success.user[0].username;
      loggedUserId.push(success.user[0].id)

      // set localstorage  user id
      memcachejs.set("loggedUserId",success.user[0].id, 4000);

      var loggedUser = {
        username: username,
        password: password,
        grant_type: "password",
        client_id: '1',
        client_secret: 'tinnycan2%^3'
      }
      var loginObject = $.param(loggedUser);

      tincanFactory.getToken(loginObject, loggedUserId).success(function(success) {
        console.log(success)
        access_token.push(success.user[0].access_token);
        loggedInUser.push($scope.loggedUser);
<<<<<<< HEAD
        memcachejs.set("access_token", access_token);
        memcachejs.set("tincanuser", $scope.loggedUser);
       
=======

        // set localstorage  access token       
        memcachejs.set("access_token", access_token, 4000);

>>>>>>> 6bc4ee33a6788c47b0504a7836490fc448eb139a
        $location.path('/' + loggedInUser + '/edit');
      }).error(function(error) {
        console.log(error)
      });


    }).error(function(error) {
      console.log(error)
    });

  }

  $('body').removeClass('backgroundChange');

})
.controller("signupCtrl", function($location, $scope, tincanFactory, $route, $routeParams){

  $scope.loggedUser = [];
  $scope.userId = [];
 document.getElementsByClassName('tcMainNav')[0].style.visibility = "visible";
document.getElementById('splashNav').style.visibility = "hidden";
//document.getElementById('editBug').style.visibility = "hidden";


//user signup
  $('body').removeClass('backgroundChange');
  //$('.tcMainNav').show();
  $scope.insertUser = function() {
    var newContent = $('#signUpForm').serialize();
    tincanFactory.userSignUp(newContent).success(function(success) {
       console.log(success.user[0].username)
       //return false;
      $scope.userid = success.user[0].id;
      $scope.loggedUser = success.user[0].username;

    var newAddress = $('#addressForm').serialize();
    var userid =  $scope.userid;
    var password = $('#password').val();

   /* tincanFactory.createAddress(newAddress, userid).success(function(success){
      console.log(success)
    }).error(function(error) {
      console.log(error)
    });*/
     // nameHolder.push($scope.loggedUser)
      //$location.path('/' +  $scope.loggedUser)

      var loggedUser = {
        username: $scope.loggedUser,
        password: password,
        grant_type: "password",
        client_id: '1',
        client_secret: 'tinnycan2%^3'
      }
      var loginObject = $.param(loggedUser);

      tincanFactory.getToken(loginObject, $scope.userid).success(function(success) {
        console.log(success)
        access_token.push(success.user[0].access_token);
       // loggedInUser.push(success.user[0].username);
        memcachejs.set("access_token", access_token);
        memcachejs.set("tincanuser", $scope.loggedUser);

        $location.path('/' + success.user[0].username + '/edit');
      }).error(function(error){
        console.log(error)
      });
    }).error(function(error){
        console.log(error)
    });     
     

  }

}).controller("editCtrl", function($location, $scope, tincanFactory, $route, $routeParams) { 
    $('footer').hide();   //match token
    $scope.showthis = [];
    document.getElementsByClassName('tcMainNav')[0].style.visibility = "visible";

    tincanFactory.getUser(memcachejs.get("tincanuser"), memcachejs.get("access_token")).success(function(success) {
//return false;
        $scope.userName = success.user[0].username;
         $scope.firstName = success.user[0].firstname;
         $scope.middleName = success.user[0].middlename;
         $scope.lastName = success.user[0].lastname;
          $scope.gender = success.user[0].gender;
          $scope.suffix = success.user[0].suffix;
          $scope.email = success.user[0].email;

          $scope.listings = success.user[0].rv;
          console.log($scope.listings)
      if (memcachejs.get("access_token") === success.user[0].access_token) {
        $('#splashNav').hide()
    $('#mainNav').show()
      if (success.user[0].address === null) {
        $scope.showcreateaddress = 'show';
        $scope.showthisaddress = 'hide';

        $scope.addressCreate = function() {
          var newAddress = $('#createaddressForm').serialize()+'&'+$.param({ 'access_token': memcachejs.get("access_token") });

          var id = success.user[0].id;
          tincanFactory.createAddress(newAddress, id).success(function(success) {
            console.log(success)
          $scope.showcreateaddress = 'hide';
         $scope.showthisaddress = 'show';          
          $scope.street = success.address[0].street;
           $scope.city = success.address[0].city;
           $scope.state = success.address[0].state;
          $scope.zipcode = success.address[0].zipcode;
          }).error(function(error) {
            console.log(error)
          });
        }


      }else{
        $scope.showcreateaddress = 'hide';
        $scope.showthisaddress = 'show';

          $scope.street = success.user[0].address.street;
           $scope.city = success.user[0].address.city;
           $scope.state = success.user[0].address.state;
          $scope.zipcode = success.user[0].address.zipcode;

}

        $scope.showthis = 'show';
        $('#loggedin').html(success.user[0].username);
        $('body').removeClass('backgroundChange');

        $scope.userId = [];

        $scope.editAddress = function() {
          var newAddress = $('#addressForm').serialize()+'&'+$.param({ 'access_token': memcachejs.get("access_token") });

          var id = success.user[0].id;
          tincanFactory.editAddress(newAddress, id).success(function(success) {
            console.log(success)
            $('#updateAddress').modal('hide');
          $scope.street = success.user.address.street;
           $scope.city = success.user.address.city;
           $scope.state = success.user.address.state;
          $scope.zipcode = success.user.address.zipcode;
          }).error(function(error) {
            console.log(error)
          });
        }

      } else {
        $location.path('/')
      }


    }).error(function(error) {
      console.log(error)
    });

}).controller("userCtrl", function($location, $scope, tincanFactory, $route, $routeParams){
 document.getElementsByClassName('tcMainNav')[0].style.visibility = "visible";
 document.getElementById('splashNav').style.visibility = "hidden";
  $('body').removeClass('backgroundChange');
$scope.userName = $routeParams.nameHolder;
//console.log($scope.userName)
  setTimeout(function() {
    tincanFactory.getUser($scope.userName, memcachejs.get("access_token")).success(function(data) {
      $scope.userInfo = data.user[0];
      $scope.rvList = data.rv;
      console.log($scope.userInfo.address)
      //return false;
      setTimeout(function() {
        var userId = $('.tcpill-lg').attr("data-id");

        var address = $scope.userInfo.address.city + ',' + $scope.userInfo.address.state;
        console.log(address)
        var map = new google.maps.Map(document.getElementById('map-canvas'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoom: 14
        });

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            'address': address
          },
          function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              new google.maps.Marker({
                position: results[0].geometry.location,
                map: map
              });
              map.setCenter(results[0].geometry.location);
            }
          });
      }, 500);
    }).error(function(error){
      console.log(error)
    });
  }, 100);

<<<<<<< HEAD
=======
}).controller("editCtrl", function($location, $scope, tincanFactory, $route, $routeParams) { 

    $('footer').hide();   //match token
    $scope.showthis = [];
    document.getElementsByClassName('tcMainNav')[0].style.visibility = "visible";

//get user if bypass login
  if (memcachejs.get("access_token")) {
    // we got something, and it hasn't expired
    tincanFactory.getUser($routeParams.nameHolder, memcachejs.get("access_token")).success(function(success) {
      console.log(success)
      if (memcachejs.get("access_token") === success.user[0].access_token) {
        $scope.showthis = 'show';
        $('#loggedin').html(success.user[0].username);
        $('body').removeClass('backgroundChange');

        $scope.userId = [];

        $scope.editAddress = function() {
          var newAddress = $('#addressForm').serialize();
          tincanFactory.editAddress(newAddress, memcachejs.get("loggedUserId"), memcachejs.get("access_token")).success(function(success) {
            console.log(success)
          }).error(function(error) {
            console.log(error)
          });
        }

      } else {
        $location.path('/')
      }



    }).error(function(error) {
      console.log(error)
    });
  } else{
    //  get user if login
    tincanFactory.getUser($routeParams.nameHolder, access_token).success(function(success) {
      console.log(success)
      if (memcachejs.get("access_token") === success.user[0].access_token) {
        $scope.showthis = 'show';
        $('#loggedin').html(success.user[0].username);
        $('body').removeClass('backgroundChange');

        $scope.userId = [];

        $scope.editAddress = function() {
          var newAddress = $('#addressForm').serialize();
          tincanFactory.editAddress(newAddress, loggedUserId).success(function(success) {
            console.log(success)
          }).error(function(error) {
            console.log(error)
          });
        }

      } else {
        $location.path('/')
      }



    }).error(function(error) {
      console.log(error)
    });

  }

>>>>>>> 6bc4ee33a6788c47b0504a7836490fc448eb139a
}).controller("listRvCtrl", function($location, $scope, tincanFactory, $route, $routeParams) {  
  $scope.showthis = [];
 $('footer').hide(); 


  tincanFactory.getUser($routeParams.nameHolder, memcachejs.get("access_token")).success(function(success) {

  if (memcachejs.get("access_token") === success.user[0].access_token) {
      $scope.showthis = 'show';

      $scope.userName = $routeParams.nameHolder;

      tincanFactory.getUser($scope.userName, memcachejs.get("access_token")).success(function(success) {
        $scope.userId = success.user[0].id;
        console.log($scope.userId)
      }).error(function(error) {
      });

    } else {
      $location.path('/')
    }
  });
  $scope.listRv = function() {
    var rvObject = $('#listRvForm').serialize()+'&'+$.param({ 'access_token': memcachejs.get("access_token") });

    tincanFactory.createRVListing($scope.userId, rvObject).success(function(success) {
      console.log(success)
      alert('RV Successfully Created!')
      
    }).error(function(error) {
      console.log(error)
    });
  }
}).controller('howItWorksCtrl', function() {

  document.getElementsByClassName('tcMainNav')[0].style.visibility = "visible";
  document.getElementById('splashNav').style.visibility = "hidden";

});



//toggle Login Modal
tincanrvApp.directive('logIn', function() {
  return {
    restrict: 'A',
    link: function($scope, $elm) {
      $elm.on('click', function() {
        $('#loginModal').modal('toggle')
      });
    }
  }
}).directive('goHome', function() {
  return {
    restrict: 'A',
    link: function($scope, $elm) {
      $elm.on('click', function() {
        location.replace("#/")
      });
    }
  }
}).directive('goList', ['$routeParams', function($routeParams) {
  return {
    restrict: 'A',
    link: function($scope, $elm) {
      $elm.on('click', function() {
        location.replace('#/' + $routeParams.nameHolder + '/listrv')
      });
    }
  }
}]).directive('editUser', ['$routeParams', function($routeParams) {
  return {
    restrict: 'A',
    link: function($scope, $elm) {
      $elm.on('click', function() {
        location.replace('#/' + $routeParams.nameHolder + '/edit' )
      });
    }
  }
}]);


