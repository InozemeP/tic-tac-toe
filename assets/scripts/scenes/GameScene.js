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
        this.createRectangles();
    };

    createBackground() {
        this.bg = this.add.sprite(0, 0, 'bg').setOrigin(0);
        this.bg.depth = -2
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
        this.rectangle.depth = -1;
        this.rectangle.setInteractive();
        this.rectangle.on('gameobjectdown', this.clickHandler, this);
        this.rectangle.id = this.id;
        this.id++;
    };

    playerMove(gameObject, values){
        console.log(gameObject.id)
        if (values[gameObject.id] !== 'N') {

            return;
        }

        values[gameObject.id] = 'X';
        this.crest = this.add.sprite(gameObject.x,gameObject.y ,'crest').setOrigin(0.5);

    }

    clickHandler(gameObject) {
        if(this.count < 4 && this.values[gameObject.id] === 'N'){
            this.playerMove(gameObject, this.values);
            this.checkWin('CREST');
            if(!this.flag) {
                this.botMove(this.values, 8);
                this.checkWin('CIRCLE');
                this.count++;
            }
            if(! this.flag && this.count === 4) {
                this.destroy();
                this.id = 0;
                this.createNewRectangles();
                this.newValues = ['N', 'N', 'N', 'N', 'N', 'N', this.values[0], this.values[1], this.values[2], 'N', 'N', this.values[3], this.values[4], this.values[5], 'N', 'N', this.values[6], this.values[7], this.values[8], 'N', 'N', 'N', 'N', 'N', 'N'];
            }
        } else if(this.count === 4 && this.newValues[gameObject.id] === 'N') {
            this.playerMove(gameObject, this.newValues)
            this.newCheckWin('CREST', this.newValues)
            if(!this.flag) {
                this.botMove(this.newValues, 24);
                this.newCheckWin('CIRCLE', this.newValues)
                this.count++;
            }

        } else if(this.count > 4 && this.newValues[gameObject.id] === 'N') {
            this.playerMove(gameObject, this.newValues)
            this.newCheckWin('CREST', this.newValues)
            if(!this.flag) {
                this.botMove(this.newValues, 24);
                this.newCheckWin('CIRCLE', this.newValues)
                this.count++;
            }
        }

    };

    createNewRectangles() {
        this.createOneRectangle(config.width / 2 - 200, config.height / 2 - 200);
        this.createOneRectangle(config.width / 2 - 100, config.height / 2 - 200);
        this.createOneRectangle(config.width / 2, config.height / 2 - 200);
        this.createOneRectangle(config.width / 2 + 100, config.height / 2 - 200);
        this.createOneRectangle(config.width / 2 + 200, config.height / 2 - 200);

        this.createOneRectangle(config.width / 2 - 200, config.height / 2 - 100);
        this.createOneRectangle(config.width / 2 - 100, config.height / 2 - 100);
        this.createOneRectangle(config.width / 2, config.height / 2 - 100);
        this.createOneRectangle(config.width / 2 + 100, config.height / 2 - 100);
        this.createOneRectangle(config.width / 2 + 200, config.height / 2 - 100);

        this.createOneRectangle(config.width / 2 - 200, config.height / 2);
        this.createOneRectangle(config.width / 2 - 100, config.height / 2);
        this.createOneRectangle(config.width / 2, config.height / 2);
        this.createOneRectangle(config.width / 2 + 100, config.height / 2);
        this.createOneRectangle(config.width / 2 + 200, config.height / 2);

        this.createOneRectangle(config.width / 2 - 200, config.height / 2 + 100);
        this.createOneRectangle(config.width / 2 - 100, config.height / 2 + 100);
        this.createOneRectangle(config.width / 2, config.height / 2 + 100);
        this.createOneRectangle(config.width / 2 + 100, config.height / 2 + 100);
        this.createOneRectangle(config.width / 2 + 200, config.height / 2 + 100);

        this.createOneRectangle(config.width / 2 - 200, config.height / 2 + 200);
        this.createOneRectangle(config.width / 2 - 100, config.height / 2 + 200);
        this.createOneRectangle(config.width / 2, config.height / 2 + 200);
        this.createOneRectangle(config.width / 2 + 100, config.height / 2 + 200);
        this.createOneRectangle(config.width / 2 + 200, config.height / 2 + 200);
    };

    destroy() {
        for(let i = 0; i < this.values.length; i++){
            this.children.list.filter((el) => el.id === i)[0].destroy();
        }
    };

    botMove(values) {
        if(this.count === 1){
            if (values[4] === 'N') {
                values[4] = 'O';
                this.add.sprite(this.children.list.filter((el) => el.id === 4)[0].x, this.children.list.filter((el) => el.id === 4)[0].y, 'circle').setOrigin(0.5);
            }
            else if(values[this.k] === 'N') {
                values[this.k] = 'O';
                this.add.sprite(this.children.list.filter((el) => el.id === this.k)[0].x, this.children.list.filter((el) => el.id === this.k)[0].y, 'circle').setOrigin(0.5);
            }
        }
        else {
            if (this.tryZero(values) !== -1) {
                console.log(values)

                this.k = this.tryZero(values);
                values[this.k] = 'O';
                this.add.sprite(this.children.list.filter((el) => el.id === this.k)[0].x, this.children.list.filter((el) => el.id === this.k)[0].y, 'circle').setOrigin(0.5);
            } else if(this.stopCrest(values) !== -1){

                this.k = this.stopCrest(values);
                values[this.k] = 'O';
                console.log(values)

                this.add.sprite(this.children.list.filter((el) => el.id === this.k)[0].x, this.children.list.filter((el) => el.id === this.k)[0].y, 'circle').setOrigin(0.5);
            } else {
                console.log(values)
                this.getRandomPosition(values);
                values[this.k] = 'O';
                this.add.sprite(this.children.list.filter((el) => el.id === this.k)[0].x, this.children.list.filter((el) => el.id === this.k)[0].y, 'circle').setOrigin(0.5);
                console.log(values)

            }
        }
    };

    getRandomPosition(values) {
        this.arrOfIndex = [];
        values.forEach((el, index) => {
            if(el === 'N') {
                this.arrOfIndex.push(index);
            }
        })

        this.k = this.arrOfIndex[Phaser.Math.Between(0, this.arrOfIndex.length - 1)];
        console.log('k=' + this.k);
    };

    stopCrest(values) {
        for(let i = 0; i < values.length; i++) {
            if(values[i] === 'N') {
                values[i] = 'X';
                if(this.checkWinBefore(values)){
                    values[i] = 'N'
                    return i;
                } else{
                    values[i] = 'N'
                }
            }
        }
        return -1;
    };

    tryZero(values) {

        for(let i = 0; i < values.length; i++) {
            if(values[i] === 'N') {
                values[i] = 'O';
                if(this.checkWinBefore(values)){
                    values[i] = 'N'
                    return i;
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
            )
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

                values[0] === values[6] && values[6] === values[12] && values[12] === values[18] && values[18] === values[24] && values[0] !== 'N' ||
                values[4] === values[8] && values[8] === values[12] && values[12] === values[16] && values[16] === values[20] && values[4] !== 'N'
            )
        }
    };


    checkWin(player) {
        if(
            this.values[0] === this.values[1] && this.values[0] === this.values[2] && this.values[0] !== 'N' ||
            this.values[3] === this.values[4] && this.values[3] === this.values[5] && this.values[3] !== 'N' ||
            this.values[6] === this.values[7] && this.values[6] === this.values[8] && this.values[6] !== 'N' ||
            this.values[0] === this.values[3] && this.values[0] === this.values[6] && this.values[0] !== 'N' ||
            this.values[1] === this.values[4] && this.values[1] === this.values[7] && this.values[1] !== 'N' ||
            this.values[2] === this.values[5] && this.values[2] === this.values[8] && this.values[2] !== 'N' ||
            this.values[0] === this.values[4] && this.values[0] === this.values[8] && this.values[0] !== 'N' ||
            this.values[2] === this.values[4] && this.values[2] === this.values[6] && this.values[2] !== 'N'
        ) {
            this.createAlpha();

            this.flag = true;
            this.add.text(600, 75, `${player} WIN!`, {
                font: '60px Boby',
                fill: '#FFFFFF'
            }).setOrigin(0.5);
            this.input.off('gameobjectdown');


            this.add.text(600, 520, 'Tap to restart', {
                font: '60px Boby',
                fill: '#FFFFFF'
            }).setOrigin(0.5);

            this.setRestart();

        } else if(!this.values.find((el) => el === "N" )) {
            this.createAlpha();

            this.flag = true;
            this.add.text(600, 75, 'DRAW!', {
                font: '60px Boby',
                fill: '#FFFFFF'
            }).setOrigin(0.5);

            this.input.off('gameobjectdown');

            this.add.text(600, 520, 'Tap to restart', {
                font: '60px Boby',
                fill: '#FFFFFF'
            }).setOrigin(0.5);

            this.setRestart();
        }
    };

    newCheckWin(player, values) {
        if(
            values[0] === values[1] && values[1] === values[2] && values[2] === values[3] && values[3] === values[4] && values[0] !== 'N' ||
            values[5] === values[6] && values[6] === values[7] && values[7] === values[8] && values[8] === values[9] && values[5] !== 'N' ||
            values[10] === values[11] && values[11] === values[12] && values[12] === values[13] && values[13] === values[14] && values[10] !== 'N' ||
            values[15] === values[16] && values[16] === values[17] && values[17] === values[18] && values[18] === values[19] && values[15] !== 'N' ||
            values[20] === values[21] && values[21] === values[22] && values[22] === values[23] && values[23] === values[24] && values[20] !== 'N' ||

            values[0] === values[5] && values[5] === values[10] && values[10] === values[15] && values[15] === values[20] && values[0] !== 'N' ||
            values[1] === values[6] && values[6] === values[11] && values[11] === values[16] && values[16] === values[21] && values[1] !== 'N' ||
            values[2] === values[7] && values[7] === values[12] && values[12] === values[17] && values[17] === values[22] && values[2] !== 'N' ||
            values[3] === values[8] && values[8] === values[13] && values[13] === values[18] && values[18] === values[23] && values[3] !== 'N' ||

            values[0] === values[6] && values[6] === values[12] && values[12] === values[18] && values[18] === values[24] && values[0] !== 'N' ||
            values[4] === values[8] && values[8] === values[12] && values[12] === values[16] && values[16] === values[20] && values[4] !== 'N'

        ) {
            this.createAlpha();
            this.flag = true;
            this.add.text(600, 75, `${player} WIN!`, {
                font: '60px Boby',
                fill: '#000000'
            }).setOrigin(0.5);
            this.input.off('gameobjectdown');


            this.add.text(600, 520, 'Tap to restart', {
                font: '60px Boby',
                fill: '#ffffff'
            }).setOrigin(0.5);

            this.setRestart();

        } else if(!values.find((el) => el === "N" )) {
            this.createAlpha();

            this.flag = true;
            this.add.text(600, 75, 'DRAW!', {
                font: '60px Boby',
                fill: '#ffffff'
            }).setOrigin(0.5);

            this.input.off('gameobjectdown');

            this.add.text(600, 520, 'Tap to restart', {
                font: '60px Boby',
                fill: '#ffffff'
            }).setOrigin(0.5);

            this.setRestart();
        }
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
         this.gr.alpha = 0.5
     };




}













