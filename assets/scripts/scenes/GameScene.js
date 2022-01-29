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

        this.values[gameObject.id] = 'X';
        this.crest = this.add.sprite(gameObject.x,gameObject.y ,'crest').setOrigin(0.5);
        this.checkWin('CREST');
        if(!this.flag) {
            this.botMove();
            this.checkWin('CIRCLE');
            this.count++;
        }
    };

    botMove() {
        if(this.count === 1){
            if (this.values[4] === 'N') {
                this.values[4] = 'O';
                this.add.sprite(this.children.list[5].x, this.children.list[5].y, 'circle').setOrigin(0.5);
            }
            else if(this.values[this.k] === 'N') {
                this.values[this.k] = 'O';
                this.add.sprite(this.children.list[this.k + 1].x, this.children.list[this.k + 1].y, 'circle').setOrigin(0.5);
            }
        }
        else {
            if (this.tryZero() !== -1) {
                this.k = this.tryZero();
                this.values[this.k] = 'O';
                this.add.sprite(this.children.list[this.k + 1].x, this.children.list[this.k + 1].y, 'circle').setOrigin(0.5);
            } else if(this.stopCrest() !== -1){

                this.k = this.stopCrest();
                this.values[this.k] = 'O';
                this.add.sprite(this.children.list[this.k + 1].x, this.children.list[this.k + 1].y, 'circle').setOrigin(0.5);
            } else {
                this.getRandomPosition();
                this.values[this.k] = 'O';
                this.add.sprite(this.children.list[this.k + 1].x, this.children.list[this.k + 1].y, 'circle').setOrigin(0.5);
            }


        }
    };

    getRandomPosition() {
        this.k = Phaser.Math.Between(0, 8);
        if(this.values[this.k] === 'O' || this.values[this.k] === 'X' ) {
            this.getRandomPosition();
        }
    };

    stopCrest() {
        for(let i = 0; i < this.values.length; i++) {
            if(this.values[i] === 'N') {
                this.values[i] = 'X';
                if(this.checkWinBefore()){
                    this.values[i] = 'N'
                    return i;
                } else{
                    this.values[i] = 'N'
                }
            }
        }
        return -1;
    };

    tryZero() {
        for(let i = 0; i < this.values.length; i++) {
            if(this.values[i] === 'N') {
                this.values[i] = 'O';
                if(this.checkWinBefore()){
                    this.values[i] = 'N'
                    return i;
                } else{
                    this.values[i] = 'N'
                }
            }
        }
        return -1;
    };

    checkWinBefore() {
        return (this.values[0] === this.values[1] && this.values[0] === this.values[2] && this.values[0] !== 'N' ||
            this.values[3] === this.values[4] && this.values[3] === this.values[5] && this.values[3] !== 'N' ||
            this.values[6] === this.values[7] && this.values[6] === this.values[8] && this.values[6] !== 'N' ||
            this.values[0] === this.values[3] && this.values[0] === this.values[6] && this.values[0] !== 'N' ||
            this.values[1] === this.values[4] && this.values[1] === this.values[7] && this.values[1] !== 'N' ||
            this.values[2] === this.values[5] && this.values[2] === this.values[8] && this.values[2] !== 'N' ||
            this.values[0] === this.values[4] && this.values[0] === this.values[8] && this.values[0] !== 'N' ||
            this.values[2] === this.values[4] && this.values[2] === this.values[6] && this.values[2] !== 'N')
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




}













