var app = angular.module('Countdown', [])
    .filter('hours', function() {
        return function(input) {
            var inputNumber = parseInt(input);
            if (inputNumber < 10) {
                inputNumber = "0" + inputNumber;
            }
            return inputNumber;
        }
    })
    .filter('minutes', function() {
        return function(input) {
            var inputNumber = parseInt(input);
            if (inputNumber > 59) {
                inputNumber = 59;
            }
            if (inputNumber < 10) {
                inputNumber = "0" + inputNumber;
            }
            return inputNumber;
        }
    })
    .filter('seconds', function() {
        return function(input) {
            var inputNumber = parseInt(input);
            if (inputNumber > 59) {
                inputNumber = 59;
            }
            if (inputNumber < 10) {
                inputNumber = "0" + inputNumber;
            }
            return inputNumber;
        }
    });

app.controller('CountdownController', function ($scope) {

    $scope.countdownHoursView = "00";
    $scope.countdownMinutesView = "00";
    $scope.countdownSecondsView = "00";

    $scope.countdownHoursInitial = 0;
    $scope.countdownMinutesInitial = 0;
    $scope.countdownSecondsInitial = 0;

    $scope.countdownHours = 0;
    $scope.countdownMinutes = 0;
    $scope.countdownSeconds = 0;

    $scope.timerInitial = null;
    $scope.timerCurrent = null;
    $scope.timerInterval = null;

    $scope.playButton = $("#playButton");
    $scope.pauseButton = $("#pauseButton");
    $scope.resetButton = $("#resetButton");
    $scope.inputRow = $("#inputRow");
    $scope.pauseButton.hide();
    $scope.sound = new Audio('audio/dingdingding.mp3');

    $scope.updateCountdown = function() {
        $scope.countdownHours = $scope.timerCurrent.hours();
        $scope.countdownMinutes = $scope.timerCurrent.minutes();
        $scope.countdownSeconds = $scope.timerCurrent.seconds();
    };

    $scope.playSound = function() {
        $scope.sound.play();
    };

    $scope.startTimer = function() {
        if ($scope.timerCurrent != null) {
            $scope.inputRow.css('pointer-events', 'none');
            $scope.playButton.hide();
            $scope.pauseButton.show();
            $scope.timerInterval = setInterval(function () {
                $scope.timerCurrent.subtractSeconds(1);
                $scope.updateCountdown();
                $scope.$apply();
                if ($scope.timerCurrent.totalSeconds() <= 0) {
                    $scope.playSound();
                    $scope.pauseTimer();
                }
            }, 1000);
        }
    };

    $scope.pauseTimer = function() {
        clearInterval($scope.timerInterval);
        $scope.inputRow.css('pointer-events', 'auto');
        $scope.pauseButton.hide();
        $scope.playButton.show();
    };

    $scope.resetTimer = function() {
        $scope.pauseTimer();
        $scope.countdownHours = $scope.countdownHoursInitial;
        $scope.countdownMinutes = $scope.countdownMinutesInitial;
        $scope.countdownSeconds = $scope.countdownSecondsInitial;
        $scope.timerCurrent = new TimeSpan(0, $scope.countdownSecondsInitial, $scope.countdownMinutesInitial, $scope.countdownHoursInitial);
    };

    $scope.setHours = function (hours) {
        $scope.countdownHoursInitial = hours;
        $scope.resetTimer();
    };

    $scope.setMinutes = function (minutes) {
        $scope.countdownMinutesInitial = minutes;
        $scope.resetTimer();
    };

    $scope.setSeconds = function (seconds) {
        $scope.countdownSecondsInitial = seconds;
        $scope.resetTimer();
    };

    $scope.formatHours = function (input) {
        var inputNumber = parseInt(input)
        $scope.setHours(inputNumber);
        if (inputNumber < 10) {
            inputNumber = "0" + inputNumber;
        }
        $scope.countdownHoursView = inputNumber;
        return inputNumber;
    };

    $scope.formatMinutes = function (input) {
        var inputNumber = parseInt(input);
        if (inputNumber > 59) {
            inputNumber = 59;
        }
        $scope.setMinutes(inputNumber);
        if (inputNumber < 10) {
            inputNumber = "0" + inputNumber;
        }
        $scope.countdownMinutesView = inputNumber;
        return inputNumber;
    };

    $scope.formatSeconds = function (input) {
        var inputNumber = parseInt(input);
        if (inputNumber > 59) {
            inputNumber = 59;
        }
        $scope.setSeconds(inputNumber);
        if (inputNumber < 10) {
            inputNumber = "0" + inputNumber;
        }
        $scope.countdownSecondsView = inputNumber;
        return inputNumber;
    };
});

