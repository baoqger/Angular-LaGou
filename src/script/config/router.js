'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url : '/main',
		templateUrl : 'view/main.html',
		controller: 'mainCtrl as main'
	}).state('position',{
		url:'/position/:id',
		templateUrl: 'view/position.html',
		controller:'positionCtrl as position',
	}).state('company',{
		url: '/company/:id',
		templateUrl: 'view/company.html',
		controller:'companyCtrl as company'
	}).state('search',{
		url: '/search',
		templateUrl:'view/search.html',
		controller:'searchCtrl as search',
		resolve: searchCtrl.resolve
	}).state('me',{
        url: '/me',
        templateUrl: 'view/me.html',
        controller:'meCtrl as me',
        resolve: meCtrl.resolve
    }).state('login',{
        url: '/login',
        templateUrl: 'view/login.html',
        controller:'loginCtrl as login',
    }).state('register',{
        url: '/register',
        templateUrl: 'view/register.html',
        controller:'registerCtrl as register',
    }).state('favorite',{
        url: '/favorite',
        templateUrl: 'view/favorite.html',
        controller:'favoriteCtrl as favorite',
        resolve: favoriteCtrl.resolve
    }).state('post',{
        url: '/post',
        templateUrl: 'view/post.html',
        controller:'postCtrl as post',
        resolve: postCtrl.resolve
    });
	
	$urlRouterProvider.otherwise('main');
}]);
