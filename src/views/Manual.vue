<template>
<div>
  <h1>Manual Task Entry</h1>
  <v-autocomplete
    v-model="account"
    label="Account"
    class="mb-2"
    :items="accounts"
    outlined
    dense
    hide-details
  />

  <v-text-field
    v-model="date"
    label="Date"
    class="mb-2"
    type="date"
    outlined
    dense
    hide-details
  />
  <v-text-field
    v-model="startTime"
    label="Start Time"
    class="mb-2"
    type="time"
    outlined
    dense
    hide-details
  />
  <v-text-field
    v-model="endTime"
    label="End Time"
    class="mb-2"
    type="time"
    outlined
    dense
    hide-details
  />
  <v-textarea
    v-model="comment"
    label="Task Description"
    class="mb-2"
    rows="2"
    outlined
    dense
    hide-details
  />

  <v-btn block :disabled="disabled" @click="save">Save Task</v-btn>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  data: () => ({
    account: '',
    date: moment().format('YYYY-MM-DD'),
    startTime: '',
    endTime: '',
    comment: ''
  }),

  computed: {
    ...mapState(['accounts']),
    disabled() {
      return !this.account || !this.date || !this.startTime || !this.endTime;
    },
    dates() {
      return {
        startTime: `${this.date} ${this.startTime}`,
        endTime: `${this.date} ${this.endTime}`
      }
    }
  },

  methods: {
    ...mapActions(['addTask']),
    save() {
      this.addTask({ account: this.account, comment: this.comment, ...this.dates });
      this.account = '';
      this.date = moment().format('YYYY-MM-DD');
      this.startTime = '';
      this.endTime = '';
      this.comment = '';
    }
  }
};
</script>
