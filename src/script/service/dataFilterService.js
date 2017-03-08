/**
 * Created by seine on 2017/2/22.
 */
'use strict';
angular.module('app').service('dataFilterService',['$http',function($http){
    this.filterById = function(sourcedata, id){
        for(var i = 0 ; i < sourcedata.length; i++) {
            if (sourcedata[i]['id'] === id) {
                return sourcedata[i];
            }
        }
    };
    this.filterByCompId = function(sourcedata, id){
        //console.log(sourcedata);
        for (var i = 0 ; i < sourcedata.length; i++){
            if (sourcedata[i]['id']===id){
                return sourcedata[i];
            }
        }
    };
	this.positionClassForCompany = function(companydata){
		var posiClassList = [];
		companydata.positionClass.forEach(function(eachclass){
			posiClassList.push(eachclass.name);
		});
		return posiClassList;
	};
	this.getPositionListByClass = function(currentclass,companydata){
		console.log("call getPositionListByClass...");
		for(var i= 0; i < companydata.positionClass.length; i++){
			var tempdata = companydata.positionClass[i];
			if (tempdata.name === currentclass) {
				var result = tempdata.positionList;
				break;
			}
		}
		return result;

	};
    this.getFilterListByID = function(id,globalCity,globalSalary,globalScale){
        if ( id === 'city') {
            return globalCity;
        } else if (id === 'salary') {
            return globalSalary;
        } else {
            return globalScale;
        }
    };
    this.getCurrentFilterObj = function(currentFilterObj,selecteditemid, tabid){

        if (Object.keys(currentFilterObj).indexOf(tabid + "Id") >= 0) {
            if (selecteditemid === ""){
                delete currentFilterObj[tabid + "Id"];
            } else {
                currentFilterObj[tabid + "Id"] = selecteditemid;
            }
            
        } else {
            if (selecteditemid !== "") {
                currentFilterObj[tabid + "Id"] = selecteditemid;
            }

        }
        return currentFilterObj;
        
    };
    this.searchPosition = function(position,keywords){
        var newlist = [];
        console.log(position)
        for (var i = 0; i < position.length; i++){
            if (position[i]["job"].search(keywords) >= 0 || position[i]["companyName"].search(keywords) >= 0) {
                newlist.push(position[i]);
            }
        }
        return newlist;
    }

}]);
