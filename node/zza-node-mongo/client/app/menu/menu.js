﻿/*
 * menu viewmodel associated with the menu.html view
 * and its menu.*.html sub-view templates
 */
(function(angular) {
    'use strict';

    angular.module( "app" ).controller( 'menu',
        ['$state', '$stateParams', 'dataservice', controller] );

    function controller($state, $stateParams, dataservice ) {
        var vm  = this;
        dataservice.ready(onReady);

        function onReady() {
            var type = $stateParams.productType;
            if (type){
                var types = ['drink', 'pizza', 'salad'];
                type = types[types.indexOf(type.toLowerCase())];
            }
            type = type || 'pizza';

            vm.products = dataservice.products.byTag( type );
            vm.productSref = productSref;
            vm.go = go;
            vm.template = 'app/menu/menu.' + type + '.html';
        }
        /////////////////////
        /*
         * An ng-click callback that uses $state to navigate
         * the link url is not visible in the browser and must
         * style the anchor tag with 'hand' for the cursor to indicate a clickable.
         * See pizza.html for an example of this approach
         */
        function go(product) {
            $state.go('app.order.product', {productType : product.type, productId: product.id});
        }

        // Generates a link that you can see in the browser
        // See drink.html for an example of this approach
        function productSref(product) {
            return $state.href('app.order.product', {productType : product.type, productId: product.id});
            //return '#/menu/'+product.type+'/'+product.id;
        }
    }

}( this.angular ));