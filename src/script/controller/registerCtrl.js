function registerCtrl(dataService,$interval){
    this.submit = function(){
        console.log(this.user)
    };
    this.send = function(){
        dataService.getVerifyCode().then(function(resp){
            //console.log(resp.data.state)
            if (resp.data.state) {
               this.time = '60s';
               var count = 60;
               var interval = $interval(function(){
                   if (count <= 0) {
                     $interval.cancel(interval);
                     this.time = '';
                   } else {
                       count--;
                       this.time = count + 's';                      
                   }

               }.bind(this),1000);
            }
        }.bind(this));
    };
    
}

angular
    .module('app')
    .controller('registerCtrl',registerCtrl);