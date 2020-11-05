<template>
<div>
  <h1>Today's Task History</h1>

  <h2>Account Summary</h2>
  <v-data-table
    :headers="groupHeaders"
    :items="taskGroups"
  >
    <template #item.hours="{ item }">
      {{ item.hours | twoDecimals }}
    </template>

    <template #item.percent="{ item }">
      {{ item.percent | twoDecimals }} %
    </template>
  </v-data-table>
  <p>Total Hours: {{ totalHours | twoDecimals }}</p>

  <h2>Task Summary</h2>
  <v-data-table
    :headers="headers"
    :items="computedTasks"
  >
    <template #item.startTime="{item}">
      {{ item.startTime | timeOnly }}
    </template>

    <template #item.endTime="{item}">
      {{ item.endTime | timeOnly }}
    </template>

    <template #item.percent="{item}">
      {{ item.percent }} %
    </template>
  </v-data-table>

</div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';

export default {
  filters: {
    timeOnly(date) {
      return moment(date, 'YYYY-MM-DD HH:mm:ss').format('hh:mm:ss A');
    },
    twoDecimals(val) {
      return val.toFixed(2);
    }
  },

  data: () => ({
    headers: [
      { value: 'account', text: 'Account' },
      { value: 'startTime', text: 'Start Time' },
      { value: 'endTime', text: 'End Time' },
      { value: 'hours', text: 'Hours' },
      { value: 'percent', text: 'Percent of Day' },
      { value: 'comment', text: 'Task Description' }
    ],

    groupHeaders: [
      { value: 'account', text: 'Account' },
      { value: 'hours', text: 'Hours' },
      { value: 'percent', text: 'Percent of Day' }
    ]
  }),

  computed: {
    ...mapGetters(['computedTasks', 'taskGroups']),
    totalHours() {
      return _.reduce(this.taskGroups, (sum, i) => {
        let a = sum += i.hours;
        return a;
      }, 0);
    }
  }
};
</script>
