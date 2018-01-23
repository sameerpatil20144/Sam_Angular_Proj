var path = "http://localhost/angular/Eshopper/";

var app = angular.module("eshopper",["ngRoute"]);

// console.log(app);

app.run(function ($rootScope) {
	// body...
	$rootScope.sliderStatus=true;
})
app.config(function ($routeProvider) {
  // body...
  // console.log($routeProvider)
  $routeProvider
  .when("/",{

    templateUrl:"home.html",
    controller:"homeController"

  })
  .when("/cart",{
    
    templateUrl:"cartRecords.html",
    controller:"sliderController"



  })
  .when("/login",{
    
    templateUrl:"loginPage.html",
    controller:"sliderController"


  })
  .otherwise({
    template:"404"
  })
})

app.service("getAllData",function($http) {
	// body...
	this.getrecords = function(filename,callback) {
		// body...
		// return filename;
		$http.get(path+"js/"+filename+".json").then(function(response) {
			// console.log(response.data);
			callback(response.data);
		},function (err){})
	}
})


app.factory("broadcast_factory",function ($rootScope) {
  // body...
  var factobj={}
  factobj.do_broadcast = function (type,id) {
    // body...
    // alert(type)
    // alert(id)
    $rootScope.$broadcast("filter_data",{x:type,y:id})
  }
  return factobj
})

//********************* brand ***********/

app.controller("brandCtrl",function($scope,getAllData,broadcast_factory) {
  
   // $http.get(path+"js/brand.json").then(function(response)
   // 	{

   // 		console.log(response.data)
   // 		$scope.brand_record = response.data;
   // 	},function(err){});
 
   	getAllData.getrecords("brand",function(xyz) {
   		// body...
   		// console.log(xyz)
   		$scope.brand_record = xyz;
   	})

   	$scope.filter_brand = function(id){
 		// body...
 		// alert(id)
 		// $rootScope.$broadcast("filter_brand_data",id)
    broadcast_factory.do_broadcast("brand",id)
 	}

});
//********************* category ***********/

app.controller("categoryCtrl",function($scope,getAllData,broadcast_factory) {
  
   // $http.get(path+"js/category.json").then(function(response)
   // 	{

   // 		console.log(response.data)
   // 		$scope.category_record = response.data;
   // 	},function(err){});
 

 	getAllData.getrecords("category",function(xyz){
 		// body...
 		// console.log(xyz)
 		$scope.category_record = xyz;
 	})

 	$scope.filter_cat = function(id){
 		// body...
 		// alert(id)
 		// $rootScope.$broadcast("filter_data",id)
    broadcast_factory.do_broadcast("category",id)

 	}
})
//********************* category ***********/
//********************* product ***********/

app.controller("productCtrl",function($scope,getAllData,$rootScope){
  
   // $http.get(path+"js/product.json").then(function(response)
   //    {

   //       console.log(response.data)
   //       $scope.product_record = response.data;
   //    },function(err){});

   getAllData.getrecords("product",function(xyz){
 		// body...
 		// console.log(xyz)
 		$scope.product_record = xyz;
 	})


  		// $rootScope.$on("filter_data",function(obj,val){
  		// 	// body...
  		// 	console.log(val);
  		// 	 $scope.filter_product_by_click = {pro_caid:val};
  		// })

  		// $rootScope.$on("filter_brand_data",function(obj,val){
  		// 	// body...
  		// 	console.log(val);
  		// 	 $scope.filter_product_by_click = {pro_brid:val};
  		// })

      $rootScope.$on("filter_data",function (obj,val) {
        // body...
        console.log(val)
        if(val.x == "brand"){
          $scope.filter_product_by_click = {pro_brid:val.y}
        }
        else if (val.x == "category"){
          $scope.filter_product_by_click = {pro_caid:val.y}
        }
      })
 
})

//********************* product ***********/

app.controller("sliderController",function ($rootScope) {
	// body...

	$rootScope.sliderStatus=false;

})
app.controller("homeController",function ($rootScope) {
	// body...

	$rootScope.sliderStatus=true;

})