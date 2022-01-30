class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    };

    create() {
        this.flag = false;
        this.id = 0;
        this.count = 1;
        this.random();
        this.values = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];
        this.createBackground();
        this.createRectangles3x3();
        this.createEvent();
    };

    createBackground() {
        this.bg = this.add.sprite(0, 0, 'bg').setOrigin(0);
        this.bg.depth = -2
    };

    createOneRectangle(x, y) {
        this.rectangle = this.add.sprite(x, y, 'rс').setOrigin(0.5);
        this.rectangle.depth = -1;
        this.rectangle.setInteractive();
        this.rectangle.on('gameobjectdown', this.clickHandler, this);
        this.rectangle.id = this.id;
        this.id++;
    };

    createRectangles3x3() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.createOneRectangle(config.width / 2 + 100 * j - 100, config.height / 2 + 100 * i - 100)
            }
        }
    };

    createRectangles5x5() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.createOneRectangle(config.width / 2 + 100 * j - 200, config.height / 2 + 100 * i - 200)
            }
        }
    };

    move(gameObject, values) {
        this.playerMove(gameObject, values);
        this.checkWin('CREST', values);
        if(!this.flag) {
            this.botMove(values);
            this.checkWin('CIRCLE', values);
            this.count++;
        }
    };

    playerMove(gameObject, values){
        values[gameObject.id] = 'X';
        this.crest = this.add.sprite(gameObject.x,gameObject.y ,'crest').setOrigin(0.5);

    };

    botMove(values) {
        if(this.count === 1){
            if (values[4] === 'N') {
                this.addCircleSprite(values, 4);
            } else if(values[this.k] === 'N') {
                this.addCircleSprite(values, this.k);
            }
        }
        else {
            if (this.findBotPosition(values, 'O') !== -1) {
                this.addCircleSprite(values, this.k);

            } else if(this.findBotPosition(values, 'X') !== -1){
                this.addCircleSprite(values, this.k);

            } else {
                this.getRandomPosition(values);
                this.addCircleSprite(values, this.k);
            }
        }
    };

    clickHandler(gameObject) {
        if(this.values?.[gameObject.id] !== 'N' && this.count < 4) return;
        if(this.newValues?.[gameObject.id] !== 'N' && this.count >= 4) return;

        this.move(gameObject,this.count < 4 ? this.values : this.newValues);

        if(!this.flag && this.count === 4) {
            this.destroy();
            this.id = 0;
            this.createRectangles5x5();
            this.newValues = [
                'N', 'N', 'N', 'N', 'N',
                'N', this.values[0], this.values[1], this.values[2], 'N',
                'N', this.values[3], this.values[4], this.values[5], 'N',
                'N', this.values[6], this.values[7], this.values[8], 'N',
                'N', 'N', 'N', 'N', 'N'
            ];
        }
    };

    destroy() {
        for(let i = 0; i < this.values.length; i++){
            this.children.list.filter((el) => el.id === i)[0].destroy();
        }
    };

    addCircleSprite(values, k) {
        values[k] = 'O';
        this.add.sprite(this.children.list.filter((el) => el.id === k)[0].x, this.children.list.filter((el) => el.id === k)[0].y, 'circle').setOrigin(0.5);
    };

    getRandomPosition(values) {
        this.arrOfIndex = [];
        values.forEach((el, index) => {
            if(el === 'N') {
                this.arrOfIndex.push(index);
            }
        });
        this.k = this.arrOfIndex[Phaser.Math.Between(0, this.arrOfIndex.length - 1)];
    };

    findBotPosition(values, param) {
        for(let i = 0; i < values.length; i++) {
            if(values[i] === 'N') {
                values[i] = param;
                if(this.checkWinBefore(values)){
                    values[i] = 'N'
                    return this.k = i;
                } else{
                    values[i] = 'N'
                }
            }
        }
        return -1;
    };

    checkWinBefore(values) {
        if (values.length < 10) {
            return (
                values[0] === values[1] && values[0] === values[2] && values[0] !== 'N' ||
                values[3] === values[4] && values[3] === values[5] && values[3] !== 'N' ||
                values[6] === values[7] && values[6] === values[8] && values[6] !== 'N' ||
                values[0] === values[3] && values[0] === values[6] && values[0] !== 'N' ||
                values[1] === values[4] && values[1] === values[7] && values[1] !== 'N' ||
                values[2] === values[5] && values[2] === values[8] && values[2] !== 'N' ||
                values[0] === values[4] && values[0] === values[8] && values[0] !== 'N' ||
                values[2] === values[4] && values[2] === values[6] && values[2] !== 'N'
            );
        }
        else {
            return (
                values[0] === values[1] && values[1] === values[2] && values[2] === values[3] && values[3] === values[4] && values[0] !== 'N' ||
                values[5] === values[6] && values[6] === values[7] && values[7] === values[8] && values[8] === values[9] && values[5] !== 'N' ||
                values[10] === values[11] && values[11] === values[12] && values[12] === values[13] && values[13] === values[14] && values[10] !== 'N' ||
                values[15] === values[16] && values[16] === values[17] && values[17] === values[18] && values[18] === values[19] && values[15] !== 'N' ||
                values[20] === values[21] && values[21] === values[22] && values[22] === values[23] && values[23] === values[24] && values[20] !== 'N' ||

                values[0] === values[5] && values[5] === values[10] && values[10] === values[15] && values[15] === values[20] && values[0] !== 'N' ||
                values[1] === values[6] && values[6] === values[11] && values[11] === values[16] && values[16] === values[21] && values[1] !== 'N' ||
                values[2] === values[7] && values[7] === values[12] && values[12] === values[17] && values[17] === values[22] && values[2] !== 'N' ||
                values[3] === values[8] && values[8] === values[13] && values[13] === values[18] && values[18] === values[23] && values[3] !== 'N' ||
                values[4] === values[9] && values[9] === values[14] && values[14] === values[19] && values[19] === values[24] && values[4] !== 'N' ||


                values[0] === values[6] && values[6] === values[12] && values[12] === values[18] && values[18] === values[24] && values[0] !== 'N' ||
                values[4] === values[8] && values[8] === values[12] && values[12] === values[16] && values[16] === values[20] && values[4] !== 'N'
            );
        }
    };

    checkWin(player, values) {
        if(this.checkWinBefore(values)) {
            this.gameOver();

            this.createTextWinPlayer(player);
            this.createTextTapToRestart();

            this.setRestart();

        } else if(!values.find((el) => el === "N" )) {
            this.gameOver();

            this.createTextDraw();
            this.createTextTapToRestart();

            this.setRestart();
        }
    };

    gameOver() {
        this.createAlpha();

        this.flag = true;
        this.input.off('gameobjectdown');
    };

    setRestart() {
        this.time.delayedCall(0, () => {
            this.input.on('pointerdown', () => {
                this.scene.start('Game');
            });
        });
    };

    random() {
         this.k = Phaser.Math.Between(0, 8)
          if(this.k === 4) {
              this.random();
          }
          else {
              return this.k;
          }
     };

    createAlpha() {
         this.gr = this.add.graphics();
         this.gr.fillStyle(0x00000, 1.0);
         this.gr.fillRect(0, 0, config.width, config.height);
         this.gr.alpha = 0.8;
    };

    createTextTapToRestart() {
        this.add.text(600, 520, 'Tap to restart', {
            font: '60px Boby',
            fill: '#FFFFFF'
        }).setOrigin(0.5);
    };

    createTextWinPlayer(player) {
        this.add.text(600, 75, `${player} WIN!`, {
            font: '60px Boby',
            fill: '#ffffff'
        }).setOrigin(0.5);
    };

    createTextDraw() {
        this.add.text(600, 75, 'DRAW!', {
            font: '60px Boby',
            fill: '#ffffff'
        }).setOrigin(0.5);
    };

    createEvent() {
        this.input.on('gameobjectdown', (pointer, gameObject) =>
        {
            gameObject.emit('gameobjectdown', gameObject);
        });
    };
}













