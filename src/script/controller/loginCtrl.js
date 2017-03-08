function loginCtrl($state,cache){
    this.login = function(){
        cache.put('loginStatus', true);
        $state.go("main");
    }
}


angular
    .module('app')
    .controller('loginCtrl',loginCtrl);