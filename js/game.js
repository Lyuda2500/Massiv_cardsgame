//var crd = [];
//var placehold = [];
//var shirt = [];
//! Smeschenie po vertikali
var y_shift = 30;

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
function red_or_black(cart) {
  //proverka na mast
  if (cart.includes("clubs") || cart.includes("spades")) return "black";
  if (cart.includes("diamond") || cart.includes("hearts")) return "red";
  if (cart.includes("placeholder")) return "placeholder";
}

function weight(name) {
  let weight = name.substring(name.length - 2);
  if (weight.includes("_")) weight = name.substring(name.length - 1);
  return parseInt(weight);
}

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
    this.u = 0;
    this.x = 100;
    this.y = 150;
    var xx = 100;
    var yy = 378;
    this.x2 = 260; // pozicia deck

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
    this.placehold.push(this.add.sprite(100, 150, "placeholder", "placeholder_14"));
    this.placehold[0].setInteractive();
    this.placehold.push(this.add.sprite(260, 150, "placeholder", "placeholder_14"));
    this.placehold.push(this.add.sprite(580, 150, "placeholder", "placeholder_14"));
    this.placehold.push(this.add.sprite(740, 150, "placeholder", "placeholder_14"));
    this.placehold.push(this.add.sprite(900, 150, "placeholder", "placeholder_14"));
    this.placehold.push(this.add.sprite(1060, 150, "placeholder", "placeholder_14")); /*
    this.placehold.push(
      this.add.sprite(100, 378, 'placeholder', 'placeholder_14'),
    );
    this.placehold.push(
      this.add.sprite(260, 378, 'placeholder', 'placeholder_14'),
    );
    this.placehold.push(
      this.add.sprite(420, 378, 'placeholder', 'placeholder_14'),
    );
    this.placehold.push(
      this.add.sprite(580, 378, 'placeholder', 'placeholder_14'),
    );
    this.placehold.push(
      this.add.sprite(740, 378, 'placeholder', 'placeholder_14'),
    );
    this.placehold.push(
      this.add.sprite(900, 378, 'placeholder', 'placeholder_14'),
    );
    this.placehold.push(
      this.add.sprite(1060, 378, 'placeholder', 'placeholder_14'),
    );//*/

    //vykladka rubashki
    this.shirt.push(this.add.sprite(100, 150, "card_shirt", "card_shirt"));
    this.shirt[0].setDepth(1);
    this.shirt[0].setInteractive();

    //predvaritelnoe napolnenie massiva nazvanij kart
    for (var i = 1; i <= 13; i++) {
      this.crd.push("clubs_" + i);
      this.crd.push("diamond_" + i);
      this.crd.push("hearts_" + i);
      this.crd.push("spades_" + i);
    }

    //peremeshivanie
    this.crd = shuffle(this.crd);

    // vykladka po kolonkam
    let k = 1;
    for (let j = 0; j < 7; j++) {
      //perehod po placeholderam
      let u = 0;
      let jj = j + 1;
      eval("this.name" + jj + '[u] = "placeholder_14"');
      eval("this.deck" + jj + '[u] = this.add.sprite(xx, yy, "placeholder", "placeholder_14")');
      u++;
      for (let i = 0; i < j + 1; i++) {
        //vykladka kart po placeholderam
        //console.log("crd = " + this.crd[this.crd.length-1]);
        if (j == 0) {
          this.name1[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck1[u] = this.add.sprite(xx, yy, "cards", this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          this.deck1[u].setInteractive();
        }
        if (j == 1) {
          this.name2[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck2[u] = this.add.sprite(xx, yy, "cards", this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck2[u].setInteractive();
          else {
            this.shirt[k] = this.add.sprite(xx, yy, "card_shirt", "card_shirt"); //vykladka rubashek
            k = k + 1; //index rubashek
          }
          u++;
        }
        if (j == 2) {
          this.name3[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck3[u] = this.add.sprite(xx, yy, "cards", this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck3[u].setInteractive();
          else {
            this.shirt[k] = this.add.sprite(xx, yy, "card_shirt", "card_shirt"); //vykladka rubashek
            k = k + 1; //index rubashek
          }
          u++;
        }
        if (j == 3) {
          this.name4[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck4[u] = this.add.sprite(xx, yy, "cards", this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck4[u].setInteractive();
          else {
            this.shirt[k] = this.add.sprite(xx, yy, "card_shirt", "card_shirt"); //vykladka rubashek
            k = k + 1; //index rubashek
          }
          u++;
        }
        if (j == 4) {
          this.name5[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck5[u] = this.add.sprite(xx, yy, "cards", this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck5[u].setInteractive();
          else {
            this.shirt[k] = this.add.sprite(xx, yy, "card_shirt", "card_shirt"); //vykladka rubashek
            k = k + 1; //index rubashek
          }
          u++;
        }
        if (j == 5) {
          this.name6[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck6[u] = this.add.sprite(xx, yy, "cards", this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck6[u].setInteractive();
          else {
            this.shirt[k] = this.add.sprite(xx, yy, "card_shirt", "card_shirt"); //vykladka rubashek
            k = k + 1; //index rubashek
          }
          u++;
        }
        if (j == 6) {
          this.name7[u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
          this.deck7[u] = this.add.sprite(xx, yy, "cards", this.crd.pop()); //! .pop() zabiraet kartu iz kolody
          if (i == j) this.deck7[u].setInteractive();
          else {
            this.shirt[k] = this.add.sprite(xx, yy, "card_shirt", "card_shirt"); //vykladka rubashek
            k = k + 1; //index rubashek
          }
          u++;
        }

        yy += y_shift; //smeshchenie po y
        //console.log("deck = " + this.deck[k]);
      }
      xx += this.width_card + 18; //peremeschenie na sledujuschij placeholder
      yy = 378; //vozvrat pozicii y na placeholder
    }
    this.input.on("pointerdown", this.startDrag, this);
  },
  //! nachinaem dvigat
  startDrag(pointer, targets) {
    this.dragObj = targets[0];
    this.name_card = "null";
    this.pl = null;
    this.w = 0;
    //this.red = null; // false - black, true - red
    if (this.dragObj instanceof Phaser.GameObjects.Sprite) {
      this.input.off("pointerdown", this.startDrag, this);

      //this.scene.bringToTop(this.dragObj);
      //game.scene.bringToTop(this.dragObj);

      this.xstart = this.dragObj.x;
      this.ystart = this.dragObj.y;

      this.dragObj.setDepth(2);

      if (this.ystart > 300) {
        if (this.xstart == 100) {
          this.name_card = this.name1[this.name1.length - 1];
          this.pl = 1;
          this.w = weight(this.name_card);
        }
        if (this.xstart == 260) {
          this.name_card = this.name2[this.name2.length - 1];
          this.pl = 2;
          this.w = weight(this.name_card);
        }
        if (this.xstart == 420) {
          this.name_card = this.name3[this.name3.length - 1];
          this.pl = 3;
          this.w = weight(this.name_card);
        }
        if (this.xstart == 580) {
          this.name_card = this.name4[this.name4.length - 1];
          this.pl = 4;
          this.w = weight(this.name_card);
        }
        if (this.xstart == 740) {
          this.name_card = this.name5[this.name5.length - 1];
          this.pl = 5;
          this.w = weight(this.name_card);
        }
        if (this.xstart == 900) {
          this.name_card = this.name6[this.name6.length - 1];
          this.pl = 6;
          this.w = weight(this.name_card);
        }
        if (this.xstart == 1060) {
          this.name_card = this.name7[this.name7.length - 1];
          this.pl = 7;
          this.w = weight(this.name_card);
        }
      } else {
        //щелчок по основной колоде (слева вверху)
        if (pointer.x > 29 && pointer.x < 171) {
          if (this.crd.length > 0) {
            if (this.crd.length == 1) {
              this.shirt[0].setDepth(0);
              this.placehold[0].setDepth(1);
            }
            this.name0[this.u] = this.crd[this.crd.length - 1]; //zapominaem nazvanie kart vyhodiashih iz kolody v igru
            this.deck0[this.u] = this.add.sprite(this.x2, this.y, "cards", this.crd.pop()); //! .pop() zabiraet kartu iz kolody
            this.deck0[this.u].setInteractive();
            this.u++;
          } else {
            let j = this.deck0.length; //сохраняем длину массива, поскольку внутри цикла она будет меняться
            for (let i = 0; i < j; i++) {
              this.crd[i] = this.name0.pop(); //! .pop() zabiraet kartu iz kolody
              this.deck0.pop(); // обнуление массива спрайтов
              //this.deck0[i].setInteractive();
            }
            this.shirt[0].setDepth(1);
            this.placehold[0].setDepth(0);
          }
        }
        if (this.xstart == 580) {
          this.name_card = this.name8[this.name8.length - 1];
          this.pl = 8;
          this.w = weight(this.name_card);
        }
        if (this.xstart == 740) {
          this.name_card = this.name9[this.name9.length - 1];
          this.pl = 9;
          this.w = weight(this.name_card);
        }
        if (this.xstart == 900) {
          this.name_card = this.name10[this.name10.length - 1];
          this.pl = 10;
          this.w = weight(this.name_card);
        }
        if (this.xstart == 1060) {
          this.name_card = this.name11[this.name11.length - 1];
          this.pl = 11;
          this.w = weight(this.name_card);
        }
      }
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
  },
  /*
    100 180
    260 340
    420 500
    580 660
    740 820
    900 980
    1060
    */
  stopDrag(pointer) {
    // function, kotoraja vypolnyaetcya, kogda otpuskaesh knopku myshy pri peretaskivanii
    this.input.on("pointerdown", this.startDrag, this);
    this.input.off("pointermove", this.doDrag, this);
    this.input.off("pointerup", this.stopDrag, this);
    this.dragObj.setDepth(0);

    if (pointer.y < 300) {
      // ace placeholder 1
      if (pointer.x > 340 && pointer.x < 660) {
        this.dragObj.x = 580;
        this.dragObj.y = 150 + (this.name8.length - 1) * 10;
        //!peremeschenie karty mejdu massivami
        this.name8[this.name8.length] = eval("this.name" + this.pl + ".pop()");
        this.deck8[this.deck8.length] = eval("this.deck" + this.pl + ".pop()");
        if (eval("this.deck" + this.pl + ".length") > 1) {
          eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
          this.remove_shirt(this.pl);
        }
        //! -- konec peremeschenija
      }
      // ace placeholder 2
      if (pointer.x > 659 && pointer.x < 820) {
        this.dragObj.x = 740;
        this.dragObj.y = 150 + (this.name9.length - 1) * 10;
        //!peremeschenie karty mejdu massivami
        this.name9[this.name9.length] = eval("this.name" + this.pl + ".pop()");
        this.deck9[this.deck9.length] = eval("this.deck" + this.pl + ".pop()");
        if (eval("this.deck" + this.pl + ".length") > 1) {
          eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
          this.remove_shirt(this.pl);
        }
        //! -- konec peremeschenija
      }
      // ace placeholder 3
      if (pointer.x > 819 && pointer.x < 980) {
        this.dragObj.x = 900;
        this.dragObj.y = 150 + (this.name10.length - 1) * 10;
        //!peremeschenie karty mejdu massivami
        this.name10[this.name10.length] = eval("this.name" + this.pl + ".pop()");
        this.deck10[this.deck10.length] = eval("this.deck" + this.pl + ".pop()");
        if (eval("this.deck" + this.pl + ".length") > 1) {
          eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
          this.remove_shirt(this.pl);
        }
        //! -- konec peremeschenija
      }
      // ace placeholder 4
      if (pointer.x > 979) {
        this.dragObj.x = 1060;
        this.dragObj.y = 150 + (this.name11.length - 1) * 10;
        //!peremeschenie karty mejdu massivami
        this.name11[this.name11.length] = eval("this.name" + this.pl + ".pop()");
        this.deck11[this.deck11.length] = eval("this.deck" + this.pl + ".pop()");
        if (eval("this.deck" + this.pl + ".length") > 1) {
          eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
          this.remove_shirt(this.pl);
        }
        //! -- konec peremeschenija
      }
      //else
      if (pointer.x < 340) {
        this.dragObj.x = this.xstart;
        this.dragObj.y = this.ystart;
      }
    } else {
      //placeholder-1
      if (pointer.x < 180) {
        //console.log("Place - " + red_or_black(this.name1[this.name1.length - 1]));
        if (red_or_black(this.name1[this.name1.length - 1]) != red_or_black(this.name_card) || red_or_black(this.name1[this.name1.length - 1]) == "placeholder") {
          if (this.w + 1 == weight(this.name1[this.name1.length - 1])) {
            this.dragObj.x = 100;
            this.dragObj.y = 378 + (this.name1.length - 1) * y_shift;
            //!peremeschenie karty mejdu massivami
            this.name1[this.name1.length] = eval("this.name" + this.pl + ".pop()");
            this.deck1[this.deck1.length] = eval("this.deck" + this.pl + ".pop()");
            //this.deck1[this.deck1.length - 2].disableInteractive();
            if (eval("this.deck" + this.pl + ".length") > 1) {
              eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
              this.remove_shirt(this.pl);
            }
            //! -- konec peremeschenija
          } else {
            this.dragObj.x = this.xstart;
            this.dragObj.y = this.ystart;
          }
        } else {
          this.dragObj.x = this.xstart;
          this.dragObj.y = this.ystart;
        }
      }
      //placeholder-2
      if (pointer.x > 179 && pointer.x < 340) {
        if (red_or_black(this.name2[this.name2.length - 1]) != red_or_black(this.name_card) || red_or_black(this.name2[this.name2.length - 1]) == "placeholder") {
          if (this.w + 1 == weight(this.name2[this.name2.length - 1])) {
            this.dragObj.x = 260;
            this.dragObj.y = 378 + (this.name2.length - 1) * y_shift;
            //this.dragObj.y = 378;
            //!peremeschenie karty mejdu massivami
            this.name2[this.name2.length] = eval("this.name" + this.pl + ".pop()");
            this.deck2[this.deck2.length] = eval("this.deck" + this.pl + ".pop()");
            // this.deck2[this.deck2.length - 2].disableInteractive();
            if (eval("this.deck" + this.pl + ".length") > 1) {
              eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
              this.remove_shirt(this.pl);
            }
            //! -- konec peremeschenija
          } else {
            this.dragObj.x = this.xstart;
            this.dragObj.y = this.ystart;
          }
        } else {
          this.dragObj.x = this.xstart;
          this.dragObj.y = this.ystart;
        }
      }
      //placeholder-3
      if (pointer.x > 339 && pointer.x < 500) {
        if (red_or_black(this.name3[this.name3.length - 1]) != red_or_black(this.name_card) || red_or_black(this.name3[this.name3.length - 1]) == "placeholder") {
          if (this.w + 1 == weight(this.name3[this.name3.length - 1])) {
            this.dragObj.x = 420;
            this.dragObj.y = 378 + (this.name3.length - 1) * y_shift;
            //!peremeschenie karty mejdu massivami
            this.name3[this.name3.length] = eval("this.name" + this.pl + ".pop()");
            this.deck3[this.deck3.length] = eval("this.deck" + this.pl + ".pop()");
            //this.deck3[this.deck3.length - 2].disableInteractive();
            if (eval("this.deck" + this.pl + ".length") > 1) {
              eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
              this.remove_shirt(this.pl);
            }
            //! -- konec peremeschenija
          } else {
            this.dragObj.x = this.xstart;
            this.dragObj.y = this.ystart;
          }
        } else {
          this.dragObj.x = this.xstart;
          this.dragObj.y = this.ystart;
        }
      }
      //placeholder-4
      if (pointer.x > 499 && pointer.x < 660) {
        if (red_or_black(this.name4[this.name4.length - 1]) != red_or_black(this.name_card) || red_or_black(this.name4[this.name4.length - 1]) == "placeholder") {
          if (this.w + 1 == weight(this.name4[this.name4.length - 1])) {
            this.dragObj.x = 580;
            this.dragObj.y = 378 + (this.name4.length - 1) * y_shift;
            //!peremeschenie karty mejdu massivami
            this.name4[this.name4.length] = eval("this.name" + this.pl + ".pop()");
            this.deck4[this.deck4.length] = eval("this.deck" + this.pl + ".pop()");
            //this.deck4[this.deck4.length - 2].disableInteractive();
            if (eval("this.deck" + this.pl + ".length") > 1) {
              eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
              this.remove_shirt(this.pl);
            }
            //! -- konec peremeschenija
          } else {
            this.dragObj.x = this.xstart;
            this.dragObj.y = this.ystart;
          }
        } else {
          this.dragObj.x = this.xstart;
          this.dragObj.y = this.ystart;
        }
      }
      //placeholder-5
      if (pointer.x > 659 && pointer.x < 820) {
        if (red_or_black(this.name5[this.name5.length - 1]) != red_or_black(this.name_card) || red_or_black(this.name5[this.name5.length - 1]) == "placeholder") {
          if (this.w + 1 == weight(this.name5[this.name5.length - 1])) {
            this.dragObj.x = 740;
            this.dragObj.y = 378 + (this.name5.length - 1) * y_shift;
            //!peremeschenie karty mejdu massivami
            this.name5[this.name5.length] = eval("this.name" + this.pl + ".pop()");
            this.deck5[this.deck5.length] = eval("this.deck" + this.pl + ".pop()");
            //this.deck5[this.deck5.length - 2].disableInteractive();
            if (eval("this.deck" + this.pl + ".length") > 1) {
              eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
              this.remove_shirt(this.pl);
            }
            //! -- konec peremeschenija
          } else {
            this.dragObj.x = this.xstart;
            this.dragObj.y = this.ystart;
          }
        } else {
          this.dragObj.x = this.xstart;
          this.dragObj.y = this.ystart;
        }
      }
      //placeholder-6
      if (pointer.x > 819 && pointer.x < 980) {
        if (red_or_black(this.name6[this.name6.length - 1]) != red_or_black(this.name_card) || red_or_black(this.name6[this.name6.length - 1]) == "placeholder") {
          if (this.w + 1 == weight(this.name6[this.name6.length - 1])) {
            this.dragObj.x = 900;
            this.dragObj.y = 378 + (this.name6.length - 1) * y_shift;
            //!peremeschenie karty mejdu massivami
            this.name6[this.name6.length] = eval("this.name" + this.pl + ".pop()");
            this.deck6[this.deck6.length] = eval("this.deck" + this.pl + ".pop()");
            //this.deck6[this.deck6.length - 2].disableInteractive();
            if (eval("this.deck" + this.pl + ".length") > 1) {
              eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
              this.remove_shirt(this.pl);
            }
            //! -- konec peremeschenija
          } else {
            this.dragObj.x = this.xstart;
            this.dragObj.y = this.ystart;
          }
        } else {
          this.dragObj.x = this.xstart;
          this.dragObj.y = this.ystart;
        }
      }
      //placeholder-7
      if (pointer.x > 979) {
        if (red_or_black(this.name7[this.name7.length - 1]) != red_or_black(this.name_card) || red_or_black(this.name7[this.name7.length - 1]) == "placeholder") {
          if (this.w + 1 == weight(this.name7[this.name7.length - 1])) {
            this.dragObj.x = 1060;
            this.dragObj.y = 378 + (this.name7.length - 1) * y_shift;
            //!peremeschenie karty mejdu massivami
            this.name7[this.name7.length] = eval("this.name" + this.pl + ".pop()");
            this.deck7[this.deck7.length] = eval("this.deck" + this.pl + ".pop()");
            // this.deck7[this.deck7.length - 2].disableInteractive();
            if (eval("this.deck" + this.pl + ".length") > 1) {
              eval("this.deck" + this.pl + "[this.deck" + this.pl + ".length - 1].setInteractive()");
              this.remove_shirt(this.pl);
            }
            //! -- konec peremeschenija
          } else {
            this.dragObj.x = this.xstart;
            this.dragObj.y = this.ystart;
          }
        } else {
          this.dragObj.x = this.xstart;
          this.dragObj.y = this.ystart;
        }
      }
    }
  },

  remove_shirt(pos) {
    //placeholder - 2
    if (pos == 2) {
      this.shirt[1].visible = false;
    }
    //placeholder - 3
    if (pos == 3) {
      if (eval("this.deck" + this.pl + ".length") == 3) this.shirt[3].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 2) this.shirt[2].visible = false;
    }
    //placeholder - 4
    if (pos == 4) {
      if (eval("this.deck" + this.pl + ".length") == 4) this.shirt[6].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 3) this.shirt[5].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 2) this.shirt[4].visible = false;
    }
    //placeholder - 5
    if (pos == 5) {
      if (eval("this.deck" + this.pl + ".length") == 5) this.shirt[10].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 4) this.shirt[9].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 3) this.shirt[8].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 2) this.shirt[7].visible = false;
    }
    //placeholder - 6
    if (pos == 6) {
      if (eval("this.deck" + this.pl + ".length") == 6) this.shirt[15].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 5) this.shirt[14].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 4) this.shirt[13].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 3) this.shirt[12].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 2) this.shirt[11].visible = false;
    }
    //placeholder - 7
    if (pos == 7) {
      if (eval("this.deck" + this.pl + ".length") == 7) this.shirt[21].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 6) this.shirt[20].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 5) this.shirt[19].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 4) this.shirt[18].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 3) this.shirt[17].visible = false;
      if (eval("this.deck" + this.pl + ".length") == 2) this.shirt[16].visible = false;
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
