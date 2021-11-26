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

  // здесь мы создадим сцену мира
  create: function () {
    this.crd = [];
    //levyj verhnij ugol закрытый
    this.deck12 = [];

    //levyj verhnij ugol открытый
    this.deck0 = [];

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

    //finalnye placeholdery
    this.deck8 = [];
    this.deck9 = [];
    this.deck10 = [];
    this.deck11 = [];

    //peremennye dlia peremeschenia pachki kart
    this.upcard = 0; //skolko kart lezhit sverhu

    //predvaritelnoe napolnenie massiva nazvanij kart
    this.crd = cards();

    // vykladka po kolonkam
    this.first_load();
    //Konec vykladki po kolodam

    this.input.on("pointerdown", this.startDrag, this);
  }, //End of create:

  //! nachinaem dvigat
  startDrag(pointer, targets) {
    this.dragObj = targets[0];
    if (this.dragObj instanceof Phaser.GameObjects.Sprite) {
      this.input.off("pointerdown", this.startDrag, this);
      //секция обработки стартовых плейсхолдеров (левый верхний угол)
      //Если взаимодействуем с колодой
      if (this.dragObj.x == x1 && this.dragObj.y == y1) {
        //Если в колоде кончились карты
        if (this.dragObj.name == "placeholder") {
          //Перекидываем карты назад в колоду
          while (this.deck0.length > 1) {
            this.crd.push(this.deck0[this.deck0.length - 1].name);
            this.deck0[this.deck0.length - 1].destroy();
            this.deck0.pop();
          }
          //Возвращаем рубашку
          this.shirt[0].visible = true;
          this.deck0[0].plo = 0;
        }
        //Секция вытаскивания карт из колоды
        //Если в колоде есть карты (есть рубашка - рубашка пропадает когда карты кончились)
        if (this.dragObj.name == "shirt") {
          //Проверяем, если в колоде кончиличь карты - убираем рубашку
          if (this.crd.length == 0) {
            this.shirt[0].visible = false;
          } else {
            //Иначе продолжаем вытаскивать карты из колоды
            this.deck0[0].plo += 1; //Необходимо для правильной работы логики перемещения между массивами
            let name = this.crd.pop();
            this.deck0.push(this.add.sprite(x2, y1, "cards", name));
            this.deck0[this.deck0.length - 1].name = name;
            this.deck0[this.deck0.length - 1].weight = weight(name);
            this.deck0[this.deck0.length - 1].color = red_or_black(name);
            this.deck0[this.deck0.length - 1].suit = take_suit(name);
            this.deck0[this.deck0.length - 1].pl = 0;
            this.deck0[this.deck0.length - 1].sx = x2;
            this.deck0[this.deck0.length - 1].sy = y1;
            this.deck0[this.deck0.length - 1].pos = this.deck0.length - 1;
            //console.log("FPC - " + this.deck12[this.deck12.length - 1].name);
            this.deck0[this.deck0.length - 1].setInteractive();
          }
        }
      } else {
        //Иначе, - Если взаимодействуем с остальными картами

        console.log("Klick - name: " + this.dragObj.name);
        console.log("Klick - plo: " + eval("this.deck" + this.dragObj.pl + "[0].plo"));
        console.log("Klick - pos" + this.dragObj.pos);
        //!----------------------------------
        // var o;
        // eval("o = this.deck" + this.dragObj.pl + ".length - 1");
        // for (let i = 1; i <= o; i++) {
        //   console.log(eval("this.deck" + this.dragObj.pl + "[i].name"));
        // }
        //!----------------------------------

        this.upcard = eval("this.deck" + this.dragObj.pl + ".length-1") - this.dragObj.pos; //определяем количество карт сверху

        //поднимает карту над остальными если она последняя
        if (this.upcard == 0) {
          this.dragObj.setDepth(2);
          //this.dragObj.scale = 1.05;
        } else {
          for (let i = 0; i < this.upcard + 1; i++) {
            eval("this.deck" + this.dragObj.pl + "[this.dragObj.pos + i].setDepth(2)");
            // eval("this.deck" + this.dragObj.pl + "[this.dragObj.pos + i].scale = 1.05");
          }
        }

        this.input.on("pointermove", this.doDrag, this); //включение движения //TODO-----------------------------------------------------
      }
      this.input.on("pointerup", this.stopDrag, this);
    }
  },

  doDrag(pointer) {
    this.dragObj.x = pointer.x;
    this.dragObj.y = pointer.y;
    console.log("DODRAG - " + this.dragObj.name);
    //код ниже тянет пачку
    //если захватил больше одной карты
    if (this.upcard > 0) {
      for (let i = 1; i < this.upcard + 1; i++) /*цикл по картам сверху*/ {
        eval("this.deck" + this.dragObj.pl + "[this.dragObj.pos + i].x = pointer.x");
        eval("this.deck" + this.dragObj.pl + "[this.dragObj.pos + i].y = pointer.y + y_shift*i");
      }
    }
  },

  //функция, которая выполняется, когда отпускаешь кнопку мыши при перетаскивании
  stopDrag(pointer) {
    this.input.on("pointerdown", this.startDrag, this);
    this.input.off("pointermove", this.doDrag, this);
    this.input.off("pointerup", this.stopDrag, this);
    this.dragObj.setDepth(0);

    if (pointer.y < 300) {
      //верхние плейсхолдеры

      // ace placeholder 1
      if (pointer.x > 499 && pointer.x < 660) {
        this.finalmove(8, x4);
      }
      //ace placeholder 2
      if (pointer.x > 659 && pointer.x < 820) {
        this.finalmove(9, x5);
      }
      //ace placeholder 3
      if (pointer.x > 819 && pointer.x < 980) {
        this.finalmove(10, x6);
      }
      //ace placeholder 4
      if (pointer.x > 979) {
        this.finalmove(11, x7);
      }
    } //нижние плейсхолдеры
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
    //this.dragObj.scale = 1;
  },

  //метод миграции карт между массивами
  peremeschenie(pl_out, xx) {
    //pl_out - массив, в который переносим
    //pl - массив, из которого переносим
    var obj; //карта(обьект) - на которую кладем
    var pl = this.dragObj.pl;
    eval("obj = this.deck" + pl_out + "[this.deck" + pl_out + ".length - 1]");
    //Если цвета не совпадают или кладем на плейсхолдер
    if (obj.color != this.dragObj.color || obj.name == "placeholder_14") {
      //если вес меньше на 1
      if (this.dragObj.weight == obj.weight - 1) {
        eval("this.deck" + pl_out + "[0].plo+=1"); //плюсуем счетчик открытых карт
        this.dragObj.x = xx;
        this.dragObj.y = y2 + eval("this.deck" + pl_out + ".length - 1") * y_shift;
        //запоминаем стартовые координаты
        this.dragObj.sx = this.dragObj.x;
        this.dragObj.sy = this.dragObj.y;

        //код ниже тянет пачку
        //если захватил больше одной карты
        var l = eval("this.deck" + pl_out + ".length"); //запоминаем позицию перемещения карты, за которую тянем до начала цикла
        if (this.upcard > 0) {
          console.log("Upcard - " + this.upcard);
          console.log("Drag - Pos - " + this.dragObj.pos);
          //console.log("Length - " + eval("this.deck" + this.dragObj.pl + ".length"));
          for (let i = 1; i < this.upcard + 1; i++) /*цикл по картам сверху*/ {
            //todo **************** */
            console.log("pl - " + pl);
            console.log("Up-" + i + "-pos: " + eval("this.deck" + pl + "[this.dragObj.pos + i].pos"));
            //todo **************** */
            //! Теряется карта как объект в цикле !!!

            eval("this.deck" + pl + "[this.dragObj.pos + i].x = xx");
            eval("this.deck" + pl + "[this.dragObj.pos + i].y = this.dragObj.y + y_shift*i");
            eval("this.deck" + pl + "[this.dragObj.pos + i].sx = xx");
            eval("this.deck" + pl + "[this.dragObj.pos + i].sy = this.dragObj.y + y_shift*i");
            eval("this.deck" + pl + "[this.dragObj.pos + i].setDepth(0)");
          }
          for (let i = 1; i < this.upcard + 1; i++) /*цикл по картам сверху*/ {
            eval("this.deck" + pl_out + "[0].plo += 1"); //плюсуем счетчик открытых карт
            //eval("this.deck" + this.dragObj.pl + "[this.dragObj.pos + i].scale = 1");
            //Perenos
            let temp = l + this.upcard + 1 - i;
            console.log("Befor - " + eval("this.deck" + pl_out + ".length - i"));
            eval("this.deck" + pl_out + "[temp] = this.deck" + pl + ".pop()"); //perenos mejdu massivami
            console.log("1 = " + temp + ", 2 = " + eval("this.deck" + pl_out + ".length - i"));
            eval("this.deck" + pl_out + "[temp].pos = this.deck" + pl_out + ".length - i");
            eval("this.deck" + pl + "[0].plo -= 1 "); //minusuem schetchik otkrytyj kart
            eval("this.deck" + pl_out + "[temp].pl = pl_out");
          }
          console.log("After - " + eval("this.deck" + pl_out + ".length - 1"));
          eval("this.dragObj.pos = l");
          eval("this.deck" + pl_out + "[l] = this.deck" + pl + ".pop()"); //perenos mejdu massivami
          eval("this.deck" + pl + "[0].plo -= 1"); //minusuem schetchik otkrytyj kart
          this.dragObj.pl = pl_out;
        } else {
          //Perenos
          console.log("Pos-1card befor - " + this.dragObj.pos);
          this.dragObj.pos = l;
          console.log("Pos-1card after - " + this.dragObj.pos);
          eval("this.deck" + pl_out + ".push(this.deck" + pl + ".pop())"); //perenos mejdu massivami
          console.log("Pos-in-massive- " + eval("this.deck" + pl_out + "[this.deck" + pl_out + ".length-1].pos"));
          eval("this.deck" + pl + "[0].plo -= 1"); //minusuem schetchik otkrytyj kart
          this.dragObj.pl = pl_out;
        }
        //открываем карту - убираем рубашку, если она есть, из placeholdera из которого взяли карту
        if (eval("this.deck" + pl + "[0].plc > 0")) {
          // console.log("PLC > 0");
          // console.log("PLO = " + eval("this.deck" + pl + "[0].plo"));
          if (eval("this.deck" + pl + "[0].plo") == 0) {
            // console.log("Ona");
            eval("this.deck" + pl + "[0].plo += 1"); //vozvrashaem nazad schetchik, potomu chto otkryli rubashku
            eval("this.deck" + pl + "[0].plcc -= 1");
            eval("this.deck" + pl + "[this.deck" + pl + ".length - 1].setInteractive()");
            // console.log("PLO2 = " + eval("this.deck" + pl + "[0].plo"));
            this.remove_shirt(pl);
          }
        }
        //! -- konec peremeschenija
      } else {
        this.dragObj.x = this.dragObj.sx;
        this.dragObj.y = this.dragObj.sy;
        //kod nizhe tianet pachku
        if (this.upcard > 0) {
          for (let i = 1; i < this.upcard + 1; i++) /*цикл po kartam sverhu*/ {
            eval("this.deck" + pl + "[this.dragObj.pos + i].x = this.dragObj.sx");
            eval("this.deck" + pl + "[this.dragObj.pos + i].y = this.dragObj.sy + y_shift*i");
          }
        }
      }
    } else {
      this.dragObj.x = this.dragObj.sx;
      this.dragObj.y = this.dragObj.sy;
      //kod nizhe tianet pachku
      if (this.upcard > 0) {
        for (let i = 1; i < this.upcard + 1; i++) /*цикл po kartam sverhu*/ {
          eval("this.deck" + pl + "[this.dragObj.pos + i].x = this.dragObj.sx");
          eval("this.deck" + pl + "[this.dragObj.pos + i].y = this.dragObj.sy + y_shift*i");
        }
      }
    }
  },
  //migration on final pl_out(ace)
  finalmove(pl_out, xx) {
    var obj;
    var pl = this.dragObj.pl;
    eval("obj = this.deck" + pl_out + "[this.deck" + pl_out + ".length - 1]");
    if (obj.suit == this.dragObj.suit || obj.name == "placeholder") {
      //esli ves bolshe na 1
      if (obj.weight == this.dragObj.weight - 1) {
        eval("this.deck" + pl_out + "[0].plo +=1");
        this.dragObj.x = xx;
        this.dragObj.y = y1; // + eval("this.deck" + pl_out + ".length - 1") * y_shift;
        this.dragObj.sx = this.dragObj.x;
        this.dragObj.sy = this.dragObj.y;

        //Perenos
        eval("this.dragObj.pos = this.deck" + pl_out + ".length");
        eval("this.deck" + pl_out + ".push(this.deck" + pl + ".pop())"); //perenos mejdu massivami
        eval("this.deck" + pl + "[0].plo -=1"); //minusuem schetchik otkrytyj kart
        this.dragObj.pl = pl_out;

        //открываем карту - убираем рубашку, если она есть, из placeholdera из которого взяли карту
        if (eval("this.deck" + pl + "[0].plc > 0")) {
          eval("this.deck" + pl + "[0].plo +=1"); //vozvrashaem nazad schetchik, potomu chto otkryli rubashku
          eval("this.deck" + pl + "[0].plc -=1");
          eval("this.deck" + pl + "[this.deck" + pl + ".length - 1].setInteractive()");
          this.remove_shirt(pl);
        }

        //! -- konec peremeschenija
      } else {
        this.dragObj.x = this.dragObj.sx;
        this.dragObj.y = this.dragObj.sy;
      }
    } else {
      this.dragObj.x = this.dragObj.sx;
      this.dragObj.y = this.dragObj.sy;
    }
  },
  //metod of remove shirts
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
  //metod of first card load
  first_load() {
    var k = 1;
    var posx = x1;
    var posy = y2;
    var j;
    var name;
    //vykladka rubashki
    this.shirt.push(this.add.sprite(x1, y1, "card_shirt", "card_shirt"));
    this.shirt[0].setDepth(1);
    this.shirt[0].name = "shirt";
    this.shirt[0].setInteractive();
    for (let i = 1; i <= 7; i++) {
      posy = y2;
      j = 1;
      eval("this.deck" + i + "[0] = this.add.sprite(posx, posy, 'placeholder', 'placeholder_14')");
      eval("this.deck" + i + "[0].plo = 0");
      eval("this.deck" + i + "[0].plc = 0");
      eval("this.deck" + i + "[0].weight = 14");
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
    this.deck8[0] = this.add.sprite(x4, y1, "placeholder", "placeholder_15");
    this.deck8[0].name = "placeholder";
    this.deck8[0].weight = 0;
    this.deck8[0].plo = 0;
    this.deck9[0] = this.add.sprite(x5, y1, "placeholder", "placeholder_15");
    this.deck9[0].weight = 0;
    this.deck9[0].plo = 0;
    this.deck9[0].name = "placeholder";
    this.deck10[0] = this.add.sprite(x6, y1, "placeholder", "placeholder_15");
    this.deck10[0].weight = 0;
    this.deck10[0].plo = 0;
    this.deck10[0].name = "placeholder";
    this.deck11[0] = this.add.sprite(x7, y1, "placeholder", "placeholder_15");
    this.deck11[0].weight = 0;
    this.deck11[0].plo = 0;
    this.deck11[0].name = "placeholder";
    //Nachalo
    this.deck12[0] = this.add.sprite(x1, y1, "placeholder", "placeholder_16");
    this.deck12[0].name = "placeholder";
    this.deck12[0].setInteractive();
    this.deck0[0] = this.add.sprite(x2, y1, "placeholder", "placeholder_14");
    this.deck0[0].name = "placeholder";
    this.deck0[0].plo = 0;
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
