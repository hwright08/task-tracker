<style>
  .v-application, .v-card__text {
    color: black !important;
  }
</style>

<template>
  <v-app>
    <v-app-bar app color="primary darken-3 white--text">
      <v-toolbar-title>Task Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn tile text height="100%" color="white" to="/">Auto Record</v-btn>
      <v-btn tile text height="100%" color="white" to="/manual">Manual Entry</v-btn>
      <v-btn tile text height="100%" color="white" to="/history">History</v-btn>
      <v-btn tile text height="100%" color="white" to="/settings">Settings</v-btn>
    </v-app-bar>
    <v-main class="grey lighten-4">
      <v-container fluid>
        <router-view />
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
