<template>
<div>
  <h1>Today's Task History</h1>

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

export default {
  filters: {
    timeOnly(date) {
      return moment(date, 'YYYY-MM-DD HH:mm:ss').format('hh:mm:ss A');
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
    ]
  }),

  computed: {
    ...mapGetters(['computedTasks'])
  }
};
</script>
