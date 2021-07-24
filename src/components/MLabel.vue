<template>
<v-row align="center" no-gutters>
  <v-col v-if="required" cols="auto">
    <v-icon color="red" size="10" class="mb-1">mdi-asterisk</v-icon>
  </v-col>
  <v-col class="pl-1 font-weight-bold black--text">
    <v-label v-bind="$attrs">
      <slot></slot>
    </v-label>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: 'mLabel',

  props: {
    required: { type: Boolean, default: false }
  }
}
</script>
