//---Section of Global Constant---
const y1 = 150; //First Line
const y2 = 378; //Second Line
const x1 = 100;
const x2 = 260;
const x3 = 420;
const x4 = 580;
const x5 = 740;
const x6 = 900;
const x7 = 1060;
const y_shift = 30; //! Smeschenie po vertikali
//---Section of Global Variables---

//---Section of User Functions---
//uluchshenyj randomaizer
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
//peremeshuvaet kolodu
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
//proverka cveta masti
function red_or_black(cart) {
  if (cart.includes("clubs") || cart.includes("spades")) return "black";
  if (cart.includes("diamond") || cart.includes("hearts")) return "red";
  if (cart.includes("placeholder")) return "placeholder";
}
//proverka masti
function take_suit(cart) {
  if (cart.includes("clubs")) return "clubs";
  if (cart.includes("spades")) return "spades";
  if (cart.includes("diamond")) return "diamond";
  if (cart.includes("hearts")) return "hearts";
  if (cart.includes("placeholder")) return "placeholder";
}
//vozvraschaet ves karty
function weight(name) {
  let weight = name.substring(name.length - 2);
  if (weight.includes("_")) weight = name.substring(name.length - 1);
  return parseInt(weight);
}
//predvaritelnoe napolnenie massiva nazvanij kart
function cards() {
  var crd = [];
  for (let i = 1; i <= 13; i++) {
    crd.push("clubs_" + i);
    crd.push("diamond_" + i);
    crd.push("hearts_" + i);
    crd.push("spades_" + i);
  }
  crd = shuffle(crd);
  return crd;
}
//End functions

