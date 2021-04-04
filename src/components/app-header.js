import Vue from '../vue';

 Vue.component('app-header', {
  props: {
    money:Number,
    cutback:Function
  },
  template: `<header>
  <div class="glory">Слава 0</div>
  <div class="money">Деньги {{cutback(money) }}</div>
  <div class="lavale">Lvl 1</div>
  </header>
  `,

})