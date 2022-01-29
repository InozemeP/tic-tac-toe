class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }
    preload() {
        this.add.sprite(0, 0, 'bg').setOrigin(0);
    }
    create() {
        this.scene.start('Start');
    }
}