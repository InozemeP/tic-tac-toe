class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        this.load.image('bg', 'assets/sprites/background.png');
        this.load.image('rс', 'assets/sprites/Reg.png');
        this.load.image('circle', 'assets/sprites/circle.png');
        this.load.image('crest', 'assets/sprites/crest.png');




    }
    create() {
        this.scene.start('Preload');
    }
}