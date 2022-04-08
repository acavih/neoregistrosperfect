<template>
  <v-menu
    ref="menu"
    v-model="menu"
    transition="scale-transition"
    offset-y
    bottom
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="formattedDate"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="_value"
      no-title
      scrollable
    >
      <v-spacer />
      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="$refs.menu.save(date)"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import { format } from 'date-fns'
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      menu: false,
      date: '',
      formattedDate: ''
    }
  },
  computed: {
    _value: {
      get () { return this.date },
      set (value) {
        this.date = value
        this.formattedDate = format(new Date(value), 'P')
        this.$emit('input', value)
      }
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.value) {
        this.formattedDate = format(new Date(this.value), 'P')
        this.date = this.value
      }
    }, 200)
  }
}
</script>
