
function searchCtrl(position,globalCity,globalSalary,globalScale,dataFilterService,dataService){
	console.log("search controller...");
	this.Tablist = dataService.getTabList();//get the tablist information
    
	this.list = position; //set the position list with resolved data position
	
    // the callback function for ng-click of 'search' button
	this.search =function(keywords){
		console.log("clicked...");
        this.list = dataFilterService.searchPosition(position,keywords);
	};
    this.cancelSearch = function(){
        this.name= '';
        this.list = position; //set the position list with resolved data position
    };
    //trigger by click the app-tab element
	this.tClick = function(id){
		//pass the following 3 parameters to app-sheet directive
        this.filterList = dataFilterService.getFilterListByID(id,globalCity,globalSalary,globalScale);
        this.filterListVisible = true; 
        this.currentTabId = id;
	}.bind(this);
    
    //trigger by click app-sheet element
    this.setCurrentFilterObj = function(filteritemid,tabid){
        //pass this currentFilterObj to positionList directive
        this.currentFilterObj = dataFilterService.getCurrentFilterObj(this.currentFilterObj || {},filteritemid,tabid);
        //update the tablist content
        this.Tablist = dataService.updateTabList(this.Tablist,this.filterList,filteritemid,tabid);
    }.bind(this);
}

//bind the route's resolve property to controller
searchCtrl.resolve = {
	globalCity: function(dataService){
		return dataService.getJSONData('data/city.json');
	},
	globalSalary: function(dataService){
		return dataService.getJSONData('data/salary.json');
	},
	globalScale: function(dataService){
		return dataService.getJSONData('data/scale.json');
	},
	position: function(dataService){
		return dataService.getPositionListNew();
	}
}

angular
	.module('app')
	.controller('searchCtrl',searchCtrl);
	