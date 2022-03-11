<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Acceder a la aplicación</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <template v-if="true">
        <nuxt />
      </template>
      <template v-else>
        <v-container>
          <v-btn to="/profile">Ir a la página de perfil</v-btn>
        </v-container>
      </template>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    user () {
      return this.$auth.$state.user
    },
    notIsLogged () {
      return this.$auth.loggedIn
    }
  }
}
</script>
