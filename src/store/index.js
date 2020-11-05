import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';
import _ from 'lodash';

Vue.use(Vuex)

function writeLocalStorage(key, val) {
  window.localStorage.setItem(key, JSON.stringify(val));
}

function readLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export default new Vuex.Store({
  state: {
    accounts: [],
    workingHours: 8,
    tasks: []
  },

  getters: {
    computedTasks(state) {
      let tasks = [];
      _.forEach(state.tasks, task => {
        if (task.endTime === '') return;

        let hours = moment(task.endTime, 'YYYY-MM-DD HH:mm:ss').diff(moment(task.startTime, 'YYYY-MM-DD HH:mm:ss'), 'hours', true);
        let percent = (state.workingHours < 1 ? 0 : hours / state.workingHours) * 100;

        hours = hours.toFixed(2);
        percent = percent.toFixed(2);
        tasks.push({ ...task, hours, percent });
      });
      return tasks;
    },

    openTask(state) {
      return _.find(state.tasks, { endTime: '' }) || null;
    },

    taskGroups(state) {
      let groups = _.reduce(state.tasks, (groups, task) => {
        if (task.endTime === '') return groups;

        let diff = moment(task.endTime, 'YYYY-MM-DD HH:mm:ss').diff(moment(task.startTime, 'YYYY-MM-DD HH:mm:ss'), 'hours', true);
        if (groups[task.account]) {
          groups[task.account].hours += diff;
          groups[task.account].percent = (groups[task.account].hours / state.workingHours) * 100
        } else {
          groups[task.account] = {
            hours: diff,
            percent: (diff / state.workingHours) * 100
          };
        }

        return groups;
      }, {});

      // turn object into array
      let groupArray = [];
      _.forEach(Object.keys(groups), group => {
        groupArray.push({ account: group, ...groups[group] });
      });

      return groupArray;
    }
  },

  mutations: {
    initialize(state) {
      state.accounts = readLocalStorage('accounts') || [];
      state.workingHours = readLocalStorage('workingHours') || 8;
      state.tasks = readLocalStorage(moment().format('YYYY-MM-DD')) || [];
    },

    deleteAccount(state, index) {
      state.accounts.splice(index, 1);
    },

    addAccount(state, acctName) {
      state.accounts.push(acctName);
      state.accounts.sort();
    },

    saveHours(state, hours) {
      state.workingHours = hours;
    },

    addTask(state, task) {
      state.tasks.push(task)
      state.tasks.sort((a, b) => moment(a).isBefore(moment(b)));
    },

    updateTask(state, task) {
      let i = _.findIndex(state.tasks, { endTime: '' });
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

    saveHours({ commit }, hours) {
      let correctedHours = hours <= 0 ? 1 : hours;
      commit('saveHours', correctedHours);
      writeLocalStorage('workingHours', correctedHours);
    },

    addTask({ commit, state }, task) {
      task.startTime = moment(task.startTime).format('YYYY-MM-DD HH:mm:ss');
      commit('addTask', task);
      writeLocalStorage(moment().format('YYYY-MM-DD'), state.tasks);
    },

    updateTask({ commit, state }, task) {
      task.startTime = moment(task.startTime).format('YYYY-MM-DD HH:mm:ss');
      task.endTime = moment(task.endTime).format('YYYY-MM-DD HH:mm:ss');

      commit('updateTask', task);
      writeLocalStorage(moment().format('YYYY-MM-DD'), state.tasks);
    }
  },
  modules: {}
})
