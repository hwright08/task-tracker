<template>
<div>
  <h1>Manual Task Entry</h1>

  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <m-label for="date" required>Date</m-label>
          <m-text-field
            v-model="date"
            id="date"
            type="date"
            :rules="[required]"
          ></m-text-field>
        </v-col>
        <v-col cols="6">
          <m-label for="account" required>Account</m-label>
          <m-autocomplete
            v-model="account"
            id="account"
            :items="accounts"
            :rules="[required]"
          ></m-autocomplete>
        </v-col>
        <v-col cols="6">
          <m-label for="startTime" required>Start Time</m-label>
          <m-text-field
            v-model="startTime"
            type="time"
            :rules="[required]"
          ></m-text-field>
        </v-col>
        <v-col cols="6">
          <m-label for="endTime" required>End Time</m-label>
          <m-text-field
            v-model="endTime"
            type="time"
            :rules="[required]"
          ></m-text-field>
        </v-col>
        <v-col cols="12">
          <m-label for="comments">Comments</m-label>
          <m-textarea v-model="comments"></m-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="primary" :disabled="disabled" @click="save">Add Task</v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';
import utils from '@/utils';
import MAutocomplete from '@/components/MAutocomplete';
import MTextField from '@/components/MTextField';
import MTextarea from '@/components/MTextarea';
import MLabel from '@/components/MLabel';

export default {
  components: {
    MAutocomplete,
    MTextField,
    MTextarea,
    MLabel,
  },

  data: () => ({
    account: '',
    date: dayjs().format('YYYY-MM-DD'),
    startTime: '',
    endTime: '',
    comments: ''
  }),

  computed: {
    ...mapState(['accounts']),
    disabled() {
      return !this.account || !this.date || !this.startTime || !this.endTime;
    },
    dates() {
      return {
        start: `${this.date} ${this.startTime}`,
        end: `${this.date} ${this.endTime}`
      }
    }
  },

  methods: {
    ...mapActions(['addTask']),
    required: utils.required,
    save() {
      this.addTask({ account: this.account, comment: this.comment, ...this.dates });
      this.account = '';
      this.date = dayjs().format('YYYY-MM-DD');
      this.startTime = '';
      this.endTime = '';
      this.comment = '';
    }
  }
};
</script>
