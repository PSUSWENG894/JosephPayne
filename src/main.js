import 'phaser';

import {
    SimpleScene
} from './scenes/simple-scene';

const gameConfig = {
    type: Phaser.AUTO,
    width: 680,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false
        }
    },
    scene: SimpleScene
};

new Phaser.Game(gameConfig);