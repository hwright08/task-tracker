<template>
<div>
  <v-row>
    <v-col>
      <h1>Task History</h1>
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="2">
      <m-text-field v-model="date" id="date" type="date"></m-text-field>
    </v-col>
  </v-row>

  <v-card>
    <v-data-table
      :headers="headers"
      :items-per-page="Number.MAX_SAFE_INTEGER"
      :items="tasks"
      group-by="account"
      hide-default-footer
      dense
    >
      <template #item.start="{ item }">
        {{ item.start | timeOnly }}
      </template>

      <template #item.end="{ item }">
        {{ item.end | timeOnly }}
      </template>

      <template #item.hours="{ item }">
        {{ item | hours }}
      </template>

      <template #item.percent="{ item }">
        {{ convertToPercent(item) }}%
      </template>

      <template #group.header="{ group, headers, remove }">
        <td class="primary white--text" :colspan="headers.length - 1">{{ group }}</td>
        <td class="primary text-right">
          <v-btn icon @click="remove">
            <v-icon color="white">mdi-minus</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import _ from 'lodash';
import MTextField from '@/components/MTextField';

export default {
  name: 'History',

  components: {
    MTextField
  },

  filters: {
    timeOnly(date) {
      return dayjs(date, 'YYYY-MM-DD HH:mm:ss').format('hh:mm:ss A');
    },
    hours(task) {
      const { start, end } = task;
      const seconds = dayjs(end).diff(start, 'second');
      return (seconds / 60 / 60).toFixed(2);
    }
  },

  data: () => ({
    date: dayjs().format('YYYY-MM-DD'),
    headers: [
      { value: 'account', text: 'Account' },
      { value: 'start', text: 'Start Time' },
      { value: 'end', text: 'End Time' },
      { value: 'hours', text: 'Hours' },
      { value: 'percent', text: 'Percent' },
      { value: 'comment', text: 'Task Description' },
    ]
  }),

  computed: {
    ...mapGetters(['dailyTasks']),
    tasks() {
      return this.dailyTasks(this.date);
    },
    totalSeconds() {
      return this.tasks.reduce((sum, val) => {
        return sum + dayjs(val.end).diff(val.start, 'second');
      }, 0);
    }
  },

  methods: {
    convertToPercent(task) {
      const { start, end } = task;
      const seconds = dayjs(end).diff(start, 'second');
      return ((seconds / this.totalSeconds) * 100).toFixed(2);
    }
  }
};
</script>
