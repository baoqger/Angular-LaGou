'use strict';
angular.module('app').service('cache',['$cookies',function($cookies){
    this.put = function(key, value){
        $cookies.put(key,value);
    };
    this.get = function(key){
        return $cookies.get(key);
    };
    this.remove = function(key){
        $cookies.remove(key);
    };
    
    this.addToSubmitHistory = function(positionId){
           
        if (Object.keys($cookies.getAll()).indexOf("submitHistory") < 0){
            $cookies.put("submitHistory",JSON.stringify([]))
        }
        var currenthistory = JSON.parse($cookies.get("submitHistory"));
        console.log(currenthistory)
        if (currenthistory.indexOf(positionId) < 0) {
            currenthistory.push(positionId)
            $cookies.put("submitHistory",JSON.stringify(currenthistory));
        }  
    };
    
    this.checkSubmitStatus = function(positionId){
        if (Object.keys($cookies.getAll()).indexOf("submitHistory") >= 0){ 
            var currenthistory = JSON.parse($cookies.get("submitHistory"));
            if (currenthistory.indexOf(positionId) >= 0) {
                return true;
            } else {
                return false;
            }
        }
    };
    this.getPostPositionId = function(){
        if (Object.keys($cookies.getAll()).indexOf("submitHistory") >= 0){ 
            return JSON.parse($cookies.get("submitHistory"));
        } else {
            return [];
        }
    };
    
    this.checkFavoriteStatus = function(posiId){
        if (Object.keys($cookies.getAll()).indexOf("favoriteList") >= 0){
            return JSON.parse($cookies.get("favoriteList")).indexOf(posiId)>=0?true:false;
        } else {
            return false;
        }
    };
    this.addToFavoriteCacheList = function(posiId){
        if (Object.keys($cookies.getAll()).indexOf("favoriteList") < 0){
            $cookies.put("favoriteList",JSON.stringify([]))
        }
        var currentfavorite = JSON.parse($cookies.get("favoriteList"));
        console.log(currentfavorite)
        if (currentfavorite.indexOf(posiId) < 0) {
            currentfavorite.push(posiId);
            $cookies.put("favoriteList",JSON.stringify(currentfavorite));
        }       
    };
    this.removeFromFavoriteCacheList = function(posiId){
        var currentfavorite = JSON.parse($cookies.get("favoriteList"));
        var targetindex = currentfavorite.indexOf(posiId);
        currentfavorite.splice(targetindex,1);
        $cookies.put("favoriteList",JSON.stringify(currentfavorite));
    };
    this.getFavoritePositionId = function(){
        if (Object.keys($cookies.getAll()).indexOf("favoriteList") >= 0){ 
            return JSON.parse($cookies.get("favoriteList"));
        } else {
            return [];
        }        
    };
}])