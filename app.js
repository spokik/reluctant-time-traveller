
const App = {
  data() {
    return {
      title: `Список заметок`,
      placeholderString: "Введите заметку",
      autoSave: true,
      inputValue: ``,
      money: 0,
      isDamage: true,
      monstorLVL: 1,
      partMostors: 0,
      isBoss: false,
      bossTimer: 30000,
      bossTimerIsActiv: null,
      isNextMonstor: true,
      thisMonstorHP: 10,
      monstorHPcounter: 10,
      factory1: [{ "name": "Тотализатор", "baseCost": 500, "profit": 10 }, { "name": "Кузня", "baseCost": 3000, "profit": 1 }, { "name": "Самострелы", "baseCost": 10000, "profit": 1 }, { "name": "Металлургия", "baseCost": 40000, "profit": 1 }, { "name": "Огнестрел", "baseCost": 200000, "profit": 1 }, { "name": "Взрывчатка", "baseCost": 1666666, "profit": 1 }, { "name": "ДВС", "baseCost": 123456789, "profit": 1 }, { "name": "Планер", "baseCost": 9123456789, "profit": 1 }],
      damageDealer1: [{ name: "Боевые искусства", baseCost: 15, profit: 1, }, { name: "Соратники", baseCost: 100, profit: 5, },],
      factory: [],
      damageDealer: [{ name: `Боевые искусства`, quantity: 1, baseCost: 150, nowCost: 15, profit: 1, text: { "quantity": "Штук", "profit": "Урон" } }],
      styles: {
        progressBarMostor: {
          //width: `100%`,
          height: '30px',
          backgroundColor: '#c70c0c',
          textAalign: 'center',
          lineHeight: '30px',
          color: 'white',
        }
      },
      notes: [`найти места для рыбалки`, `Выкинуть отчистки от мандаринок`],
    }
  },
  mounted() {
    this.startTimer()


    if (this.autoSave) {

    }

    // генерация начальных объектов через конструкторы
    function Factory(name, baseCost, profit) {
      this.name = name
      this.quantity = 0
      this.baseCost = baseCost
      this.nowCost = baseCost
      this.isDamage = false
      this.profit = profit
      this.text = {
        quantity: `Штук`,
        profit: `Прибыль`
      }
    }
    function DamageDealer(name, baseCost, profit) {
      this.name = name
      this.quantity = 0
      this.baseCost = baseCost
      this.nowCost = baseCost
      this.isDamage = false
      this.profit = profit
      this.text = {
        quantity: `Штук`,
        profit: `Урон`
      }
    }
    for (let i = 0; i < this.factory1.length; i++) {
      this.factory[i] = new Factory(this.factory1[i].name, this.factory1[i].baseCost, this.factory1[i].profit)
    }
    for (let i = 1; i < this.damageDealer1.length; i++) {
      this.damageDealer[i] = new DamageDealer(this.damageDealer1[i].name, this.damageDealer1[i].baseCost, this.damageDealer1[i].profit)
    }

  },
  methods: {
    addNote(event) {
      if (this.inputValue !== ``) {
        this.notes.push(this.inputValue)
        this.inputValue = ``
      }
    },
    toUpperCase(item) {
      return item.toUpperCase(item)
    },
    removeNote(i) {
      this.notes.splice(i, 1)
    },
    //Выше примеры от Владелена
    factorydamage(damage, pieces) {
      return damage * pieces
    },
    monstorsHP(monstorLVL) {
      return monstorLVL * 2 + 10
    },
    buyFactory(i) {
      if (this.isDamage) {
        if (this.money > this.damageDealer[i].nowCost) {
          return (
            this.money = this.money - this.damageDealer[i].nowCost,
            this.damageDealer[i].quantity++,
            this.damageDealer[i].nowCost = Math.round(Math.pow(this.damageDealer[i].nowCost, 1.05))
          )
        }
      } else {
        if (this.money > this.factory[i].nowCost) {
          return (
            this.money = this.money - this.factory[i].nowCost,
            this.factory[i].quantity++,
            this.factory[i].nowCost = Math.round(Math.pow(this.factory[i].nowCost, 1.05))
          )
        }
      }

    },
    clickDamage() {
      return this.monstorHPcounter = this.monstorHPcounter - (this.damageDealer[0].quantity * this.damageDealer[0].profit)
    },
    gameSave() {
      const save = JSON.stringify({
        money: this.money,
        monstorLVL: this.monstorLVL,
        factory: this.factory,
        damageDealer: this.damageDealer
      })


      //Код выгружающий данный игрока в локал сторадж
      localStorage.setItem('save', save)
      console.log(save)

    },
    gameLoad() {

      const loadData = JSON.parse(localStorage.save);
      this.money = loadData.money
      this.monstorLVL = loadData.monstorLVL
      this.factory = loadData.factory
      this.damageDealer = loadData.damageDealer


    },
    startTimer() {
      setInterval(() => {
        //*Урон в секунду - урон сложенный от всех ДД. Сделать через цикл, когда добавится больше наносителей урона
        //*Ускорить время обработки
        this.monstorHPcounter = this.monstorHPcounter - (this.damageDealer[1].quantity * this.damageDealer[1].profit) // наносит урон от соратников в секунду
        this.money = this.money + (this.factory[0].quantity * this.factory[0].profit)

      }, 1000)

    },
    //Рендерит вкладку дамагеров или шахт, в зависимости от клика
    tabFactorySelect(usersChoice) {
      if (usersChoice == 'damage') {
        return this.isDamage = true
      } else if (usersChoice == 'factory') {
        return this.isDamage = false
      } else { console.log(`error: ${usersChoice} is not valid`) }
    },
    //Отображение здоровья в виде процентов.
    proc() {
      const n = (this.monstorHPcounter / this.thisMonstorHP) * 100 + "%"
      return { width: n }
    },
    //Возырвщает CSS для обратного отсчета босса
    bossTimerDecrease() {
      const n = (this.bossTimer / 30000) * 100 + "%"
      return {
        width: n,
        backgroundColor: '#24b81f'
      }
    },
    //Возвращает сокращенное число с префиксом
    cutback(n) {
      const prefixList = [`k`, `m`, `b`, `t`, `k`, `K`, `s`, `S`]
      const nubnersList = [
        1000,
        1000000,
        1000000000,
        1000000000000,
        1000000000000000,
        1000000000000000000,
        1000000000000000000000,
        1000000000000000000000000
      ]
      let result = n
      for (let i = 0; i < nubnersList.length; i++) {
        if (n > nubnersList[i]) {
          result = n / nubnersList[i]
          result = result.toFixed(1)
          result += prefixList[i]

        }

      }


      return result
    },
    //Возвращает информацию о части монстра
    partMostorsView() {
      if (this.partMostors >= 0.9) {
        return ``
      } else {
        const a = `${Math.round(this.partMostors * 10)} / 10`
        return a
      }
    },
    monstorUp(isBoss, isBossDead) {
      if (isBoss && isBossDead) {
        this.thisMonstorHP = this.monstorsHP(this.monstorLVL) * 10
        this.monstorHPcounter = this.monstorsHP(this.monstorLVL) * 10
        this.money = this.money + this.monstorLVL * 80
      }
      if (isBoss && !isBoss) {
        this.thisMonstorHP = this.monstorsHP(this.monstorLVL)
        this.monstorHPcounter = this.monstorsHP(this.monstorLVL)
      }
      this.thisMonstorHP = this.monstorsHP(this.monstorLVL)
      this.monstorHPcounter = this.monstorsHP(this.monstorLVL)
      this.money = this.money + this.monstorLVL * 2
    }
  },
  computed: {
    factoryListGeneration() {
      if (this.isDamage) {
        return this.damageDealer
      }
      else {
        return this.factory
      }
    },
  },
  watch: {
    inputValue(value) {
      if (value.length > 10) {
        this.inputValue = ``
      }
    },
    monstorHPcounter(value) {
      if (value <= 0) {
        this.partMostors = this.partMostors + 0.1
        if (this.partMostors >= 1 && this.isNextMonstor) {
          this.monstorLVL++
          this.partMostors = 0
        } else if (this.partMostors >= 0.9 && !this.isNextMonstor) {
          this.partMostors = this.partMostors - 0.1
        }

        if (this.isBoss) {
          if (this.bossTimer > 0) {
            clearInterval(this.bossTimerIsActiv)
            console.log('Босс пройден')
            this.bossTimer = 30000
            this.monstorUp(true, true)
          }
        }
        this.monstorUp(false)
      }
    },
    //инициализирует босса
    monstorLVL(value) {

      if (!(value % 10)) {
        this.partMostors = 0.9
        this.thisMonstorHP = this.monstorsHP(this.monstorLVL) * 10
        this.monstorHPcounter = this.monstorsHP(this.monstorLVL) * 10
        this.money = this.money + this.monstorLVL * 20
        this.isBoss = true
      } else {
        this.isBoss = false
      }
    },
    isBoss(value) {
      if (value) {
        console.log('boss!!!')
        this.bossTimerIsActiv = setInterval(() => {
          this.bossTimer = this.bossTimer - 10
        }, 10)
      }
    },
    bossTimer(value) {
      if (value <= 0 && this.thisMonstorHP > 0) {
        clearInterval(this.bossTimerIsActiv)
        console.log('Упс, ты не завалил боссса, придурок!')
        this.bossTimer = 30000
        this.monstorLVL--
        this.monstorUp(true, false)
        this.isNextMonstor = false
      }
    }


  },

}

const app = Vue.createApp(App)
app.mount('#VueJS')