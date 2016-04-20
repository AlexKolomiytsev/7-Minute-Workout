/**
 * Created by sanya on 03.03.2016.
 */
angular.module('7minWorkout')
    .factory('workoutHistoryTracker', ['$rootScope', 'appEvents', 'localStorageService',
        function ($rootScope, appEvents, localStorageService) {
        var maxHistoryItems = 20;
        var currentWorkoutLog = null;
        var service = {};
        var storageKey = 'workoutHistory';
        var workoutHistory = localStorageService.get(storageKey) || [];

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
            localStorageService.add(storageKey, workoutHistory)
        };
        service.endTracking = function (completed) {
            currentWorkoutLog.completed = completed;
            currentWorkoutLog.endedOn = new Date().toISOString();
            currentWorkoutLog = null;
            localStorageService.add(storageKey, workoutHistory);
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
            localStorageService.add(storageKey, workoutHistory);
        });

        return service;
    }]);

angular.module('7minWorkout').value("appEvents", {
    workout: {
        exerciseStarted: "event:workout:exerciseStarted"
    }
});