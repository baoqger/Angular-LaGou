angular.module('app').controller('companyCtrl',['dataService','dataFilterService','$state',function(dataService,dataFilterService,$state){
	console.log("company controll...");
	dataService.getCompInfoById().then(function(resp2){
        //this.company = resp.data;
		this.company = dataFilterService.filterByCompId(resp2.data,$state.params.id);
		//console.log(this.company);
		this.positionclass = dataFilterService.positionClassForCompany(this.company);
		//console.log(this.positionclass);
		this.currentPosiClass = this.positionclass[0];
	}.bind(this))
}]);