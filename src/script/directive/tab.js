'use strict';

function appTabCtrl(){
	this.$onInit = function(){
		this.click = function(id,name){
			this.selectedTabID = id;
			this.tabClick(id);
		}.bind(this)
	}

}


function appTab(){
	return {
        restrict: 'A',
        replace: true,
        templateUrl : 'view/template/tab.html',
		scope: {
			tabList:"=",
			tabClick:"="
		},
		controller: 'appTabCtrl',
		controllerAs: 'tab',
		bindToController: true,
    };
};

angular
	.module('app')
	.directive('appTab',appTab) 
	.controller('appTabCtrl',appTabCtrl);