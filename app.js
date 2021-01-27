
const App = {
  data() {
    return {
      title: `Список заметок`,
      placeholderString: "Введите заметку",
      inputValue: ``,
      money: 10000,
      isDamage: true,
      monstorLVL: 1,
      thisMonstorHP: 10,
      monstorHPcounter: 0,
      factory: [
        {
          name: `Тотализатор`,
          quantity: 0,
          baseCost: 500,
          nowCost: 500,
          isDamage: false,
          damagePerSecond: 1
        },
        {
          name: `Кузня`,
          quantity: 0,
          baseCost: 3000,
          nowCost: 3000,
          isDamage: false,
          damagePerSecond: 1
        },
        {
          name: `Самострелы`,
          quantity: 0,
          baseCost: 10000,
          nowCost: 10000,
          isDamage: false,
          damagePerSecond: 1
        },
        {
          name: `Металлургия`,
          quantity: 0,
          baseCost: 40000,
          nowCost: 40000,
          isDamage: false,
          damagePerSecond: 1
        },
        {
          name: `Огнестрел`,
          quantity: 0,
          baseCost: 200000,
          nowCost: 200000,
          isDamage: false,
          damagePerSecond: 1
        },
        {
          name: `Взрывчатка`,
          quantity: 0,
          baseCost: 1666666,
          nowCost: 1666666,
          isDamage: false,
          damagePerSecond: 1
        },
        {
          name: `ДВС`,
          quantity: 0,
          baseCost: 123456789,
          nowCost: 123456789,
          isDamage: false,
          damagePerSecond: 1
        },
        {
          name: `Планер`,
          quantity: 0,
          baseCost: 9123456789,
          nowCost: 9123456789,
          isDamage: false,
          damagePerSecond: 1
        }
      ],
      damageDealer: [{
        name: `Боевые искусства`,
        quantity: 1,
        baseCost: 15,
        nowCost: 15,
        damagePerSecond: 1
      },
      {
        name: `Соратники`,
        quantity: 5,
        baseCost: 100,
        nowCost: 100,
        damagePerSecond: 2
      }
      ],
      styles: {
        progressBarBoss: {
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
      return this.thisMonstorHP = this.thisMonstorHP - (this.damageDealer[0].quantity * this.damageDealer[0].damagePerSecond)
    },
    startTimer() {
      setInterval(() => {
        //*Урон в секунду - урон сложенный от всех ДД. Сделать через цикл, когда добавится больше наносителей урона
        this.thisMonstorHP = this.thisMonstorHP - (this.damageDealer[1].quantity * this.damageDealer[1].damagePerSecond) // наносит урон от соратников в секунду
      }, 1000)

    },
    tabFactorySelect(usersChoice) {
      if (usersChoice == 'damage') {
        return this.isDamage = true
      } else if (usersChoice == 'factory') {
        return this.isDamage = false
      } else { console.log(`error: ${usersChoice} is not valid`) }
    },
    proc() {
      const n = this.monstorsHP(this.monstorLVL) / this.thisMonstorHP + "%"
      return { width: n }
    },
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
    thisMonstorHP(value) {
      if (value <= 0) {
        this.monstorLVL++
        this.thisMonstorHP = this.monstorsHP(this.monstorLVL)
        this.money = this.money + this.monstorLVL * 2
      }
    }

  },

}

const app = Vue.createApp(App)
app.mount('#VueJS')
