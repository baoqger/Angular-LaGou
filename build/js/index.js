'use strict';

angular.module('app',['ui.router','ngCookies','validation']);



'use strict';
angular.module('app').config(['$provide',function($provide){

}]);
'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url : '/main',
		templateUrl : 'view/main.html',
		controller: 'mainCtrl as main'
	}).state('position',{
		url:'/position/:id',
		templateUrl: 'view/position.html',
		controller:'positionCtrl as position',
	}).state('company',{
		url: '/company/:id',
		templateUrl: 'view/company.html',
		controller:'companyCtrl as company'
	}).state('search',{
		url: '/search',
		templateUrl:'view/search.html',
		controller:'searchCtrl as search',
		resolve: searchCtrl.resolve
	}).state('me',{
        url: '/me',
        templateUrl: 'view/me.html',
        controller:'meCtrl as me',
        resolve: meCtrl.resolve
    }).state('login',{
        url: '/login',
        templateUrl: 'view/login.html',
        controller:'loginCtrl as login',
    }).state('register',{
        url: '/register',
        templateUrl: 'view/register.html',
        controller:'registerCtrl as register',
    }).state('favorite',{
        url: '/favorite',
        templateUrl: 'view/favorite.html',
        controller:'favoriteCtrl as favorite',
        resolve: favoriteCtrl.resolve
    }).state('post',{
        url: '/post',
        templateUrl: 'view/post.html',
        controller:'postCtrl as post',
        resolve: postCtrl.resolve
    });
	
	$urlRouterProvider.otherwise('main');
}]);

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
function favoriteCtrl(favoritePosition){
    this.favoritePosition = favoritePosition; //get the favorite position list from the service
}

favoriteCtrl.resolve = {
    favoritePosition: function(dataService){
        return dataService.getFavoritePosition();
    }   
};

angular
    .module('app')
    .controller('favoriteCtrl',favoriteCtrl);
function loginCtrl($state,cache){
    this.login = function(){
        cache.put('loginStatus', true);
        $state.go("main");
    }
}


angular
    .module('app')
    .controller('loginCtrl',loginCtrl);
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

function postCtrl(postPosition){
    this.tabList = [{id: 'all',name: '全部'},{id:'pass',name:'面试'},{id: 'fail',name:'不合适'}];
    this.tClick = function(id){
        console.log(id);
    }.bind(this)
    this.postPosition = postPosition; //get the submit position list from the service
}

postCtrl.resolve = {
    postPosition: function(dataService){
        return dataService.getPostPosition();
    }
}

angular
    .module('app')
    .controller('postCtrl',postCtrl);
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
	
'use strict';
angular.module('app').directive('appCompany',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl : 'view/template/company.html',
		scope:{
			comp:"="
		}
	};
}]);
'use strict';
angular.module('app').directive('appFoot',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl : 'view/template/foot.html' 
	};
}]);
'use strict';
angular.module('app').directive('appHead',['cache',function(cache){
	return {
		restrict: 'A',
		replace: true,
		templateUrl : 'view/template/head.html',
        controller: function(){},
        controllerAs: 'head',
        bindToController: true,
        link:function(scope){
            scope.head.loginStatus = cache.get("loginStatus");
        }
	};
}]);
'use strict';
angular.module('app').directive('appHeadBar',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl : 'view/template/headBar.html',
		scope:{
			text:"=",
		}
		,link:function(scope){
			scope.back = function(){
				window.history.back();
				console.log(scope.text)
			}
		}
	};
}]);
'use strict';
//define the controller configuration function
function appPositionClassCtrl(dataFilterService){
	this.$onInit = function(){ //bind the isolated scope property to the controller
		//ng-click callback function
		this.getCurrentPosi = function(currentclass){
			//filter the data with dataFilterService service and set to scope property currentpositionlist 
			this.currentpositionlist = dataFilterService.getPositionListByClass(currentclass,this.companyInfo);
			this.currentPositionClass = currentclass;
		}
	}
}
//define the directive configuration function
function appPositionClassDirective(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl : 'view/template/positionClass.html',
		scope: {
			positionClass: "=",
			companyInfo : "=",
			currentPositionClass : "="
		},
		bindToController: true, //bind the passed-in properties from parent scope to directive controller
		controller: 'appPositionClassCtrl',
		controllerAs:"posiClass",
		link: function(scope,element,attrs,ctrl){
			scope.$watch('posiClass.positionClass',function(newvalue, oldvalue){ //watch the data change for positionclass
				if (newvalue === oldvalue){ return;}
				ctrl.getCurrentPosi(scope.posiClass.positionClass[0]);
			})
		}
    };	
}

angular
	.module('app')
	.directive('appPositionClass',appPositionClassDirective)
	.controller('appPositionClassCtrl',appPositionClassCtrl);

'use strict';

function appPositionInfoCtrl(cache){
    this.$onInit = function(){
        this.loginStatus = cache.get("loginStatus"); 
        this.addFavorite = function(posiId){
            this.favoriteStatus = !this.favoriteStatus;
            cache.addToFavoriteCacheList(posiId);
        };
        this.removeFavorite = function(posiId){
            this.favoriteStatus = !this.favoriteStatus;
            cache.removeFromFavoriteCacheList(posiId);
        };
        this.checkFavoriteStatus = function(positionId){
            this.favoriteStatus = cache.checkFavoriteStatus(positionId);
        };
        
    }
};

