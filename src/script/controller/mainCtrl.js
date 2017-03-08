angular.module('app').controller('mainCtrl',['dataService',function(dataService){
	console.log("main controller");
	this.list = [];
	dataService.getPositionList().then(function(resp){
		this.list = resp.data;
	}.bind(this));

	/*
	this.list = [{
		id: '1',
		name:'销售',
		imgSrc: 'image/company-3.png',
		companyName : '千度',
		city: '上海',
		industry: '互联网',
		time:'2016-06-01 11:05'
	},
        {
            id: '2',
            name:'销售',
            imgSrc: 'image/company-3.png',
            companyName : '千度',
            city: '上海',
            industry: '互联网',
            time:'2016-06-01 11:05'
        }
	];
	*/
}]);