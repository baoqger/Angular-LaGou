/**
 * Created by seine on 2017/2/22.
 */
'use strict';
angular.module('app').service('dataService',['$http','cache',function($http,cache){

    this.getPositionList = function(){
        return $http.get('data/positionList.json');
    };
	this.getPositionListNew = function(){
		return $http.get('data/positionList.json').then(function(resp){
			return resp.data
		});
	};
    this.getPosiInfoById = function(){
        return $http.get('data/positionList.json');
    };
    this.getCompInfoById = function(){
        return $http.get('data/companyList.json');
    };
	this.getJSONData = function(jsondatafile){
		return $http.get(jsondatafile).then(function(resp){
			return resp.data;
		});
	};
    this.getTabList = function(){
        return [{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"scale",name:"公司规模"}];
    };
    this.updateTabList = function(Tablist,filterList,filteritemid,tabid){
        var filteritemname = "";
        filterList.forEach(function(eachitem){
            if (eachitem.id === filteritemid){
                filteritemname = eachitem.name;
            }
        });
        Tablist.forEach(function(eachtab){
            if (eachtab.id === tabid){
                eachtab.name = filteritemname;
            }
        });
        return Tablist;
    };
    this.getVerifyCode =function(){
        return $http.get('data/code.json');
    };
    this.getPostPosition = function(){
        var currentIdList = cache.getPostPositionId();
        return $http.get('data/positionList.json').then(function(resp){
            var result = [];
            for (var i = 0; i < resp.data.length; i++){
                if (currentIdList.indexOf(resp.data[i]["id"]) >=0){
                    result.push(resp.data[i]);
                }
            }
            return result;
        })
    };
    this.getFavoritePosition = function(){
        var currentIdList = cache.getFavoritePositionId();
        return $http.get('data/positionList.json').then(function(resp){
            var result = [];
            for (var i = 0; i < resp.data.length; i++){
                if (currentIdList.indexOf(resp.data[i]["id"]) >=0){
                    result.push(resp.data[i]);
                }
            }
            return result;
        })        
    };
}]);