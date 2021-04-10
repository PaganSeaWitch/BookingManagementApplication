import React, { useState, useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'



class MainScene extends Phaser.Scene {

    
    preload() {
        this.load.image('sky', './assets/sky.png');
        this.load.image('ground', './assets/platform.png');
        this.load.image('star', './assets/star.png');
        this.load.image('bomb', './assets/bomb.png');
        this.load.spritesheet('dude', './assets/dude.png',{ frameWidth: 32, frameHeight: 48 });
    }
    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            this.bomb = this.bombs.create(x, 16, 'bomb');
            this.bomb.setBounce(1);
            this.bomb.setCollideWorldBounds(true);
            this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    hitBomb(player, bombs) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }

    create() {
        this.add.image(400, 300, 'sky');
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.platforms = this.physics.add.staticGroup();
        this.player = this.physics.add.sprite(50, 450, 'dude');
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
    }
    update() {
        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}

const  gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: MainScene
};


export default function Test() {
    const gameRef = useRef(null)
    const [game, setGame] = useState()
    const [initialize, setInitialize] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const destroy = () => {
        gameRef.current.destroy()
        setInitialize(false)
        setGame(undefined)
    }
    
    useEffect(() => {
        window.addEventListener("load", function () {
            setLoaded(true)
        }, false); 
        window.addEventListener("resize", function () {
            setGame(gameConfig)
        }, false); 
    }, [])


    
    useEffect(() => {
        
        setGame(gameConfig)
        

    }, [initialize])

    return (
        <div>
            <IonPhaser ref={gameRef} game={game} initialize={initialize} />
            {(loaded == true && initialize == false) ? <div onClick={() => setInitialize(true)} className="flex">
                <button className="bttn">Initialize</button>
            </div>: <div> </div>
                    
                        

                    
                }
           

            

        </div>
    );
}