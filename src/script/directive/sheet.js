'use strict';
/*
angular.module('app').directive('appSheet',[function(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl : 'view/template/sheet.html',
        scope: {
            visible: "=",
            filterList:"=",
            
        },
        controller: function(){
            this.$onInit = function(){
                 this.closeFilterList = function(){
                    this.visible = false;
                }.bind(this);                 
            }
        },
        controllerAs: 'sheet',
        bindToController: true,
    };
}]);
*/

function appSheetCtrl(){
    this.$onInit = function(){
        this.closeFilterList = function(){
            this.visible = false;
        }.bind(this);  
    }    
};

function appSheet() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl : 'view/template/sheet.html',
        scope: {
            visible: "=",
            filterList:"=",
            getFilterObj: "=",
            tabId : "=",
            
        },
        controller: 'appSheetCtrl',
        controllerAs: 'sheet',
        bindToController: true,
    }; 
};


angular
    .module('app')
    .directive('appSheet',appSheet)
    .controller('appSheetCtrl',appSheetCtrl);