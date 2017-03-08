var myILI = angular.module('readILI',[]);

myILI.controller('iliCtrl',function($scope,$http){	//$interval
	load_ilidata();

	function load_ilidata(){
	$http.get('https://marianeisgoingcray.mybluemix.net/select').success(function(data){
	$scope.ilidata=data;
	}
	)};
});
