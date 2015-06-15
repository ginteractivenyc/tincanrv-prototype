
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


    tincanFactory.getToken = function(login){
        return $http({
               method: 'POST',
               url:  urlBase + 'oauth/access_token',
               data: login 
                         
            });
    }

    tincanFactory.homeTiles = function(){
        return $http({
               method: 'GET',
               url:  'data/users.json'            
            });
    }

    tincanFactory.getUser = function(nameHolder){
        return $http({
               method: 'GET',
               url:  urlBase + 'api/v1/users/' + nameHolder            
            });
    }

    tincanFactory.createAddress = function(newAddress, userid){
        return $http({
               method: 'POST',
               url:  urlBase + 'api/v1/users/' + userid + '/address/create',
               data: newAddress
                         
            });
    }

    tincanFactory.editAddress = function(newAddress, userid){
        return $http({
               method: 'POST',
               url:  urlBase + 'api/v1/users/' + userid + '/address/update',
               data: newAddress
                         
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





