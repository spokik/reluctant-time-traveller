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
          quantity: 10,
          damagePerSecond: 1
        },
        {
          name: `Соратники`,
          quantity: 10,
          damagePerSecond: 1
        },
        {
          name: `Тотализатор`,
          quantity: 3,
          damagePerSecond: 1
        },
        {
          name: `Кузня`,
          quantity: 3,
          damagePerSecond: 1
        },
        {
          name: `Самострелы`,
          quantity: 3,
          damagePerSecond: 1
        },
        {
          name: `Металлургия`,
          quantity: 3,
          damagePerSecond: 1
        },
        {
          name: `Огнестрел`,
          quantity: 3,
          damagePerSecond: 1
        },
        {
          name: `Взрывчатка`,
          quantity: 3,
          damagePerSecond: 1
        },
        {
          name: `ДВС`,
          quantity: 3,
          damagePerSecond: 1
        },
        {
          name: `Планер`,
          quantity: 3,
          damagePerSecond: 1
        }
      ],
      notes: [`найти места для рыбалки`, `Выкинуть отчистки от мандаринок`],
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
    damageAtMonstors() {
      return this.thisMonstorHP = this.thisMonstorHP - 1 - (this.factory[0].quantity * this.factory[0].damagePerSecond)
    }

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
        this.thisMonstorHP = this.monstorLVL * 2 + 10 //погуглить как использовать метод здесь
        this.money = this.money + this.monstorLVL * 2
      }
    }

  }
}


const app = Vue.createApp(App)
app.mount('#VueJS')