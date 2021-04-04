import Vue from '../vue';

 Vue.component('todo-item', {
  props: ['money'],
  template: '<li>money -  {{money}} </li>',

})