var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function BootScene() {
    Phaser.Scene.call(this, { key: "BootScene" });
  },

  preload: function () {
    // здесь будет загрузка ресурсов

    this.load.atlas("placeholder", "assets/cards/placeholder.png", "assets/cards/placeholder_atlas.json");
    this.load.atlas("card_shirt", "assets/cards/card_shirt.png", "assets/cards/card_shirt_atlas.json");
    this.load.atlas("cards", "assets/cards/cards.png", "assets/cards/cards_atlas.json");
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

    //massivy startovoj kolody
    this.namecrd1 = []; //nazvanija kart
    this.crd1 = []; //massiv spritov

    //levyj verhnij ugol
    this.deck0 = []; //massiv kart v perekladke
    this.name0 = []; //ih imena

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

    //finalnye placeholdery
    this.deck8 = [];
    this.deck9 = [];
    this.deck10 = [];
    this.deck11 = [];
    // card names na vyhode
    this.name8 = [];
    this.name9 = [];
    this.name10 = [];
    this.name11 = [];

    //section of global variables
    this.x = 100;
    this.y = 150;
    this.xx = 100;
    this.yy = 378;
    this.x2 = 260; // pozicia deck

    this.coef = 0.8;
    this.width_card = 142;

    //peremennye dlia ucheta kart na placeholderah
    this.pl1o = 0; //dlia otkrytyh
    this.pl2c = 0; //dlia zakrytyh
    this.pl2o = 0;
    this.pl3c = 0;
    this.pl3o = 0;
    this.pl4c = 0;
    this.pl4o = 0;
    this.pl5c = 0;
    this.pl5o = 0;
    this.pl6c = 0;
    this.pl6o = 0;
    this.pl7c = 0;
    this.pl7o = 0;

    //verhnie placeholdery
    this.pl8o = 0;
    this.pl9o = 0;
    this.pl10o = 0;
    this.pl11o = 0;

    //peremennye dlia peremeschenia pachki kart
    this.upcard = 0; //skolko kart lezhit sverhu
    this.pos = 0; //posicija peretjagivaemoj karty (pod pointerom)

    /*for(var i=0;i<7;i++) {
              var j = i+2;
              this.crd.push(this.add.sprite(x, 100, 'cards', 'hearts_'+ j));
              this.crd[i].scale = 0.9;
              this.crd[i].setInteractive();
              x += this.crd[i].width * 0.9 + 5;          
           }*/

    //placeholders
    this.placehold.push(this.add.sprite(x1, y1, "placeholder", "placeholder_14"));
    this.placehold[0].setInteractive();
    this.placehold.push(this.add.sprite(x2, y1, "placeholder", "placeholder_14"));
    this.placehold.push(this.add.sprite(x4, y1, "placeholder", "placeholder_14"));
    this.placehold.push(this.add.sprite(x5, y1, "placeholder", "placeholder_14"));
    this.placehold.push(this.add.sprite(x6, y1, "placeholder", "placeholder_14"));
    this.placehold.push(this.add.sprite(x7, y1, "placeholder", "placeholder_14"));

    //vykladka rubashki
    this.shirt.push(this.add.sprite(100, 150, "card_shirt", "card_shirt"));
    this.shirt[0].setDepth(1);
    this.shirt[0].setInteractive();

    //predvaritelnoe napolnenie massiva nazvanij kart
    this.crd = cards();

    // vykladka po kolonkam
    this.first_load();
    //Konec vykladki po kolodam

    //perenos ostavshyhsia kart v startovuiu kolodu
    // let j = this.crd.length;
    // for (let i = 0; i < j; i++) {
    //   this.namecrd1[i] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
    //   this.crd1[i] = this.add.sprite(this.x, this.y, "cards", this.crd.pop()); //! .pop() zabiraet kartu iz kolody
    //   this.crd1[this.crd1.length - 1].setInteractive();
    // }
    this.input.on("pointerdown", this.startDrag, this);
  }, //End of create:
  //! nachinaem dvigat
  startDrag(pointer, targets) {
    this.dragObj = targets[0];
    //this.name_card = "null";
    //this.pl = null;
    //this.w = 0;

    if (this.dragObj instanceof Phaser.GameObjects.Sprite) {
      this.input.off("pointerdown", this.startDrag, this);

      //this.scene.bringToTop(this.dragObj);
      //game.scene.bringToTop(this.dragObj);

      //todo this.xstart = this.dragObj.x;
      //todo this.ystart = this.dragObj.y;

      //podnimaet kartu nad ostalnymi esli ona posledniaja
      //this.dragObj.setDepth(2);
      console.log("pos1 - " + this.dragObj.pos);
      eval("console.log('pos2 - ' + this.deck" + this.dragObj.pl + ".length)");
      eval("console.log('plc - ' + this.deck" + this.dragObj.pl + "[0].plc)");
      if (eval("this.dragObj.pos  == this.deck" + this.dragObj.pl + ".length - 1")) this.dragObj.setDepth(2);

      //console.log('D - ' + eval('this.deck' + this.pl + '.length'));
      //console.log('Name card - ' + this.name_card);
      //console.log('red - ' + red_or_black(this.name_card)); //*/

      if (!(pointer.y < 253 && pointer.x > 29 && pointer.x < 171)) this.input.on("pointermove", this.doDrag, this);
      this.input.on("pointerup", this.stopDrag, this);
    }
  },

  doDrag(pointer) {
    this.dragObj.x = pointer.x;
    this.dragObj.y = pointer.y;

    // //kod nizhe tianet pachku
    // if (this.upcard > 0) {
    //   // esli zahvatil bolshe odnoj karty
    //   for (let i = 1; i < this.upcard + 1; i++) /*цикл po kartam sverhu*/ {
    //     eval("this.deck" + this.pl + "[this.pos + i].x = pointer.x");
    //     eval("this.deck" + this.pl + "[this.pos + i].y = pointer.y + y_shift*i");
    //   }
    // }
  },

  stopDrag(pointer) {
    // function, kotoraja vypolnyaetcya, kogda otpuskaesh knopku myshy pri peretaskivanii
    this.input.on("pointerdown", this.startDrag, this);
    this.input.off("pointermove", this.doDrag, this);
    this.input.off("pointerup", this.stopDrag, this);
    this.dragObj.setDepth(0);

    if (pointer.y < 300) {
      //   //verhnie placeholdery
      //   // ace placeholder 1
      //   if (pointer.x > 340 && pointer.x < 660) {
      //     //this.pl8o++;
      //     this.dragObj.x = 580;
      //     this.dragObj.y = 150 + (this.name8.length - 1) * (y_shift / 2);
      //     //!peremeschenie karty mejdu massivami
      //     this.name8[this.name8.length] = eval("this.name" + this.pl + ".pop()");
      //     this.deck8[this.deck8.length] = eval("this.deck" + this.pl + ".pop()");
      //     if (eval("this.pl" + this.pl + "o == 1")) {
      //       if (eval("this.pl" + this.pl + "c > 0")) {
      //         eval("this.pl" + this.pl + "c--");
      //         eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
      //         this.remove_shirt(this.pl);
      //       }
      //     } //minusuet peremennuju otkrytyh kart v ishodnom placeholdere
      //     else if (eval("this.pl" + this.pl + "o >1")) eval("this.pl" + this.pl + "o--");
      //     //! -- konec peremeschenija
      //   }
      //   // ace placeholder 2
      //   if (pointer.x > 659 && pointer.x < 820) {
      //     this.pl9o++;
      //     this.dragObj.x = 740;
      //     this.dragObj.y = 150 + (this.name9.length - 1) * (y_shift / 2);
      //     //!peremeschenie karty mejdu massivami
      //     this.name9[this.name9.length] = eval("this.name" + this.pl + ".pop()");
      //     this.deck9[this.deck9.length] = eval("this.deck" + this.pl + ".pop()");
      //     //открываем карту - убираем рубашку, если она есть, из placeholdera из которого взяли карту
      //     if (eval("this.pl" + this.pl + "o == 1")) {
      //       if (eval("this.pl" + this.pl + "c > 0")) {
      //         eval("this.pl" + this.pl + "c--");
      //         eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
      //         this.remove_shirt(this.pl);
      //       }
      //     } //minusuet peremennuju otkrytyh kart v ishodnom placeholdere
      //     else if (eval("this.pl" + this.pl + "o >1")) eval("this.pl" + this.pl + "o--");
      //     //! -- konec peremeschenija
      //   }
      //   // ace placeholder 3
      //   if (pointer.x > 819 && pointer.x < 980) {
      //     this.pl10o++;
      //     this.dragObj.x = 900;
      //     this.dragObj.y = 150 + (this.name10.length - 1) * (y_shift / 2);
      //     //!peremeschenie karty mejdu massivami
      //     this.name10[this.name10.length] = eval("this.name" + this.pl + ".pop()");
      //     this.deck10[this.deck10.length] = eval("this.deck" + this.pl + ".pop()");
      //     //открываем карту - убираем рубашку, если она есть, из placeholdera из которого взяли карту
      //     if (eval("this.pl" + this.pl + "o == 1")) {
      //       if (eval("this.pl" + this.pl + "c > 0")) {
      //         eval("this.pl" + this.pl + "c--");
      //         eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
      //         this.remove_shirt(this.pl);
      //       }
      //     } //minusuet peremennuju otkrytyh kart v ishodnom placeholdere
      //     else if (eval("this.pl" + this.pl + "o >1")) eval("this.pl" + this.pl + "o--");
      //     //! -- konec peremeschenija
      //   }
      //   // ace placeholder 4
      //   if (pointer.x > 979) {
      //     this.pl11o++;
      //     this.dragObj.x = 1060;
      //     this.dragObj.y = 150 + (this.name11.length - 1) * (y_shift / 2);
      //     //!peremeschenie karty mejdu massivami
      //     this.name11[this.name11.length] = eval("this.name" + this.pl + ".pop()");
      //     this.deck11[this.deck11.length] = eval("this.deck" + this.pl + ".pop()");
      //     //открываем карту - убираем рубашку, если она есть, из placeholdera из которого взяли карту
      //     if (eval("this.pl" + this.pl + "o == 1")) {
      //       if (eval("this.pl" + this.pl + "c > 0")) {
      //         eval("this.pl" + this.pl + "c--");
      //         eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
      //         this.remove_shirt(this.pl);
      //       }
      //     } //minusuet peremennuju otkrytyh kart v ishodnom placeholdere
      //     else if (eval("this.pl" + this.pl + "o >1")) eval("this.pl" + this.pl + "o--");
      //     //! -- konec peremeschenija
      //}
      //else
      // if (pointer.x < 340) {
      //   this.dragObj.x = this.xstart;
      //   this.dragObj.y = this.ystart;
      // }
    } //nizhnie placeholdery
    else {
      //placeholder-1
      if (pointer.x < 180) {
        this.peremeschenie(1, x1);
      }
      //placeholder-2
      if (pointer.x > 179 && pointer.x < 340) {
        this.peremeschenie(2, x2);
      }
      //placeholder-3
      if (pointer.x > 339 && pointer.x < 500) {
        this.peremeschenie(3, x3);
      }
      //placeholder-4
      if (pointer.x > 499 && pointer.x < 660) {
        this.peremeschenie(4, x4);
      }
      //placeholder-5
      if (pointer.x > 659 && pointer.x < 820) {
        this.peremeschenie(5, x5);
      }
      //placeholder-6
      if (pointer.x > 819 && pointer.x < 980) {
        this.peremeschenie(6, x6);
      }
      //placeholder-7
      if (pointer.x > 979) {
        this.peremeschenie(7, x7);
      }
    }
  },
  peremeschenie(ph, xx) {
    var obj;
    eval("obj = this.deck" + ph + "[this.deck" + ph + ".length - 1]");
    if (obj.color != this.dragObj.color || obj.name == "placeholder_14") {
      //esli ves menshe na 1
      if (obj.weight == this.dragObj.weight + 1) {
        eval("this.deck" + ph + "[0].plo++");
        this.dragObj.x = xx;
        this.dragObj.y = y2 + eval("this.deck" + ph + ".length - 1") * y_shift;
        // //kod nizhe tianet pachku
        // if (this.upcard > 0) {
        //   // esli zahvatil bolshe odnoj karty
        //   for (let i = 1; i < this.upcard + 1; i++) /*цикл po kartam sverhu*/ {
        //     eval("this.pl" + ph + "o++");
        //     eval("this.deck" + this.pl + "[this.pos + i].x = xx");
        //     eval("this.deck" + this.pl + "[this.pos + i].y = this.yy + ((this.name1.length - 1) * y_shift) + y_shift*i");
        //   }
        // }
        //!peremeschenie karty mejdu massivami
        // if (this.upcard > 0) {
        //   // esli zahvatil bolshe odnoj karty
        //   let dlin = eval("this.name" + ph + ".length");
        //   for (let i = 1; i < this.upcard + 1; i++) /*цикл po kartam sverhu*/ {
        //     eval("this.name" + ph + "[dlin + this.upcard + 1 - i] = this.name" + this.pl + ".pop()");
        //     eval("this.deck" + ph + "[dlin + this.upcard + 1 - i] = this.deck" + this.pl + ".pop()");
        //     eval("this.pl" + this.pl + "o--"); //minusuem schetchik otkrytyj kart
        //   }
        // } else {

        eval("this.deck" + ph + ".push(this.deck" + this.dragObj.pl + ".pop())");
        eval("this.deck" + this.dragObj.pl + "[0].plo--"); //minusuem schetchik otkrytyj kart
        //}
        //открываем карту - убираем рубашку, если она есть, из placeholdera из которого взяли карту
        if (eval("this.deck" + this.dragObj.pl + "[0].plc > 0")) {
          // if (eval("this.pl" + this.pl + "o + 1 - this.upcard == 1")) {
          eval("this.deck" + this.dragObj.pl + "[0].plo++"); //vozvrashaem nazad schetchik, potomu chto otkryli rubashku
          eval("this.deck" + this.dragObj.pl + "[0].plcc--");
          eval("this.deck" + this.dragObj.pl + "[this.deck" + this.dragObj.pl + ".length - 1].setInteractive()");
          this.remove_shirt(this.dragObj.pl);
          //}
        }
        //! -- konec peremeschenija
      } else {
        this.dragObj.x = this.dragObj.sx;
        this.dragObj.y = this.dragObj.sy;
        // //kod nizhe tianet pachku
        // if (this.upcard > 0) {
        //   for (let i = 1; i < this.upcard + 1; i++) /*цикл po kartam sverhu*/ {
        //     eval("this.deck" + this.pl + "[this.pos + i].x = this.xstart");
        //     eval("this.deck" + this.pl + "[this.pos + i].y = this.ystart + y_shift*i");
        //   }
        // }
      }
    } else {
      this.dragObj.x = this.dragObj.sx;
      this.dragObj.y = this.dragObj.sy;
      // // kod nizhe tianet pachku
      // if (this.upcard > 0) {
      //   for (let i = 1; i < this.upcard + 1; i++) /*цикл po kartam sverhu*/ {
      //     eval("this.deck" + this.pl + "[this.pos + i].x = this.xstart");
      //     eval("this.deck" + this.pl + "[this.pos + i].y = this.ystart + y_shift*i");
      //   }
      // }
    }
  },
  remove_shirt(pos) {
    //placeholder - 2
    if (pos == 2) {
      this.shirt[1].visible = false;
    }
    //placeholder - 3
    if (pos == 3) {
      if (eval("this.deck" + pos + ".length == 3")) this.shirt[3].visible = false;
      if (eval("this.deck" + pos + ".length == 2")) this.shirt[2].visible = false;
    }
    //placeholder - 4
    if (pos == 4) {
      if (eval("this.deck" + pos + ".length == 4")) this.shirt[6].visible = false;
      if (eval("this.deck" + pos + ".length == 3")) this.shirt[5].visible = false;
      if (eval("this.deck" + pos + ".length == 2")) this.shirt[4].visible = false;
    }
    //placeholder - 5
    if (pos == 5) {
      if (eval("this.deck" + pos + ".length == 5")) this.shirt[10].visible = false;
      if (eval("this.deck" + pos + ".length == 4")) this.shirt[9].visible = false;
      if (eval("this.deck" + pos + ".length == 3")) this.shirt[8].visible = false;
      if (eval("this.deck" + pos + ".length == 2")) this.shirt[7].visible = false;
    }
    //placeholder - 6
    if (pos == 6) {
      if (eval("this.deck" + pos + ".length == 6")) this.shirt[15].visible = false;
      if (eval("this.deck" + pos + ".length == 5")) this.shirt[14].visible = false;
      if (eval("this.deck" + pos + ".length == 4")) this.shirt[13].visible = false;
      if (eval("this.deck" + pos + ".length == 3")) this.shirt[12].visible = false;
      if (eval("this.deck" + pos + ".length == 2")) this.shirt[11].visible = false;
    }
    //placeholder - 7
    if (pos == 7) {
      if (eval("this.deck" + pos + ".length == 7")) this.shirt[21].visible = false;
      if (eval("this.deck" + pos + ".length == 6")) this.shirt[20].visible = false;
      if (eval("this.deck" + pos + ".length == 5")) this.shirt[19].visible = false;
      if (eval("this.deck" + pos + ".length == 4")) this.shirt[18].visible = false;
      if (eval("this.deck" + pos + ".length == 3")) this.shirt[17].visible = false;
      if (eval("this.deck" + pos + ".length == 2")) this.shirt[16].visible = false;
    }
  },
  first_load() {
    var k = 1;
    var posx = x1;
    var posy = y2;
    var j;
    var name;
    for (let i = 1; i <= 7; i++) {
      posy = y2;
      j = 1;
      eval("this.deck" + i + "[0] = this.add.sprite(posx, posy, 'placeholder', 'placeholder_14')");
      eval("this.deck" + i + "[0].plo = 0");
      eval("this.deck" + i + "[0].plc = 0");
      do {
        eval("this.deck" + i + "[0].plo +=1");
        name = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
        eval("this.deck" + i + "[j] = this.add.sprite(posx, posy, 'cards', this.crd.pop())"); //! .pop() zabiraet kartu iz kolody
        eval("this.deck" + i + "[j].name = name"); //imia karty
        eval("this.deck" + i + "[j].color = red_or_black(name)");
        eval("this.deck" + i + "[j].suit = take_suit(name)");
        eval("this.deck" + i + "[j].weight = weight(name)");
        eval("this.deck" + i + "[j].pl = i");
        eval("this.deck" + i + "[j].sx = posx");
        eval("this.deck" + i + "[j].sy = posy");
        eval("this.deck" + i + "[j].pos = j");
        if (i == j) eval("this.deck" + i + "[j].setInteractive()");
        else {
          eval("this.deck" + i + "[0].plo -= 1");
          eval("this.deck" + i + "[0].plc += 1");
          this.shirt[k] = this.add.sprite(posx, posy, "card_shirt", "card_shirt"); //vykladka rubashek
          k++; //index rubashek
        }
        j++;
        posy = posy + y_shift;
      } while (j < i + 1);
      posx = posx + 160;
    }
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
