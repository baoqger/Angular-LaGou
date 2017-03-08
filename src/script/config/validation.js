'use strict';

angular.module('app').config(['$validationProvider',function($validationProvider){
    var expression = {
        phone: /^1[\d]{10}$/,
        password: function(value){
           var str = value + '';
           return str.length > 5; 
        }
    };
    var defaultMsg = {
        phone: {
            success:'',
            error:'必须是11位手机号'
        },
        password: {
            success:'',
            error: '长度至少6位',
        }
    };
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);