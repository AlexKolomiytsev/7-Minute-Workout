/**
 * Created by sanya on 04.03.2016.
 */

'use strict';

/**
 * create a module named 'app'(1st arg).
 * 2nd arg is an array of the other module dependencies
 * that the app module has
 **/
angular.module('app', ['ngRoute', '7minWorkout']).
config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/start', { templateUrl: 'partials/start.html' });
		$routeProvider.when('/workout', { templateUrl: 'partials/workout.html', controller: 'WorkoutController' });
		$routeProvider.when('/finish', { templateUrl: 'partials/finish.html' });
		$routeProvider.otherwise({ redirectTo: '/start' });
}]);

angular.module('7minWorkout', []);

