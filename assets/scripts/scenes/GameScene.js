class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    };

    create() {
        this.id = 0;
        this.k = 2;
        this.values = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];
        this.createBackground();
        this.createRectangles();
        this.createText();
        this.createChoiceImage();
    };

    createBackground() {
        this.bg = this.add.sprite(0, 0, 'bg').setOrigin(0);
    };

    createRectangles() {
        this.createOneRectangle(config.width / 2 - 100, config.height / 2 - 100);
        this.createOneRectangle(config.width / 2, config.height / 2 - 100);
        this.createOneRectangle(config.width / 2 + 100, config.height / 2 - 100);

        this.createOneRectangle(config.width / 2 - 100, config.height / 2);
        this.createOneRectangle(config.width / 2, config.height / 2);
        this.createOneRectangle(config.width / 2 + 100, config.height / 2);

        this.createOneRectangle(config.width / 2 - 100, config.height / 2 + 100);
        this.createOneRectangle(config.width / 2, config.height / 2 + 100);
        this.createOneRectangle(config.width / 2 + 100, config.height / 2 + 100);
        this.input.on('gameobjectdown', (pointer, gameObject) =>
        {
            gameObject.emit('gameobjectdown', gameObject);
        });
    };

    createOneRectangle(x, y) {
        this.rectangle = this.add.sprite(x, y, 'rс').setOrigin(0.5);
        this.rectangle.setInteractive();
        this.rectangle.on('gameobjectdown', this.clickHandler, this);
        this.rectangle.id = this.id;
        this.id++;
    };

    clickHandler(gameObject) {
        if (this.values[gameObject.id] !== 'N') {
            return;
        }

        if (this.k % 2 === 0)  {
            this.values[gameObject.id] = 'X';
            this.crest = this.add.sprite(gameObject.x,gameObject.y ,'crest').setOrigin(0.5);
            this.k++;
            this.choiceCircle.visible = true;
            this.choiceCrest.visible = false;
            this.checkWin('CREST');
        }
        else {
            this.values[gameObject.id] = 'O';
            this.circle = this.add.sprite(gameObject.x,gameObject.y ,'circle').setOrigin(0.5);
            this.k++;
            this.choiceCircle.visible = false;
            this.choiceCrest.visible = true;
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
             this.add.text(600, 75, `${player} WIN!`, {
                font: '60px Boby',
                fill: '#FFFFFF'
            }).setOrigin(0.5);
            this.input.off('gameobjectdown');

            this.text.setText('');
            this.choiceCrest.visible = false;
            this.choiceCircle.visible = false;

            this.add.text(600, 520, 'Tap to restart', {
                font: '60px Boby',
                fill: '#FFFFFF'
            }).setOrigin(0.5);
            this.setRestart();


        } else if(!this.values.find((el) => el === "N" )){

            this.add.text(600, 525, 'DROW!', {
                font: '60px Boby',
                fill: '#FFFFFF'
            }).setOrigin(0.5);

            this.input.off('gameobjectdown');

            this.text.setText('');
            this.choiceCrest.visible = false;
            this.choiceCircle.visible = false;

            this.add.text(600, 520, 'Tap to restart', {
                font: '60px Boby',
                fill: '#FFFFFF'
            }).setOrigin(0.5);
            this.setRestart();
        }
    };

    createText() {
         this.text = this.add.text(700, 30, 'choice:', {
            font: '40px Boby',
            fill: '#FFFFFF'
        });
    };

    setRestart() {
        this.time.delayedCall(0, () => {
            this.input.on('pointerdown', () => {
                this.scene.start('Game');
            });
        });

    };

    createChoiceImage() {
        this.choiceCrest = this.add.sprite(1000, 0, 'crest').setOrigin(0);
        this.choiceCircle = this.add.sprite(1008, 7, 'circle').setOrigin(0);
        this.choiceCircle.visible = false;
    };


}













