'use strict';
//define the controller configuration function
function appPositionClassCtrl(dataFilterService){
	this.$onInit = function(){ //bind the isolated scope property to the controller
		//ng-click callback function
		this.getCurrentPosi = function(currentclass){
			//filter the data with dataFilterService service and set to scope property currentpositionlist 
			this.currentpositionlist = dataFilterService.getPositionListByClass(currentclass,this.companyInfo);
			this.currentPositionClass = currentclass;
		}
	}
}
//define the directive configuration function
function appPositionClassDirective(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl : 'view/template/positionClass.html',
		scope: {
			positionClass: "=",
			companyInfo : "=",
			currentPositionClass : "="
		},
		bindToController: true, //bind the passed-in properties from parent scope to directive controller
		controller: 'appPositionClassCtrl',
		controllerAs:"posiClass",
		link: function(scope,element,attrs,ctrl){
			scope.$watch('posiClass.positionClass',function(newvalue, oldvalue){ //watch the data change for positionclass
				if (newvalue === oldvalue){ return;}
				ctrl.getCurrentPosi(scope.posiClass.positionClass[0]);
			})
		}
    };	
}

angular
	.module('app')
	.directive('appPositionClass',appPositionClassDirective)
	.controller('appPositionClassCtrl',appPositionClassCtrl);
