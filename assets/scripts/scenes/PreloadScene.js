class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    };

    preload() {
        this.add.sprite(0, 0, 'bg').setOrigin(0);

        this.load.image('rс', 'assets/sprites/Reg.png');
        this.load.image('circle', 'assets/sprites/circle.png');
        this.load.image('crest', 'assets/sprites/crest.png');
    };

    create() {
        this.scene.start('Start');
    }''
}