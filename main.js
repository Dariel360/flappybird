var mainState = {
    preload: function() {
        game.load.image("bird", "assets/bird.png");
        game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() {
        game.stage.backgroundColor = "#10b3ca";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = game.add.sprite(100, 245, "bird");
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        this.pipes = game.add.group();
    },

  update: function() {
        if (this.bird.y < 0 || this.bird.y > 490){
        this.restartGame();
      }
    },
  jump: function() {
    this.bird.body.velocity.y = -350;
    },

  restartGame: function() {
    game.state.start('main');
    },
  addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    // Automatically kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
    },
};

var game = new Phaser.Game(400, 490);

game.state.add('main', mainState);

game.state.start('main');
