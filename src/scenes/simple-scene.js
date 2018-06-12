export class SimpleScene extends Phaser.Scene {

    preload() {
        this.load.image('bomb', 'assets/bomb.png');
    }

    create() {
      this.add.text(100, 100, 'Hello Phaser! Look out of the bomb!', { fill: '#0f0' });
      this.add.image(100, 200, 'bomb');
    }
  }
