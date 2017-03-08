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