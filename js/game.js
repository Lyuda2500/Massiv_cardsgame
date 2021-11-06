//var crd = [];
//var placehold = [];
//var shirt = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    var j = getRandomInt(arr.length);
    var k = getRandomInt(arr.length);
    var t = arr[j];
    arr[j] = arr[k];
    arr[k] = t;
  }
  return arr;
}
function red(cart) {
  //proverka na mast
  if (cart.includes('clubs') || cart.includes('spades')) return 'black';

  if (cart.includes('diamond') || cart.includes('hearts')) return 'red';
}

var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function BootScene() {
    Phaser.Scene.call(this, { key: 'BootScene' });
  },

  preload: function () {
    // здесь будет загрузка ресурсов

    this.load.atlas(
      'placeholder',
      'assets/cards/placeholder.png',
      'assets/cards/placeholder_atlas.json',
    );
    this.load.atlas(
      'card_shirt',
      'assets/cards/card_shirt.png',
      'assets/cards/card_shirt_atlas.json',
    );
    this.load.atlas(
      'cards',
      'assets/cards/cards.png',
      'assets/cards/cards_atlas.json',
    );
  },

  create: function () {
    this.scene.start('WorldScene');
  },
});

var WorldScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function WorldScene() {
    Phaser.Scene.call(this, { key: 'WorldScene' });
  },

  preload: function () {},

  create: function () {
    // здесь мы создадим сцену мира
    this.crd = []; //massiv nazvanij kart
    this.deck = []; //
    this.game_crd = []; //
    this.shirt = []; //rubashka
    this.placehold = []; //placeholdery (cells)
    //sem osnovnyh mest
    this.deck1 = [];
    this.deck2 = [];
    this.deck3 = [];
    this.deck4 = [];
    this.deck5 = [];
    this.deck6 = [];
    this.deck7 = [];
    //card names
    this.name1 = [];
    this.name2 = [];
    this.name3 = [];
    this.name4 = [];
    this.name5 = [];
    this.name6 = [];
    this.name7 = [];

    var x = 100;
    var y = 150;
    var xx = 100;
    var yy = 378;

    this.coef = 0.8;
    this.width_card = 142;

    /*for(var i=0;i<7;i++) {
              var j = i+2;
              this.crd.push(this.add.sprite(x, 100, 'cards', 'hearts_'+ j));
              this.crd[i].scale = 0.9;
              this.crd[i].setInteractive();
              x += this.crd[i].width * 0.9 + 5;          
           }*/

    //placeholders
    this.placehold.push(
      this.add.sprite(100, 150, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(260, 150, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(580, 150, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(740, 150, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(900, 150, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(1060, 150, 'placeholder', 'placeholder'),
    );

    this.placehold.push(
      this.add.sprite(100, 378, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(260, 378, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(420, 378, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(580, 378, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(740, 378, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(900, 378, 'placeholder', 'placeholder'),
    );
    this.placehold.push(
      this.add.sprite(1060, 378, 'placeholder', 'placeholder'),
    );

    //vykladka rubashki
    this.shirt.push(this.add.sprite(100, 150, 'card_shirt', 'card_shirt'));
    this.shirt[0].setDepth(52);

    //predvaritelnoe napolnenie massiva nazvanij kart
    for (var i = 1; i <= 13; i++) {
      this.crd.push('clubs_' + i);
      this.crd.push('diamond_' + i);
      this.crd.push('hearts_' + i);
      this.crd.push('spades_' + i);
    }
    /*
            this.loadSuit({ suit: 'clubs', x: 100, y: 150, target: this.crd });
            this.loadSuit({ suit: 'spades', x: 100, y: 150, target: this.crd });
            this.loadSuit({ suit: 'diamond', x: 100, y: 150, target: this.crd });
            this.loadSuit({ suit: 'hearts', x: 100, y: 150, target: this.crd });*/

    //peremeshivanie
    this.crd = shuffle(this.crd);

    // vykladka po kolonkam
    let k = 0;
    for (let j = 0; j < 7; j++) {
      //perehod po placeholderam
      let u = 0;
      for (let i = 0; i < j + 1; i++) {
        //vykladka kart po placeholderam
        //console.log("crd = " + this.crd[this.crd.length-1]);
        if (j == 0) {
          this.name1[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck1[u] = this.add.sprite(xx, yy, 'cards', this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          this.deck1[u].setInteractive();
        }
        if (j == 1) {
          this.name2[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck2[u] = this.add.sprite(xx, yy, 'cards', this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck2[u].setInteractive();
          else
            this.shirt[k + 1] = this.add.sprite(
              xx,
              yy,
              'card_shirt',
              'card_shirt',
            ); //vykladka rubashek
          u++;
        }
        if (j == 2) {
          this.name3[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck3[u] = this.add.sprite(xx, yy, 'cards', this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck3[u].setInteractive();
          else
            this.shirt[k + 1] = this.add.sprite(
              xx,
              yy,
              'card_shirt',
              'card_shirt',
            ); //vykladka rubashek
          u++;
        }
        if (j == 3) {
          this.name4[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck4[u] = this.add.sprite(xx, yy, 'cards', this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck4[u].setInteractive();
          else
            this.shirt[k + 1] = this.add.sprite(
              xx,
              yy,
              'card_shirt',
              'card_shirt',
            ); //vykladka rubashek
          u++;
        }
        if (j == 4) {
          this.name5[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck5[u] = this.add.sprite(xx, yy, 'cards', this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck5[u].setInteractive();
          else
            this.shirt[k + 1] = this.add.sprite(
              xx,
              yy,
              'card_shirt',
              'card_shirt',
            ); //vykladka rubashek
          u++;
        }
        if (j == 5) {
          this.name6[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck6[u] = this.add.sprite(xx, yy, 'cards', this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck6[u].setInteractive();
          else
            this.shirt[k + 1] = this.add.sprite(
              xx,
              yy,
              'card_shirt',
              'card_shirt',
            ); //vykladka rubashek
          u++;
        }
        if (j == 6) {
          this.name7[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck7[u] = this.add.sprite(xx, yy, 'cards', this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck7[u].setInteractive();
          else
            this.shirt[k + 1] = this.add.sprite(
              xx,
              yy,
              'card_shirt',
              'card_shirt',
            ); //vykladka rubashek
          u++;
        }

        yy += 30; //smeshchenie po y
        //console.log("deck = " + this.deck[k]);
        k = k + 1; //index kart v igre
      }
      xx += this.width_card + 18; //peremeschenie na sledujuschij placeholder
      yy = 378; //vozvrat pozicii y na placeholder
    }

    this.input.on('pointerdown', this.startDrag, this);
  },

  startDrag(pointer, targets) {
    this.dragObj = targets[0];
    this.name_card = 'null';
    //this.red = null; // false - black, true - red
    if (this.dragObj instanceof Phaser.GameObjects.Sprite) {
      this.input.off('pointerdown', this.startDrag, this);

      //this.scene.bringToTop(this.dragObj);
      //game.scene.bringToTop(this.dragObj);

      this.xstart = this.dragObj.x;
      this.ystart = this.dragObj.y;

      this.dragObj.setDepth(54);

      if (this.xstart == 100) {
        this.name_card = this.name1[this.name1.length - 1];
      }
      if (this.xstart == 260) {
        this.name_card = this.name2[this.name2.length - 1];
      }
      if (this.xstart == 420) {
        this.name_card = this.name3[this.name3.length - 1];
      }
      if (this.xstart == 580) {
        this.name_card = this.name4[this.name4.length - 1];
      }
      if (this.xstart == 740) {
        this.name_card = this.name5[this.name5.length - 1];
      }
      if (this.xstart == 900) {
        this.name_card = this.name6[this.name6.length - 1];
      }
      if (this.xstart == 1060) {
        this.name_card = this.name7[this.name7.length - 1];
      }

      console.log('Pos.X - ' + this.xstart);
      console.log('Name - ' + this.name_card);
      console.log('red - ' + red(this.name_card));

      this.input.on('pointermove', this.doDrag, this);
      this.input.on('pointerup', this.stopDrag, this);
      //this.dragObj.
    }
  },

  doDrag(pointer) {
    this.dragObj.x = pointer.x;
    this.dragObj.y = pointer.y;
  },

  stopDrag(pointer) {
    // function, kotoraja vypolnyaetcya, kogda otpuskaesh knopku myshy pri peretaskivanii
    this.input.on('pointerdown', this.startDrag, this);
    this.input.off('pointermove', this.doDrag, this);
    this.input.off('pointerup', this.stopDrag, this);
    this.dragObj.setDepth(53);
    /*
    100 180
    260 340
    420 600
    580 760
    740
    900
    1060
    */
    if (pointer.y < 378) {
      this.dragObj.x = this.xstart;
      this.dragObj.y = this.ystart;
    } else {
      if (pointer.x < 180) {
        if (red(this.name1[this.name1.length - 1]) != red(this.name_card)) {
          /*this.deck1[this.name1.length] = this.add.sprite(
            100,
            378,
            "cards",
            this..pop()
          ); //! .pop() zabiraet kartu iz kolody*/
          this.dragObj.x = 100;
          this.dragObj.y = 378;
        } else {
          this.dragObj.x = this.xstart;
          this.dragObj.y = this.ystart;
        }
      }
      if (pointer.x > 179 && pointer.x < 340) {
        if (red(this.name2[this.name2.length - 1]) != red(this.name_card)) {
          this.dragObj.x = 260;
          this.dragObj.y = 378;
        } else {
          this.dragObj.x = this.xstart;
          this.dragObj.y = this.ystart;
        }
      }
    }

    /*switch (true) {
        //vlevo
        case pointer.x < this.xstart - 880:
          if (pointer.x < 180) {
            this.dragObj.x = 100;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart - 960;
          this.dragObj.y = 378;
          break;
        case pointer.x < this.xstart - 720:
          if (pointer.x < 180) {
            this.dragObj.x = 100;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart - 800;
          this.dragObj.y = 378;
          break;
        case pointer.x < this.xstart - 560:
          if (pointer.x < 180) {
            this.dragObj.x = 100;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart - 640;
          this.dragObj.y = 378;
          break;
        case pointer.x < this.xstart - 400:
          if (pointer.x < 180) {
            this.dragObj.x = 100;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart - 480;
          this.dragObj.y = 378;
          break;
        case pointer.x < this.xstart - 240:
          if (pointer.x < 180) {
            this.dragObj.x = 100;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart - 320;
          this.dragObj.y = 378;
          break;
        case pointer.x < this.xstart - 80:
          if (pointer.x < 180) {
            this.dragObj.x = 100;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart - 160;
          this.dragObj.y = 378;
          break;

        //vpravo
        case pointer.x > this.xstart + 880:
          if (pointer.x > 980) {
            this.dragObj.x = 1060;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart + 960;
          this.dragObj.y = 378;
          break;

        case pointer.x > this.xstart + 720:
          if (pointer.x > 980) {
            this.dragObj.x = 1060;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart + 800;
          this.dragObj.y = 378;
          break;

        case pointer.x > this.xstart + 560:
          if (pointer.x > 980) {
            this.dragObj.x = 1060;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart + 640;
          this.dragObj.y = 378;
          break;

        case pointer.x > this.xstart + 400:
          if (pointer.x > 980) {
            this.dragObj.x = 1060;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart + 480;
          this.dragObj.y = 378;
          break;

        case pointer.x > this.xstart + 240:
          if (pointer.x > 980) {
            this.dragObj.x = 1060;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart + 320;
          this.dragObj.y = 378;
          break;

        case pointer.x > this.xstart + 80:
          if (pointer.x > 980) {
            this.dragObj.x = 1060;
            this.dragObj.y = 378;
            break;
          }
          this.dragObj.x = this.xstart + 160;
          this.dragObj.y = 378;
          break;

        default:
          this.dragObj.x = this.xstart;
          this.dragObj.y = this.ystart;
      }*/
  },
});

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1280,
  height: 720,
  backgroundColor: '#007700',
  zoom: 1,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
    },
  },
  scene: [BootScene, WorldScene],
};

var game = new Phaser.Game(config);
