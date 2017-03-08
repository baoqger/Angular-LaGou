'use strict';
angular.module('app').directive('appHead',['cache',function(cache){
	return {
		restrict: 'A',
		replace: true,
		templateUrl : 'view/template/head.html',
        controller: function(){},
        controllerAs: 'head',
        bindToController: true,
        link:function(scope){
            scope.head.loginStatus = cache.get("loginStatus");
        }
	};
}]);