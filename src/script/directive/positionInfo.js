'use strict';

function appPositionInfoCtrl(cache){
    this.$onInit = function(){
        this.loginStatus = cache.get("loginStatus"); 
        this.addFavorite = function(posiId){
            this.favoriteStatus = !this.favoriteStatus;
            cache.addToFavoriteCacheList(posiId);
        };
        this.removeFavorite = function(posiId){
            this.favoriteStatus = !this.favoriteStatus;
            cache.removeFromFavoriteCacheList(posiId);
        };
        this.checkFavoriteStatus = function(positionId){
            this.favoriteStatus = cache.checkFavoriteStatus(positionId);
        };
        
    }
};

function appPositionInfo(){
     return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
            isActive: '=',
            isLogin :'=',
            pos:'='
        },
        controller: appPositionInfoCtrl,
        controllerAs: 'posiInfo',
        bindToController:true,
        link: function(scope,element,attrs,ctrl){
            scope.$watch('posiInfo.pos',function(newvalue,oldvalue){
                if(newvalue === oldvalue) {return;}
                console.log("data loaded" + scope.posiInfo.pos.id)
                ctrl.checkFavoriteStatus(scope.posiInfo.pos.id);
    
            })
        }
    }   
    
};

angular
    .module('app')
    .directive('appPositionInfo',appPositionInfo)
    .controller('appPositionInfoCtrl',appPositionInfoCtrl);