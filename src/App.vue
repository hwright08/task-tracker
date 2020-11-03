<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Task Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn tile text height="100%" to="/">Home</v-btn>
      <v-btn tile text height="100%" to="/auto">Auto Record</v-btn>
      <v-btn tile text height="100%" to="/manual">Manual Entry</v-btn>
      <v-btn tile text height="100%" to="/settings">Settings</v-btn>
      <v-btn tile text height="100%" to="/history">History</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  created() {
    this.initialize();
  },

  methods: {
    ...mapActions(['initialize'])
  }
};
</script>
