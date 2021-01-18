const App = {
  data() {
    return {
      title: `Список заметок`,
      placeholderString: "Введите заметку",
      inputValue: ``,
      money: 0,
      monstorLVL: 1,
      thisMonstorHP: 10,
      factory: [
        {
          name: `Боевые искусства`,
          quantity: 1,
          baseCost: 15,
          nowCost: 15,
          damagePerSecond: 1
        },
        {
          name: `Соратники`,
          quantity: 0,
          baseCost: 100,
          nowCost: 100,
          damagePerSecond: 2
        },
        {
          name: `Тотализатор`,
          quantity: 0,
          baseCost: 500,
          nowCost: 500,
          damagePerSecond: 1
        },
        {
          name: `Кузня`,
          quantity: 0,
          baseCost: 3000,
          nowCost: 3000,
          damagePerSecond: 1
        },
        {
          name: `Самострелы`,
          quantity: 0,
          baseCost: 10000,
          nowCost: 10000,
          damagePerSecond: 1
        },
        {
          name: `Металлургия`,
          quantity: 0,
          baseCost: 40000,
          nowCost: 40000,
          damagePerSecond: 1
        },
        {
          name: `Огнестрел`,
          quantity: 0,
          baseCost: 200000,
          nowCost: 200000,
          damagePerSecond: 1
        },
        {
          name: `Взрывчатка`,
          quantity: 0,
          baseCost: 1666666,
          nowCost: 1666666,
          damagePerSecond: 1
        },
        {
          name: `ДВС`,
          quantity: 0,
          baseCost: 123456789,
          nowCost: 123456789,
          damagePerSecond: 1
        },
        {
          name: `Планер`,
          quantity: 0,
          baseCost: 9123456789,
          nowCost: 9123456789,
          damagePerSecond: 1
        }
      ],
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
      if (this.money > this.factory[i].nowCost) {
        return (
          this.money = this.money - this.factory[i].nowCost,
          this.factory[i].quantity++,
          this.factory[i].nowCost = Math.round(Math.pow(this.factory[i].nowCost, 1.05))
        )
      }
    },
    damageAtMonstors() {
      return this.thisMonstorHP = this.thisMonstorHP - (this.factory[0].quantity * this.factory[0].damagePerSecond)
    },
    startTimer() {
      setInterval(() => {
        this.thisMonstorHP = this.thisMonstorHP - (this.factory[1].quantity * this.factory[1].damagePerSecond) // наносит урон от соратников в секунду
        //! Добавить урон в секунду от остальных возможных шахт
        //! добавить деньги в секунду от предпиятий
      }, 1000)

    },

  },
  computed: {
    оптимизирует() {
      const info = `Если вычисляемое методом исчисляется из данных приложения, лучше использовать компьютед`
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

  }
}

const app = Vue.createApp(App)
app.mount('#VueJS')
