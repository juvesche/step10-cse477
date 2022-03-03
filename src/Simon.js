import * as $ from 'jquery';

export const Simon = function(sel) {
    const that = this;
    this.state = "initial";
    this.sequence = [];
    this.sequence.push(Math.floor(Math.random() * 4));
    this.current = 0;

    this.play = function() {
        this.state = "play";    // State is now playing
        this.current = 0;       // Starting with the first one


        this.playCurrent();
    }

    this.playCurrent = function() {
        var that = this;

        if(this.current < this.sequence.length) {
            var button = $(this.form.find("input").get(0));
            button.css("background-color", 'red');
            var button = $(this.form.find("input").get(1));
            button.css("background-color", 'green');
            var button = $(this.form.find("input").get(2));
            button.css("background-color", 'blue');
            var button = $(this.form.find("input").get(3));
            button.css("background-color", 'yellow');

            // We have one to play
            var colors = ['red', 'green', 'blue', 'yellow'];
            document.getElementById(colors[this.sequence[this.current]]).play();


            this.buttonOn(this.sequence[this.current]);
            this.current++;
            window.setTimeout(function() {
                that.playCurrent();
            }, 1000);
        } else {
            this.state = "enter";
            this.buttonOn(-1);
            this.current = 0;
        }
    }

    this.buttonOn = function(button) {
        for(var i = 0; i < 4; i++){
            if(button != i){
                var buttons = $(this.form.find("input").get(i));
                buttons.css("background-color", "lightgrey");
            }

        }
    }


    this.initialize = function() {
        console.log('Simon started');

        const div = $(sel);
        div.html(
            '<form>' +
            '<p>' +
            '<input type="button" value="Red">' +
            '<input type="button" value="Green">' +
            '<input type="button" value="Blue">' +
            '<input type="button" value="Yellow">' +
            '</p>' +
            '<p>' +
            '<input id="start" type="button" value="Start">' +
            '</p>' +
            '</form>' +
            '<audio id="red" src="audio/red.mp3" preload="auto"></audio>' +
            '<audio id="green" src="audio/green.mp3" preload="auto"></audio>' +
            '<audio id="blue" src="audio/blue.mp3" preload="auto"></audio>' +
            '<audio id="yellow" src="audio/yellow.mp3" preload="auto"></audio>' +
            '<audio id="buzzer" src="audio/buzzer.mp3" preload="auto"></audio>'
        );

        this.form = div.find('form');
        const start = this.form.find('#start');
        start.click(function(event) {
            that.onStart();
        });
    }

    this.onStart = function() {
        console.log('Start button pressed');

        const start = this.form.find('#start');
        start.remove();

        this.configureButton(0, "red");
        this.configureButton(1, "green");
        this.configureButton(2, "blue");
        this.configureButton(3, "yellow");

        this.play();
    }

    this.configureButton = function(ndx, color) {
        var button = $(this.form.find("input").get(ndx));
        var that = this;

        button.click(function(event) {
            if(that.state != "enter"){
                return;
            }
            that.buttonPress(ndx, color);

        });

        button.mousedown(function(event) {
            if(that.state != "enter"){
                return;
            }
            button.css("background-color", color);
        });

        button.mouseup(function(event) {
            button.css("background-color", "lightgrey");
        });
    }
    this.buttonPress = function(button, color) {
        var that = this;
        if(this.state === "play" || this.state === "initial"){
            return;
        }
        console.log("Button press: " + button);
        if(this.sequence[this.current] === button){
            this.current++;
            document.getElementById(color).currentTime = 0;
            document.getElementById(color).play();

            if(this.current === this.sequence.length){
                this.sequence.push(Math.floor(Math.random() * 4));
                this.state = "play";
                window.setTimeout(function() {
                    that.play();
                }, 1250);



            }

        }else{
            document.getElementById(color).currentTime = 0;
            document.getElementById("buzzer").play();
            this.state = "play";
            this.sequence = [];
            this.sequence.push(Math.floor(Math.random() * 4));
            this.current = 0;
            window.setTimeout(function() {
                that.play();
            }, 1250);
        }
    }


    // Ensure this is the last line of the function!
    this.initialize();
}