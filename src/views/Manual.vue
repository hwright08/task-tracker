<template>
<div>
  <h1>Manual Task Entry</h1>
  <v-autocomplete
    v-model="account"
    label="Account"
    :items="accounts"
    outlined
    dense
    hide-details
  />

  <v-row>
    <v-col>
      <v-text-field
        v-model="startDate"
        label="Start Date"
        type="date"
        outlined
        dense
        hide-details
      />
    </v-col>
    <v-col>
      <v-text-field
        v-model="startTime"
        label="Start Time"
        type="time"
        outlined
        dense
        hide-details
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-text-field
        v-model="endDate"
        label="End Date"
        type="date"
        outlined
        dense
        hide-details
      />
    </v-col>
    <v-col>
      <v-text-field
        v-model="endTime"
        label="End Time"
        type="time"
        outlined
        dense
        hide-details
      />
    </v-col>
  </v-row>

  <v-textarea
    v-model="comment"
    label="Task Description"
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
    startDate: moment().format('YYYY-MM-DD'),
    startTime: '',
    endDate: moment().format('YYYY-MM-DD'),
    endTime: '',
    comment: ''
  }),

  computed: {
    ...mapState(['accounts']),
    disabled() {
      return !this.account || !this.startDate || !this.startTime || !this.endDate || !this.endTime;
    },
    dates() {
      return {
        startTime: `${this.startDate} ${this.startTime}`,
        endTime: `${this.endDate} ${this.endTime}`
      }
    }
  },

  methods: {
    ...mapActions(['addTask']),
    save() {
      this.addTask({ account: this.account, comment: this.comment, ...this.dates });
      this.account = '';
      this.startDate = moment().format('YYYY-MM-DD');
      this.startTime = '';
      this.endDate = moment().format('YYYY-MM-DD');
      this.endTime = '';
      this.comment = '';
    }
  }
};
</script>
