<script>
export default {
  name: 'UserProfile',
  computed: {
    user () {
      return this.$auth.$state.user
    }
  }
}
</script>

<template>
  <v-container>
    <p>Bienvenido {{ user.email }}</p>
  </v-container>
</template>
