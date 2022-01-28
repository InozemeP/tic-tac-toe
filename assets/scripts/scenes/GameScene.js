class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    };

    create() {
        this.id = 0;
        this.k = 2;
        this.values = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];
        this.createBackground();
        this.createCircles();
    }

    createBackground() {
        this.bg = this.add.sprite(0, 0, 'bg').setOrigin(0);
    };

    createCircles() {
        this.createOneCircle(config.width / 2 - 100, config.height / 2 - 100);
        this.createOneCircle(config.width / 2, config.height / 2 - 100);
        this.createOneCircle(config.width / 2 + 100, config.height / 2 - 100);

        this.createOneCircle(config.width / 2 - 100, config.height / 2);
        this.createOneCircle(config.width / 2, config.height / 2);
        this.createOneCircle(config.width / 2 + 100, config.height / 2);

        this.createOneCircle(config.width / 2 - 100, config.height / 2 + 100);
        this.createOneCircle(config.width / 2, config.height / 2 + 100);
        this.createOneCircle(config.width / 2 + 100, config.height / 2 + 100);
        this.input.on('gameobjectup', (pointer, gameObject) =>
        {
            gameObject.emit('gameobjectup', gameObject)
        });
    }

    createOneCircle(x, y) {
        this.regtangle = this.add.sprite(x, y, 'rg').setOrigin(0.5);
        this.regtangle.setInteractive();
        this.regtangle.on('gameobjectup', this.clickHandler, this);
        this.regtangle.id = this.id;
        this.id++;
    };

    clickHandler(gameObject) {

        if (this.k % 2 === 0) {
            this.values[gameObject.id] = 'X';
            this.crest = this.add.sprite(gameObject.x,gameObject.y ,'crest').setOrigin(0.5);
            this.k++;
            this.checkWin('CREST');
        }
        else {
            this.values[gameObject.id] = 'O';
            this.circle = this.add.sprite(gameObject.x,gameObject.y ,'circle').setOrigin(0.5);
            this.k++;
            this.checkWin('CIRCLE');
        }
    };

    checkWin(player) {
        if( this.values[0] === this.values[1] && this.values[0] === this.values[2] && this.values[0] !== 'N' ||
            this.values[3] === this.values[4] && this.values[3] === this.values[5] && this.values[3] !== 'N' ||
            this.values[6] === this.values[7] && this.values[6] === this.values[9] && this.values[6] !== 'N' ||
            this.values[0] === this.values[3] && this.values[0] === this.values[6] && this.values[0] !== 'N' ||
            this.values[1] === this.values[4] && this.values[1] === this.values[7] && this.values[1] !== 'N' ||
            this.values[2] === this.values[5] && this.values[2] === this.values[8] && this.values[2] !== 'N' ||
            this.values[0] === this.values[4] && this.values[0] === this.values[8] && this.values[0] !== 'N' ||
            this.values[2] === this.values[4] && this.values[2] === this.values[6] && this.values[2] !== 'N'
        ) {
            console.log(`${player} WIN!`);
            this.input.off('gameobjectup');
        } else if(!this.values.find((el) => el === "N" )){
            console.log('Draw!');
            this.input.off('gameobjectup');
        }
    }


    update() {
    };
}













