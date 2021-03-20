import Vue from './vue';
// Определяем новый компонент под именем todo-item
Vue.component('todo-item', {
  template: '> {{ money }}</li>',
  props: ['money',`thisMonstorHP` ]

})

const app = new Vue( {
  el: '#app',
  data() {
    return {
      autoSave: true,
      inputValue: ``,
      money: 170,
      maxBank: 0,
      isDamage: true,
      settings: true,
      monstorLVL: 1,
      partMostors: 0,
      isBoss: false,
      bossTimer: 30000,
      bossTimerIsActiv: null,
      isNextMonstor: true,
      thisMonstorHP: 10,
      monstorHPcounter: 10,
      factory1: [
        { name: "Тотализатор", baseCost: 500, profit: 10 },
        { name: "Кузня", baseCost: 3000, profit: 50 },
        { name: "Самострелы", baseCost: 10000, profit: 250 },
        { name: "Металлургия", baseCost: 40000, profit: 1500 },
        { name: "Огнестрел", baseCost: 200000, profit: 30000 },
        { name: "Взрывчатка", baseCost: 1666666, profit: 600000 },
        { name: "ДВС", baseCost: 123456789, profit: 1200000 },
        { name: "Планер", baseCost: 9123456789, profit: 24000000 },
      ],
      damageDealer1: [
        { name: "Боевые искусства", baseCost: 15, profit: 1 },
        { name: "Соратник", baseCost: 100, profit: 5 },
        { name: "Личная гвардия", baseCost: 2000, profit: 25 },
        { name: "Маленькая армия", baseCost: 40000, profit: 150 },
        { name: "Армия страны", baseCost: 800000, profit: 1000 },
        { name: "Планетарная армия", baseCost: 16000000, profit: 10000 },
      ],
      factory: [],
      damageDealer: [
        {
          name: `Боевые искусства`,
          quantity: 1,
          baseCost: 15,
          nowCost: 15,
          profit: 1,
          text: { quantity: "Штук", profit: "Урон" },
        },
      ],
      styles: {
        progressBarMostor: {
          //width: `100%`,
          height: "30px",
          backgroundColor: "#c70c0c",
          textAalign: "center",
          lineHeight: "30px",
          color: "white",
        },
      },
    };
  },
  created: function () {
    // `this` указывает на экземпляр vm
    console.log('Значение a: ' + this.money)
    // генерация начальных объектов через конструкторы
    function Factory(name, baseCost, profit) {
      this.name = name;
      this.quantity = 0;
      this.baseCost = baseCost;
      this.nowCost = baseCost;
      this.isDamage = false;
      this.profit = profit;
      this.text = {
        quantity: `Штук`,
        profit: `Прибыль`,
      };
    }
    function DamageDealer(name, baseCost, profit) {
      this.name = name;
      this.quantity = 0;
      this.baseCost = baseCost;
      this.nowCost = baseCost;
      this.isDamage = false;
      this.profit = profit;
      this.text = {
        quantity: `Штук`,
        profit: `Урон`,
      };
    }
    for (let i = 0; i < this.factory1.length; i++) {
      this.factory[i] = new Factory(
        this.factory1[i].name,
        this.factory1[i].baseCost,
        this.factory1[i].profit
      );
    }
    for (let i = 1; i < this.damageDealer1.length; i++) {
      this.damageDealer[i] = new DamageDealer(
        this.damageDealer1[i].name,
        this.damageDealer1[i].baseCost,
        this.damageDealer1[i].profit
      );
    }
  },
  mounted() {
    this.startTimer();
    if (this.autoSave) {
    }
    
  },
  methods: {
    factorydamage(damage, pieces) {
      return damage * pieces;
    },
    monstorsHP(monstorLVL) {
      return monstorLVL * 2 + 10;
    },
    buyFactory(i) {
      if (this.isDamage) {
        if (this.money > this.damageDealer[i].nowCost) {
          return (
            (this.money = this.money - this.damageDealer[i].nowCost),
            this.damageDealer[i].quantity++,
            (this.damageDealer[i].nowCost = Math.round(
              Math.pow(this.damageDealer[i].nowCost, 1.05)
            ))
          );
        }
      } else {
        if (this.money > this.factory[i].nowCost) {
          return (
            (this.money = this.money - this.factory[i].nowCost),
            this.factory[i].quantity++,
            (this.factory[i].nowCost = Math.round(
              Math.pow(this.factory[i].nowCost, 1.05)
            ))
          );
        }
      }
    },
    clickDamage() {
      return (this.monstorHPcounter =
        this.monstorHPcounter -
        this.damageDealer[0].quantity * this.damageDealer[0].profit);
    },
    gameSave() {
      const save = JSON.stringify({
        money: this.money,
        monstorLVL: this.monstorLVL,
        factory: this.factory,
        damageDealer: this.damageDealer,
      });
      //Код выгружающий данный игрока в локал сторадж
      localStorage.setItem("save", save);
      console.log(save);
    },
    gameLoad() {
      const loadData = JSON.parse(localStorage.save);
      this.money = loadData.money;
      this.monstorLVL = loadData.monstorLVL;
      this.factory = loadData.factory;
      this.damageDealer = loadData.damageDealer;
    },
    startTimer() {
      setInterval(() => {
        this.monstorHPcounter =
          this.monstorHPcounter - this.damagePerSecond() / 100;
        this.money = this.money + this.moneyPerSecond() / 100;
      }, 10);
    },
    damagePerSecond() {
      let n = 0;
      for (let i = 1; i < this.damageDealer.length; i++) {
        n = n + this.damageDealer[i].quantity * this.damageDealer[i].profit;
      }
      return n;
    },
    moneyPerSecond() {
      let n = 0;
      for (let i = 0; i < this.factory.length; i++) {
        n = n + this.factory[i].quantity * this.factory[i].profit;
      }
      return n;
    },
    //Рендерит вкладку дамагеров или шахт, в зависимости от клика
    tabSettingsSelect(usersChoice) {
      if (usersChoice == "settings") {
        return (this.settings = true);
      } else if (usersChoice == "stat") {
        return (this.settings = false);
      } else {
        console.log(`error: ${usersChoice} is not valid`);
      }
    },
    tabFactorySelect(usersChoice) {
      if (usersChoice == "damage") {
        return (this.isDamage = true);
      } else if (usersChoice == "factory") {
        return (this.isDamage = false);
      } else {
        console.log(`error: ${usersChoice} is not valid`);
      }
    },
    //Отображение здоровья в виде процентов.
    proc() {
      const n = (this.monstorHPcounter / this.thisMonstorHP) * 100 + "%";
      return { width: n };
    },
    //Возырвщает CSS для обратного отсчета босса
    bossTimerDecrease() {
      const n = (this.bossTimer / 30000) * 100 + "%";
      return {
        width: n,
        backgroundColor: "#24b81f",
      };
    },
    //Возвращает сокращенное число с префиксом
    cutback(n) {
      const prefixList = [`k`, `m`, `b`, `t`, `k`, `K`, `s`, `S`];
      const nubnersList = [
        1000,
        1000000,
        1000000000,
        1000000000000,
        1000000000000000,
        1000000000000000000,
        1000000000000000000000,
        1000000000000000000000000,
      ];
      let result = n;
      for (let i = 0; i < nubnersList.length; i++) {
        if (n > nubnersList[i]) {
          result = n / nubnersList[i];
          result = result.toFixed(1);
          result += prefixList[i];
        }
      }

      return result;
    },
    isEnoughMoney(value) {
      if (value > this.money) {
        return "red";
      } else {
        return;
      }
    },
    //Возвращает информацию о части монстра
    partMostorsView() {
      if (this.partMostors >= 0.9) {
        return ``;
      } else {
        const a = `${Math.round(this.partMostors * 10)} / 10`;
        return a;
      }
    },
    monstorUp(isBoss, isBossDead) {
      if (isBoss && isBossDead) {
        this.thisMonstorHP = this.monstorsHP(this.monstorLVL) * 10;
        this.monstorHPcounter = this.monstorsHP(this.monstorLVL) * 10;
        this.money = this.money + this.monstorLVL * 80;
      }
      if (isBoss && !isBoss) {
        //! проверь, скорее всего тут джолжно быть isBoss && !isBossDead
        this.thisMonstorHP = this.monstorsHP(this.monstorLVL);
        this.monstorHPcounter = this.monstorsHP(this.monstorLVL);
      }
      this.thisMonstorHP = this.monstorsHP(this.monstorLVL);
      this.monstorHPcounter = this.monstorsHP(this.monstorLVL);
      this.money = this.money + this.monstorLVL * 2;
    },
    factoryFilter(obj){
      let result = [obj[0]];
      
      for (let i = 1; i < obj.length; i++) {
        if (obj[i].nowCost <= this.maxBank) {
          result[i] = obj[i];
        }
      }
      result.push(obj[result.length]);
      
      return result
    }
  },
  computed: {
    factoryListGeneration() {
      if (this.isDamage) {
        return this.factoryFilter(this.damageDealer);
      } else {
        return this.factoryFilter(this.factory);
        
      }
    },
  },
  watch: {
    inputValue(value) {
      if (value.length > 10) {
        this.inputValue = ``;
      }
    },
    monstorHPcounter(value) {
      if (value <= 0) {
        this.partMostors = this.partMostors + 0.1;

        if (this.partMostors >= 1 && this.isNextMonstor) {
          this.monstorLVL++;
          this.partMostors = 0;
        } else if (this.partMostors >= 0.9 && !this.isNextMonstor) {
          this.partMostors = this.partMostors - 0.1;
        }

        if (this.isBoss) {
          if (this.bossTimer > 0) {
            clearInterval(this.bossTimerIsActiv);
            console.log("Босс пройден");
            this.bossTimer = 30000;
            this.monstorUp(true, true);
          }
        }
        this.monstorUp(false);
      }
    },
    money(value) {
      if (value >= this.maxBank) {
        this.maxBank = this.money;
      }
    },

    //инициализирует босса
    monstorLVL(value) {
      if (!(value % 10)) {
        this.partMostors = 0.9;
        this.thisMonstorHP = this.monstorsHP(this.monstorLVL) * 10;
        this.monstorHPcounter = this.monstorsHP(this.monstorLVL) * 10;
        this.money = this.money + this.monstorLVL * 20;
        this.isBoss = true;
      } else {
        this.isBoss = false;
      }
    },
    isBoss(value) {
      if (value) {
        console.log("boss!!!");
        this.bossTimerIsActiv = setInterval(() => {
          this.bossTimer = this.bossTimer - 10;
        }, 10);
      }
    },
    bossTimer(value) {
      if (value <= 0 && this.thisMonstorHP > 0) {
        clearInterval(this.bossTimerIsActiv);
        console.log("Упс, ты не завалил боссса, придурок!");
        this.bossTimer = 30000;
        this.monstorLVL--;
        this.monstorUp(true, false);
        this.isNextMonstor = false;
      }
    },
  },
});



