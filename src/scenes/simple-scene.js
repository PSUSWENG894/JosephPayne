export class SimpleScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: "SimpleScene"
    });
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    const maxHeight = this.cache.game.canvas.height;
    const maxWidth = this.cache.game.canvas.width;
    this.platforms = this.physics.add.staticGroup();
    this.platforms.maxSize = maxWidth;
    this.platforms.create(maxWidth * 0.5, maxHeight, "ground");

    this.player = this.physics.add.sprite(100, 450, "dude");
    this.player.setBounce(0.02);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [
        {
          key: "dude",
          frame: 4
        }
      ],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: {
        x: 12,
        y: 0,
        stepX: 70
      }
    });

    this.stars.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.bombs = this.physics.add.group();
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000"
    });
    this.score = 0;

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  update() {
    if (this.gameOver) {
      this.resetBombs();
      this.resetStars();
      this.player.setRandomPosition();
      this.player.anims.play("turn");
      this.physics.resume();
      this.gameOver = false;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("turn");
    }

    if (
      this.cursors.up.isDown &&
      (this.player.body.blocked.down || this.player.body.touching.down)
    ) {
      this.player.setVelocityY(-420);
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText(`Score ${this.score}`);
    this.addBombs(
      this.stars.children.entries.filter(x => x.active !== true).length
    );
    if (this.stars.countActive(true) < 5) {
      this.resetStars();
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play("turn");
    this.gameOver = true;
  }

  addBombs(starCount) {
    let inactiveStarCountToDropBombs = 4;
    if (isNaN(starCount) || starCount >= inactiveStarCountToDropBombs) {
      let x =
        this.player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      let bomb = this.bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  resetStars() {
    this.stars.children.iterate(child => {
      child.enableBody(true, child.x, 0, true, true);
    });
  }

  resetBombs() {
    this.bombs.children.iterate(child => {
      child.disableBody(true, child.x, 0, true, true);
    });
  }
}
