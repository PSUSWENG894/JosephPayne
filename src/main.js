
import 'phaser';

import {
    SimpleScene
} from './scenes/simple-scene';

const gameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
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