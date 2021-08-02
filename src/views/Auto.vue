<template>
<div>
  <h1>Automatic Task Recording</h1>
  <v-card>
    <v-card-text v-if="!started">
      <m-label for="account" required>Account</m-label>
      <m-autocomplete v-model="taskData.account" id="account" :items="accounts" :rules="[required]"></m-autocomplete>

      <m-label for="comments" class="mt-2">Comments</m-label>
      <m-textarea v-model="taskData.comments" id="comments"></m-textarea>
    </v-card-text>
    <v-card-text v-else>
      <h2>{{ taskData.account }}</h2>
      <p>{{ taskData.comments }}</p>
      <p>{{ runningTime }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="!started"
        :disabled="!taskData.account"
        color="primary"
        block
        @click="startTask"
      >
        Start Task
      </v-btn>
      <v-btn
        v-else
        block
        color="red darken-2 white--text"
        @click="endTask"
      >
        End Task
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import dayjs from 'dayjs';
import utils from '@/utils';
import MLabel from '@/components/MLabel';
import MAutocomplete from '@/components/MAutocomplete';
import MTextarea from '@/components/MTextarea';

export default {
  components: {
    MLabel,
    MAutocomplete,
    MTextarea
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },

  mounted() {
    if (this.openTask) {
      this.taskData = { ...this.openTask };
      this.started = true;
      this.seconds = dayjs().diff(dayjs(this.taskData.start, 'YYYY-MM-DD HH:mm:ss'), 'seconds');
      this.timer = setInterval(() => (this.seconds++), 1000);
    }
  },

  data: () => ({
    timer: undefined,
    started: false,
    seconds: 0,
    taskData: {
      account: '',
      comments: '',
      start: '',
      end: ''
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
    required: utils.required,
    ...mapActions(['updateTask', 'addTask']),
    startTask() {
      this.started = true;
      this.taskData.start = dayjs();
      this.seconds = 0;
      this.timer = setInterval(() => (this.seconds++), 1000);

      this.addTask({ ...this.taskData });
    },
    endTask() {
      this.started = false;
      this.taskData.end = dayjs();

      clearInterval(this.timer);
      this.updateTask({ ...this.taskData });

      this.taskData = {
        account: '',
        start: '',
        end: '',
        comments: ''
      };
    }
  }
};
</script>
