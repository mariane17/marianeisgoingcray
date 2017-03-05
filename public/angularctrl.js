app.controller('two_way_control',function($scope,$http){	//$interval
	load_ilidata();

//	$interval(function(){
//		load_ilidata();
//		},300);

	function load_ilidata(){
		$http.get('https://marianeisgoingcray.mybluemix.net/select').success(function(data){
		$scope.ilidata=data;
		});
	};
});

//});