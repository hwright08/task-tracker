<template>
  <div class="about">
    <h1>Settings</h1>
    <v-card>
      <v-card-title>Accounts</v-card-title>
      <v-card-text class="pb-0">
        <v-list dense>
          <v-list-item v-if="!accounts.length">
            <v-list-item-content>No Accounts</v-list-item-content>
          </v-list-item>
          <v-list-item v-for="(acct, index) in accounts" :key="acct">
            <v-list-item-content>{{ acct }}</v-list-item-content>
            <v-list-item-action class="ma-0">
              <v-btn icon>
                <v-icon color="red" @click="deleteAccount(index)">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <m-text-field v-model="accountName">
          <template #append-outer>
            <v-btn color="primary" class="mt-n2 ml-n2" tile @click="saveAccount">Add Account</v-btn>
          </template>
        </m-text-field>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MTextField from '@/components/MTextField';

export default {
  components: {
    MTextField
  },

  data: () => ({
    accountName: ''
  }),

  computed: {
    ...mapState(['accounts'])
  },

  methods: {
    ...mapActions(['deleteAccount', 'addAccount']),
    saveAccount() {
      this.addAccount(this.accountName);
      this.accountName = '';
    }
  }
}
</script>
