var chatApp = angular.module('chatApp', ['ui.router', 'btford.socket-io']);

chatApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'chat.html',
                controller: 'chatController'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login.html'
            })
    })
    .factory('chatSocket', function(socketFactory) {
        return socketFactory();
    })
    .controller('chatController', function($scope, chatSocket) {
        $scope.messages = []
        chatSocket.on('message', function(data) {
            $scope.messages.push(data.message)
        })
    })