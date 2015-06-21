
tincanrvApp.factory('tincanFactory', function($http) {
    var urlBase = 'http://www.tincanrv.com/';
    var tincanFactory = {};
    
    tincanFactory.userSignUp = function(newContent){
        return $http({
               method: 'POST',
               url:  urlBase + 'auth/register',
               data: newContent
            
             });
    }

    tincanFactory.loginUser = function(result){
        return $http({
               method: 'POST',
               url:  urlBase + 'auth/login',
               data: result 
                         
            });
    }


    tincanFactory.getToken = function(loginObject, id){
        return $http({
               method: 'POST',
               url:  urlBase + 'oauth/access_token/' + id,
               data: loginObject 
                         
            });
    }

    tincanFactory.homeTiles = function(){
        return $http({
               method: 'GET',
               url:  'data/users.json'            
            });
    }

<<<<<<< HEAD
    tincanFactory.getUser = function(nameHolder, access_token){
        return $http({
               method: 'GET',
               url:  urlBase + 'api/v1/users/' + nameHolder  ,
               params: {access_token: access_token}          
=======
    tincanFactory.getUser = function(idHolder, access_token){
        return $http({
               method: 'GET',
               url:  urlBase + 'api/v1/users/' + idHolder,
               params: {"access_token" : access_token}      
>>>>>>> 6bc4ee33a6788c47b0504a7836490fc448eb139a
            });
    }

    tincanFactory.createAddress = function(newAddress, userid){
        return $http({
               method: 'POST',
               url:  urlBase + 'api/v1/users/' + userid + '/address/create',
               data: newAddress
                         
            });
    }

    tincanFactory.editAddress = function(newAddress, userid, access_token){
        return $http({
               method: 'POST',
               url:  urlBase + 'api/v1/users/' + userid + '/address/update',
               data: newAddress,
               headers: {"access_token" : access_token, "Content-type" : "application/json"}  
                         
            });
    }

    tincanFactory.createRVListing = function(nameHolder, rvObject){
            return $http({
              method: 'POST',
              url: urlBase + 'api/v1/users/' + nameHolder + '/rv/create',
              data: rvObject
            });
    }



return tincanFactory;
  });





