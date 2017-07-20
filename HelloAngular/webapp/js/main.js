angular.module("helloWorld", [])
    .controller('helloController', helloController)
    .filter('discontinued', discontinuedFilter);

function helloController($scope, $http, $filter) {
    $scope.productList = [];

    $scope.orderAmount = "";
    $scope.orderAlert = "";

    $scope.productFilter = undefined;

    var odataUrl = "/Northwind/V3/Northwind/Northwind.svc/";

    $http.get(odataUrl + "Products")
        .then(function(response) {
                $scope.productList = response.data.value;
            },
            function(error) {
                alert("An error occurred");
            }
        );

    $scope.selectedProduct = {};
    $scope.selectProduct = function(product) {
        $scope.selectedProduct = product;
        $scope.orderAmount = "";
        $('#product-detail').modal("show");
    };

    $scope.orderItem = function() {
        $scope.orderAlert = $scope.orderAmount + " units of " +
            $scope.selectedProduct.ProductName + " have been ordered";

        $('#product-detail').modal("hide");
        $('#order-alert-box').slideDown("slow");

        setTimeout(function() {
            $("#order-alert-box").slideUp("slow");
        }, 4000);
    };

    $scope.itemCount = function() {
        var count = $filter('filter')($scope.productList, $scope.productFilter).length;
        return count;
    };

}

function discontinuedFilter() {
    return function(input) {
        return input ? 'Discontinued' : 'Available';
    };
}