function appPositionInfo(){
     return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
            isActive: '=',
            isLogin :'=',
            pos:'='
        },
        controller: appPositionInfoCtrl,
        controllerAs: 'posiInfo',
        bindToController:true,
        link: function(scope,element,attrs,ctrl){
            scope.$watch('posiInfo.pos',function(newvalue,oldvalue){
                if(newvalue === oldvalue) {return;}
                console.log("data loaded" + scope.posiInfo.pos.id)
                ctrl.checkFavoriteStatus(scope.posiInfo.pos.id);
    
            })
        }
    }   
    
};

angular
    .module('app')
    .directive('appPositionInfo',appPositionInfo)
    .controller('appPositionInfoCtrl',appPositionInfoCtrl);
'use strict';
angular.module('app').directive('appPositionList',[function(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl : 'view/template/positionList.html',
        scope:{
            data:'=',
            filterObj: "=",
        },
        controller: function(){},
        controllerAs: 'posiList',
        bindToController: true,
    };
}]);

'use strict';
/*
angular.module('app').directive('appSheet',[function(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl : 'view/template/sheet.html',
        scope: {
            visible: "=",
            filterList:"=",
            
        },
        controller: function(){
            this.$onInit = function(){
                 this.closeFilterList = function(){
                    this.visible = false;
                }.bind(this);                 
            }
        },
        controllerAs: 'sheet',
        bindToController: true,
    };
}]);
*/

function appSheetCtrl(){
    this.$onInit = function(){
        this.closeFilterList = function(){
            this.visible = false;
        }.bind(this);  
    }    
};

function appSheet() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl : 'view/template/sheet.html',
        scope: {
            visible: "=",
            filterList:"=",
            getFilterObj: "=",
            tabId : "=",
            
        },
        controller: 'appSheetCtrl',
        controllerAs: 'sheet',
        bindToController: true,
    }; 
};


angular
    .module('app')
    .directive('appSheet',appSheet)
    .controller('appSheetCtrl',appSheetCtrl);
'use strict';

function appTabCtrl(){
	this.$onInit = function(){
		this.click = function(id,name){
			this.selectedTabID = id;
			this.tabClick(id);
		}.bind(this)
	}

}


function appTab(){
	return {
        restrict: 'A',
        replace: true,
        templateUrl : 'view/template/tab.html',
		scope: {
			tabList:"=",
			tabClick:"="
		},
		controller: 'appTabCtrl',
		controllerAs: 'tab',
		bindToController: true,
    };
};

angular
	.module('app')
	.directive('appTab',appTab) 
	.controller('appTabCtrl',appTabCtrl);
'use strict';
angular.module('app').service('cache',['$cookies',function($cookies){
    this.put = function(key, value){
        $cookies.put(key,value);
    };
    this.get = function(key){
        return $cookies.get(key);
    };
    this.remove = function(key){
        $cookies.remove(key);
    };
    
    this.addToSubmitHistory = function(positionId){
           
        if (Object.keys($cookies.getAll()).indexOf("submitHistory") < 0){
            $cookies.put("submitHistory",JSON.stringify([]))
        }
        var currenthistory = JSON.parse($cookies.get("submitHistory"));
        console.log(currenthistory)
        if (currenthistory.indexOf(positionId) < 0) {
            currenthistory.push(positionId)
            $cookies.put("submitHistory",JSON.stringify(currenthistory));
        }  
    };
    
    this.checkSubmitStatus = function(positionId){
        if (Object.keys($cookies.getAll()).indexOf("submitHistory") >= 0){ 
            var currenthistory = JSON.parse($cookies.get("submitHistory"));
            if (currenthistory.indexOf(positionId) >= 0) {
                return true;
            } else {
                return false;
            }
        }
    };
    this.getPostPositionId = function(){
        if (Object.keys($cookies.getAll()).indexOf("submitHistory") >= 0){ 
            return JSON.parse($cookies.get("submitHistory"));
        } else {
            return [];
        }
    };
    
    this.checkFavoriteStatus = function(posiId){
        if (Object.keys($cookies.getAll()).indexOf("favoriteList") >= 0){
            return JSON.parse($cookies.get("favoriteList")).indexOf(posiId)>=0?true:false;
        } else {
            return false;
        }
    };
    this.addToFavoriteCacheList = function(posiId){
        if (Object.keys($cookies.getAll()).indexOf("favoriteList") < 0){
            $cookies.put("favoriteList",JSON.stringify([]))
        }
        var currentfavorite = JSON.parse($cookies.get("favoriteList"));
        console.log(currentfavorite)
        if (currentfavorite.indexOf(posiId) < 0) {
            currentfavorite.push(posiId);
            $cookies.put("favoriteList",JSON.stringify(currentfavorite));
        }       
    };
    this.removeFromFavoriteCacheList = function(posiId){
        var currentfavorite = JSON.parse($cookies.get("favoriteList"));
        var targetindex = currentfavorite.indexOf(posiId);
        currentfavorite.splice(targetindex,1);
        $cookies.put("favoriteList",JSON.stringify(currentfavorite));
    };
    this.getFavoritePositionId = function(){
        if (Object.keys($cookies.getAll()).indexOf("favoriteList") >= 0){ 
            return JSON.parse($cookies.get("favoriteList"));
        } else {
            return [];
        }        
    };
}])
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