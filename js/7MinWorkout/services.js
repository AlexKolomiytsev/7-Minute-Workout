/**
 * Created by sanya on 03.03.2016.
 */
angular.module('7minWorkout')
    .factory('workoutHistoryTracker', ['$rootScope', 'appEvents', function ($rootScope, appEvents) {
        var maxHistoryItems = 20;
        var workoutHistory = [];
        var currentWorkoutLog = null;
        var service = {};

        service.startTracking = function () {
            currentWorkoutLog = {
                startedOn: new Date().toISOString(),
                completed: false,
                exercisesDone: 0
            };
            if (workoutHistory.length >= maxHistoryItems) {
                workoutHistory.shift();
            }
            workoutHistory.push(currentWorkoutLog);
        };
        service.endTracking = function (completed) {
            currentWorkoutLog.completed = completed;
            currentWorkoutLog.endedOn = new Date().toISOString();
            currentWorkoutLog = null;
        };
        service.getHistory = function () {
            return workoutHistory;
        };
        //event subscriber
        $rootScope.$on('$routeChangeSuccess', function (e, args) {
            if(currentWorkoutLog) {
                service.endTracking(false); //end the current tracking if in progress the route changes
            }
        });
        $rootScope.$on(appEvents.workout.exerciseStarted, function (e,args) {
            currentWorkoutLog.lastExercise = args.title;
            ++currentWorkoutLog.exercisesDone;
        });

        return service;
    }]);

angular.module('7minWorkout').value("appEvents", {
    workout: {
        exerciseStarted: "event:workout:exerciseStarted"
    }
});