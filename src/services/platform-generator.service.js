class PlatformGenerator {
    constructor() {}

    get playerXVelocity() {
        return 160;
    }

    get playerYVelocity() {
        return 420;
    }

    createLevel(physics, _maxHeight, _maxWidth, numberOfPlatforms = 10) {
        let platforms = physics.add.staticGroup();
        platforms.create(_maxWidth * 0.5, _maxHeight, "ground");
        for (let index = 0; index < numberOfPlatforms; index++) {
            let randomX = this.randomPosition(_maxWidth, this.playerXVelocity);
            let randomY = this.randomPosition(_maxHeight, this.playerYVelocity);
            platforms.create(randomX, randomY, "ground");
        }
        platforms.children.entries.forEach(platform => {
            platform.body.checkCollision.down = false;
            platform.body.checkCollision.left = false;
            platform.body.checkCollision.right = false;
        });
        return platforms;
    }

    randomPosition(maxPosition, velocity) {
        return maxPosition * Math.random();
    }

}

export default PlatformGenerator;