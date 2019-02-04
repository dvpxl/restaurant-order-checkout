var app = angular.module('angularInstaRunner', []);

app.factory('Data', function(){
    var data =
    {
        totalPrice: 0.00
    };
    
    return {
      
        getTotalPrice: function () {
            
            return sessionStorage.data;
        },

        setTotalPrice: function (totalPrice) {
            console.log("setTotalPrice:" + data.totalPrice);
            sessionStorage.data = JSON.stringify(data);
            data.totalPrice = totalPrice;
        }
    };
});


app.controller('ItemSelectionController', function($scope, Data) {
    var itemSelection = this;
    var totalPrice = 0.00;

    itemSelection.selectedItems = [

    ];
    
    itemSelection.selectionMade = function(e){
        var selectionElement = $(e.currentTarget).find(".fa");
        var item_price = $(e.currentTarget).find(".menu-price").text();
        
        selectionElement.toggleClass('fa-check');
        if(selectionElement.hasClass('fa-check')) {
          totalPrice += parseFloat(item_price);
        }
        else {
          totalPrice -= parseFloat(item_price);
        }

        
        console.log($(".amount").text());
    };

    itemSelection.totalPrice = function(){
      
       Data.setTotalPrice(totalPrice.toFixed(2))
       return totalPrice.toFixed(2);
    };

  });

app.controller("CheckoutController", function($scope, Data){
      var checkout = this;
      $scope.totalPrice = Data.getTotalPrice();

      checkout.getTotalPrice = function() {
         console.log(Data.getTotalPrice());
      }
});