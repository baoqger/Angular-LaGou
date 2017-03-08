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