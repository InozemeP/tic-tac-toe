let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    scene: [BootScene, PreloadScene, StartScene, GameScene]
};

let game = new Phaser.Game(config);