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

var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function BootScene() {
    Phaser.Scene.call(this, { key: "BootScene" });
  },

  preload: function () {
    // здесь будет загрузка ресурсов

    this.load.atlas(
      "placeholder",
      "assets/cards/placeholder.png",
      "assets/cards/placeholder_atlas.json"
    );
    this.load.atlas(
      "card_shirt",
      "assets/cards/card_shirt.png",
      "assets/cards/card_shirt_atlas.json"
    );
    this.load.atlas(
      "cards",
      "assets/cards/cards.png",
      "assets/cards/cards_atlas.json"
    );
  },

  create: function () {
    this.scene.start("WorldScene");
  },
});

var WorldScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function WorldScene() {
    Phaser.Scene.call(this, { key: "WorldScene" });
  },

  preload: function () {},

  create: function () {
    // здесь мы создадим сцену мира
    this.crd = []; //massiv nazvanij kart
    this.deck = []; //massiv dlya identifikacii - v game_crd lejat sprity, a tut nazvanija kart pereshedshih v igru
    this.game_crd = []; //massiv objektov-spraitov kart nahodiashihsia v igre
    this.shirt = []; //rubashka
    this.placehold = []; //placeholdery (cells)

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
      this.add.sprite(100, 150, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(260, 150, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(580, 150, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(740, 150, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(900, 150, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(1060, 150, "placeholder", "placeholder")
    );

    this.placehold.push(
      this.add.sprite(100, 378, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(260, 378, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(420, 378, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(580, 378, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(740, 378, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(900, 378, "placeholder", "placeholder")
    );
    this.placehold.push(
      this.add.sprite(1060, 378, "placeholder", "placeholder")
    );

    //vykladka rubashki
    this.shirt.push(this.add.sprite(100, 150, "card_shirt", "card_shirt"));
    this.shirt[0].setDepth(52);

    //predvaritelnoe napolnenie massiva kart
    for (var i = 1; i <= 13; i++) {
      this.crd.push("clubs_" + i);
      this.crd.push("diamond_" + i);
      this.crd.push("hearts_" + i);
      this.crd.push("spades_" + i);
    }
    /*
            this.loadSuit({ suit: 'clubs', x: 100, y: 150, target: this.crd });
            this.loadSuit({ suit: 'spades', x: 100, y: 150, target: this.crd });
            this.loadSuit({ suit: 'diamond', x: 100, y: 150, target: this.crd });
            this.loadSuit({ suit: 'hearts', x: 100, y: 150, target: this.crd });*/

    //peremeshivanie
    this.crd = shuffle(this.crd);
    //this.ShuffleDeck();

    // vykladka po kolonkam
    let k = 0;
    for (let j = 0; j < 7; j++) {
      //perehod po placeholderam
      for (let i = 0; i < j + 1; i++) {
        //vykladka kart po placeholderam
        this.deck[k] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
        //console.log("crd = " + this.crd[this.crd.length-1]);
        this.game_crd[k] = this.add.sprite(xx, yy, "cards", this.crd.pop()); //! .pop() zabiraet kartu iz kolody

        if (i == j) this.game_crd[k].setInteractive();
        //vkluchenie interactivnosti otkrytoj karty
        else
          this.shirt[k + 1] = this.add.sprite(
            xx,
            yy,
            "card_shirt",
            "card_shirt"
          ); //vykladka rubashek

        yy += 30; //smeshchenie po y
        //console.log("deck = " + this.deck[k]);
        k = k + 1; //index kart v igre
      }
      xx += this.width_card + 18; //peremeschenie na sledujuschij placeholder
      yy = 378; //vozvrat pozicii y na placeholder
    }

    //this.crd[this.crd.length-1].scale = 0.9;
    //this.crd[this.crd.length-1].setInteractive();

    /*var frames = this.textures.get('cards').getFrameNames();
    
            var x = 100;
            var y = 150;
        
            for (var i = 0; i <54 ; i++)
            {
                var image = this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setInteractive();
        
                this.input.setDraggable(image);
        
                //x += 4;
               // y += 4;
            }
            this.input.on('dragstart', function (pointer, gameObject) {
        
                this.children.bringToTop(gameObject);
        
            }, this);
        
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        
                gameObject.x = dragX;
                gameObject.y = dragY;
        
            });*/

    //для инфо 7 карт
    /*this.crd.push(this.add.sprite(260, 410, 'cards', 'card_shirt'));
            this.crd.push(this.add.sprite(260, 442, 'cards', 'card_shirt'));
            this.crd.push(this.add.sprite(260, 474, 'cards', 'card_shirt'));
            this.crd.push(this.add.sprite(260, 506, 'cards', 'card_shirt'));
            this.crd.push(this.add.sprite(260, 538, 'cards', 'card_shirt'));
            this.crd.push(this.add.sprite(260, 570, 'cards', 'card_shirt'));
            this.crd.push(this.add.sprite(260, 602, 'cards', 'card_shirt'));*/

    // sekcyja raskladki kart
    /* this.crd.push(this.add.sprite(100, 150, 'cards', 'card_shirt'));
             var j = 1;//dobavlyaet kartu na novom placeholdere      
             var x = 100;//nachalnaya koordinata po x
     
             for (let i = 0; i < 7; i++) {
                 var y = 378;//nachalnaya koordinata po y
                 var k = 0;//schetchik kart v placeholdere
                 do {
                     this.crd.push(this.add.sprite(x, y, 'cards', 'card_shirt'));
                     y = y + 32;//sdvig v niz
                     k++;
                 } while (k < j);
                 x = x + 160;//sdvig po x
                 j = j + 1;
             }*/

    this.input.on("pointerdown", this.startDrag, this);
  },

  /*startDrag(pointer, targets) {
    this.input.off("pointerdown", this.startDrag, this);
    this.dragObj = targets[0];

    //this.scene.bringToTop(this.dragObj);
    //game.scene.bringToTop(this.dragObj);

    if (this.dragObj instanceof Phaser.GameObjects.Sprite) {
      this.xstart = this.dragObj.x;
      this.ystart = this.dragObj.y;
      for (var i = 0; i < this.game_crd.length; i++) {
        this.game_crd[i].setDepth(0);
        //console.log("  depth2 = " + this.game_crd[i].depth);
      }
      this.dragObj.setDepth(53);
    }

    this.input.on("pointermove", this.doDrag, this);
    this.input.on("pointerup", this.stopDrag, this);
    //this.dragObj.
  },*/

  startDrag(pointer, targets) {
    this.dragObj = targets[0];
    if (this.dragObj instanceof Phaser.GameObjects.Sprite) {
      this.input.off("pointerdown", this.startDrag, this);

      //this.scene.bringToTop(this.dragObj);
      //game.scene.bringToTop(this.dragObj);

      this.xstart = this.dragObj.x;
      this.ystart = this.dragObj.y;

      for (var i = 0; i < this.game_crd.length; i++) {
        this.game_crd[i].setDepth(0);
        //console.log("  depth2 = " + this.game_crd[i].depth);
      }
      this.dragObj.setDepth(53);

      this.input.on("pointermove", this.doDrag, this);
      this.input.on("pointerup", this.stopDrag, this);
      //this.dragObj.
    }
  },

  doDrag(pointer) {
    this.dragObj.x = pointer.x;
    this.dragObj.y = pointer.y;
  },

  stopDrag(pointer) {
    // function, kotoraja vypolnyaetcya, kogda otpuskaesh knopku myshy pri peretaskivanii
    this.input.on("pointerdown", this.startDrag, this);
    this.input.off("pointermove", this.doDrag, this);
    this.input.off("pointerup", this.stopDrag, this);

    if (pointer.y < 378) {
      this.dragObj.x = this.xstart;
      this.dragObj.y = this.ystart;
    }
    //----------------------------
    /* if (pointer.x < this.xstart - 80) {
      this.dragObj.x = this.xstart - 160;
      this.dragObj.y = 378;
    } else {
      this.dragObj.x = this.xstart;
      this.dragObj.y = this.ystart;
    }*/
    //-----------------------------
    switch (true) {
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
    }

    console.log("x position - " + this.dragObj.x);
    console.log("y position - " + this.dragObj.y);
    let a = this.dragObj.x;
    let b = this.dragObj.width / 2;
    let c = a + b;
    console.log("width - " + c);
  },

  //metod zagruzki kolody
  loadSuit(data) {
    let { suit, target, x, y } = data;

    for (let i = 1; i <= 13; i++) {
      target.push(this.add.sprite(x, y, "cards", suit + "_" + i));
      //target[target.length-1].scale = 0.9;
      target[target.length - 1].setInteractive();
    }
  },

  ShuffleDeck() {
    var n = this.crd.length - 2;
    //for (let i = 0; i < n; i++) {
    //    this.crd[i].depth = i;
    //}
    /*for (let i = 0; i < n; i++) {
                var ind1 = getRandomInt(n);
                var ind2 = getRandomInt(n);
                var obj = this.crd[ind1];
                this.crd[ind1] = this.crd[ind2];
                this.crd[ind2] = obj;
            }*/
    for (let i = 0; i < n; i++) {
      this.crd[i].depth = getRandomInt(n);
    }

    for (let i = 0; i < n; i++) {
      console.log(" " + i + ", depth = " + this.crd[i]);
    }
    console.log("here");
  },
});

var config = {
  type: Phaser.AUTO,
  parent: "content",
  width: 1280,
  height: 720,
  backgroundColor: "#007700",
  zoom: 1,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
    },
  },
  scene: [BootScene, WorldScene],
};

var game = new Phaser.Game(config);
