import Vue from '../vue';
export default Vue.component('todo-item', {
  props: ['money'],
  template: '<li>money -  {{money}} </li>',

})