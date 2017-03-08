angular.module('app').controller('positionCtrl',['$scope','cache','dataService','dataFilterService','$state',function($scope,cache,dataService,dataFilterService,$state){

	this.position = {};
	this.company = {};
 	dataService.getPosiInfoById().then(function(resp){

        this.position = dataFilterService.filterById(resp.data,$state.params.id);
        //console.log(this.position);
        var companyId = this.position.companyId;
        dataService.getCompInfoById().then(function(resp2){
        	//this.company = resp.data;
			this.company = dataFilterService.filterByCompId(resp2.data,companyId);
			//console.log(this.company);
		}.bind(this))
	}.bind(this));


    this.loginStatus = cache.get("loginStatus") //get the loginstatus from cache service

    this.submitStatus = cache.checkSubmitStatus($state.params.id); // check the submit status
 
    
    this.submitResume = function(){ //submit resume function
        
        cache.addToSubmitHistory($state.params.id);
        this.submitStatus = cache.checkSubmitStatus($state.params.id); // check the submit status

    }.bind(this);
    
    
    

}]);
