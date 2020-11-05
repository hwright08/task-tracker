<template>
<div>
  <h1>Automatic Task Recording</h1>
  <div v-if="!started">
    <v-autocomplete
      v-model="taskData.account"
      label="Account"
      :items="accounts"
      hide-details
      outlined
      dense
    />
    <v-textarea
      label="Description"
      v-model="taskData.comment"
      rows="2"
      hide-details
      outlined
      dense
    />
    <v-btn :disabled="!taskData.account" block @click="startTask">Start Task</v-btn>
  </div>
  <div v-else>
    <p>Started task for {{ taskData.account }}</p>
    <p>Time Running: {{ runningTime }}</p>
    <v-btn block @click="endTask">End Task</v-btn>
  </div>

</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },

  mounted() {
    if (this.openTask) {
      this.taskData = { ...this.openTask };
      this.started = true;
      this.seconds = moment().diff(moment(this.taskData.startTime, 'YYYY-MM-DD HH:mm:ss'), 'seconds');
      this.timer = setInterval(() => (this.seconds++), 1000);
    }
  },

  data: () => ({
    timer: undefined,
    started: false,
    seconds: 0,
    taskData: {
      account: '',
      comment: '',
      startTime: '',
      endTime: ''
    }
  }),

  computed: {
    ...mapState(['accounts']),
    ...mapGetters(['openTask']),
    runningTime() {
      let hours = Math.floor(this.seconds / 60 / 60);
      let minutes = Math.floor((this.seconds - (hours * 60 * 60)) / 60);
      let seconds = Math.floor(this.seconds - (hours * 60 * 60) - (minutes * 60));

      return `${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
    }
  },

  methods: {
    ...mapActions(['updateTask', 'addTask']),

    startTask() {
      this.started = true;
      this.taskData.startTime = moment();
      this.seconds = 0;
      this.timer = setInterval(() => (this.seconds++), 1000);

      this.addTask({ ...this.taskData });
    },

    endTask() {
      this.started = false;
      this.taskData.endTime = moment();
      clearInterval(this.timer);

      this.updateTask({ ...this.taskData });

      this.taskData = {
        account: '',
        comment: '',
        startTime: '',
        endTime: ''
      };
    }
  }
};
</script>
