<template>
  <div class="about">
    <h1>Settings</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Accounts</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item v-for="(acct, i) in accounts" :key="acct">
                <v-list-item-content>
                  {{ acct }}
                </v-list-item-content>
                <v-list-item-action class="ma-0">
                  <v-btn icon @click="deleteAccount(i)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-text-field outlined dense hide-details v-model="acctName"></v-text-field>
            <v-btn :disabled="!acctName" @click="saveAccount">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title>Working Hours</v-card-title>
          <v-card-text>
            <v-row>
              <v-text-field
                v-model="hours"
                type="number"
                outlined
                dense
                hide-details
                :disabled="!editHours"
              />
              <v-btn v-if="!editHours" icon @click="editHours = true">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn v-else @click="editHours = false; saveHours(hours)">Save</v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  created() {
    this.hours = this.workingHours;
  },

  data: () => ({
    acctName: '',
    editHours: false,
    hours: 0
  }),

  computed: {
    ...mapState(['accounts', 'workingHours'])
  },

  methods: {
    ...mapActions(['deleteAccount', 'addAccount', 'saveHours']),
    saveAccount() {
      this.addAccount(this.acctName);
      this.acctName = '';
    }
  }
}
</script>
