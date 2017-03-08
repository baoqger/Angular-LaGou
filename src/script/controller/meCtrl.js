function meCtrl(cache,$state,loginStatus){
    this.loginStatus = loginStatus; //get the loginStatus from the resolve service
    
//    this.click = function(){
//        console.log(this.input);
//        cache.addToCache(this.input)
//        console.log(cache.cachelist);
//        $state.go("main")
//    }.bind(this)
    
    this.logout = function(){
        cache.remove("loginStatus");
        $state.go("main")
        
    }
}

meCtrl.resolve = {
    loginStatus : function(cache){
        return cache.get("loginStatus")
    }
}

angular
    .module('app')
    .controller('meCtrl',meCtrl);