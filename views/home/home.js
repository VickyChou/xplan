
angular.module('xPlan',['ui.router','ui.bootstrap','ngAnimate','ngMaterial','ngMessages'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home',{
                url:'/home',
                views:{
                    'header':{
                        templateUrl:'/xplan/views/home/header/header.html'
                    },
                    'content':{
                        templateUrl:'/xplan/views/home/content/content.html'
                    }
                }
            })
    });