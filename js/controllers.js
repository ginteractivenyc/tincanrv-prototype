tincanrvApp.controller("homeCtrl", function($scope, tincanFactory, $location){
  document.getElementById('splashNav').style.display = "block";
 document.getElementsByClassName('tcMainNav')[0].style.display = "none";
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
}).error(function(error){

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


 tincanFactory.loginUser(newContentString).success(function(success){
    $('#loginModal').modal('hide')
      //$('#welcomeUser').fadeIn();
      console.log(success)
    $scope.loggedUser = success.user[0].username;

var loggedUser = {
    username: username,
    password: password,
    grant_type: "password",
    client_id: '1',
    client_secret: 'tinnycan2%^3'
}
var loggedUserString = $.param(loggedUser);


 tincanFactory.getToken(loggedUserString).success(function(success){  
    console.log(success)
    return false;
    loggedInUser.push($scope.loggedUser);
    memcachejs.set("access_token", "value", 4000);


    $location.path('/' + $scope.loggedUser + '/edit');
 }).error(function(error){
  console.log(error)
 });


 }).error(function(error){
  console.log(error)
 }); 

}

$('body').removeClass('backgroundChange');

})
.controller("signupCtrl", function($location, $scope, tincanFactory, $route, $routeParams){

  $scope.loggedUser = [];
  $scope.userId = [];
 document.getElementsByClassName('tcMainNav')[0].style.display = "block";
document.getElementById('splashNav').style.display = "none";
document.getElementById('editBug').style.display = "none";


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

    tincanFactory.createAddress(newAddress, userid).success(function(success){
      console.log(success)

     // nameHolder.push($scope.loggedUser)
      $location.path('/' +  $scope.loggedUser)

    }).error(function(error){
        console.log(error)
    });

      
     
    }).error(function(error) {
      console.log(error)
      alert("there was an error" + error);
    });

  }



}).controller("userCtrl", function($location, $scope, tincanFactory, $route, $routeParams){
 document.getElementsByClassName('tcMainNav')[0].style.display = "block";
document.getElementById('splashNav').style.display = "none";
  $('body').removeClass('backgroundChange');
var nameHolder = $routeParams.nameHolder;
$scope.userName = $routeParams.nameHolder;
//console.log($scope.userName)
  setTimeout(function() {
    tincanFactory.getUser(nameHolder).success(function(data) {
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
}).controller("editCtrl", function($location, $scope, tincanFactory, $route, $routeParams){
 document.getElementsByClassName('tcMainNav')[0].style.display = "block";
document.getElementById('splashNav').style.display = "none";
console.log(loggedInUser)

if ($routeParams.nameHolder === localStorage.getItem('loggedUser')){
  $('#splashNav').hide();
  $('.loggedin').show();

  $('body').removeClass('backgroundChange');
  $('.tcMainNav').show();
    nameHolder = $routeParams.nameHolder;

    tincanFactory.getUser(nameHolder).success(function(success) {
 $scope.userId = [];


  $scope.editAddress = function(){
    var newAddress = $('#addressForm').serialize();
    var id = success.user[0].id;
    tincanFactory.editAddress(newAddress, id).success(function(success){
      console.log(success)
    }).error(function(error){
        console.log(error)
    });

  }


}).error(function(error){
  console.log(error)
});
}else{
  $location.path('/')
}
}).controller("listRvCtrl", function($location, $scope, tincanFactory, $route, $routeParams){
 document.getElementsByClassName('tcMainNav')[0].style.display = "block";
document.getElementById('splashNav').style.display = "none";
$('body').removeClass('backgroundChange');

  $scope.userName = $routeParams.nameHolder;

  tincanFactory.getUser($scope.userName).success(function(success){
    $scope.userId = success.user[0].id;
console.log($scope.userId)
  }).error(function(error){

  });




$scope.listRv = function(){
  var rvObject = $('#listRvForm').serialize();

  tincanFactory.createRVListing($scope.userId, rvObject).success(function(success){
    console.log(success)
  }).error(function(error){
    console.log(error)
  })
}
}).controller('howItWorksCtrl', function(){

 document.getElementsByClassName('tcMainNav')[0].style.display = "block";
document.getElementById('splashNav').style.display = "none";

});



//toggle Login Modal
tincanrvApp.directive('logIn', function(){
       return {
            restrict: 'A',
            link: function($scope, $elm) {
                 $elm.on('click', function() {
                  $('#loginModal').modal('toggle')
                 });
               }
             }
           }).directive('goHome', function(){
            return{
              restrict: 'A',
              link: function($scope, $elm){
                $elm.on('click', function(){
                    location.replace("#/")
                });
              }
            }
           });


