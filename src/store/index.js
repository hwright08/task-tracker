import Vue from 'vue';
import Vuex from 'vuex';
import dayjs from 'dayjs';
import _ from 'lodash';

Vue.use(Vuex);

function writeLocalStorage(key, val) {
  window.localStorage.setItem(key, JSON.stringify(val));
}

function readLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export default new Vuex.Store({
  state: {
    accounts: [],
    tasks: []
  },

  getters: {
    dailyTasks: state => date => {
      let todaysTasks = readLocalStorage(date);
      return todaysTasks ? todaysTasks.sort((a, b) => a.start >= b.start ? 1 : -1) : [];
    },

    openTask(state) {
      return _.find(state.tasks, { end: '' }) || null;
    }
  },

  mutations: {
    initialize(state, date = null) {
      if (!date) date = dayjs().format('YYYY-MM-DD');
      state.accounts = readLocalStorage('accounts') || [];
      state.tasks = readLocalStorage(date) || [];
    },

    addAccount(state, acctName) {
      state.accounts.push(acctName);
      state.accounts.sort();
    },

    deleteAccount(state, index) {
      state.accounts.splice(index, 1);
    },

    addTask(state, task) {
      state.tasks.push(task)
      state.tasks.sort((a, b) => dayjs(a).isBefore(dayjs(b)));
    },

    updateTask(state, task) {
      let i = _.findIndex(state.tasks, { id: task.id });
      state.tasks[i] = task;
    }
  },

  actions: {
    initialize({ commit }) {
      commit('initialize');
    },

    deleteAccount({ commit, state }, index) {
      commit('deleteAccount', index);
      writeLocalStorage('accounts', state.accounts);
    },

    addAccount({ commit, state }, acctName) {
      commit('addAccount', acctName);
      writeLocalStorage('accounts', state.accounts);
    },

    addTask({ commit, state }, task) {
      task.start = dayjs(task.start).format('YYYY-MM-DD HH:mm:ss');
      const maxId = Math.max(...state.tasks.map(t => t.id)) || 0;
      task.id = maxId + 1;
      commit('addTask', task);
      writeLocalStorage(dayjs().format('YYYY-MM-DD'), state.tasks);
    },

    updateTask({ commit, state }, task) {
      task.start = dayjs(task.start).format('YYYY-MM-DD HH:mm:ss');
      task.end = dayjs(task.end).format('YYYY-MM-DD HH:mm:ss');

      commit('updateTask', task);
      writeLocalStorage(dayjs().format('YYYY-MM-DD'), state.tasks);
    }
  },
  modules: {}
})
