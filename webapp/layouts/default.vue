<template>
  <v-app class="app">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="showDrawer = !showDrawer" />
      <v-toolbar-title>Registros</v-toolbar-title>
      <v-spacer />
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            color="secondary"
            elevation="0"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Menu de usuario
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            Has accedido como {{ user.email }}
          </v-card-title>
          <!--
          <v-list>
          </v-list>

          <v-divider></v-divider>

          <v-list>
          </v-list>
          -->

          <v-card-actions>
            <v-spacer />

            <v-btn color="error" text @click="logout">
              Logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="showDrawer" app>
      <v-list class="grey elevation-4">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold white--text">
              Registros
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item to="/admin/partners">
          <v-list-item-content>
            <v-list-item-title>Socios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/resources">
          <v-list-item-content>
            <v-list-item-title>Recursos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      menu: false,
      showDrawer: true
    }
  },
  computed: {
    user () {
      return this.$auth.$state.user
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

$bodyBG: map-get($map: $red, $key: 'lighten-2');

.app {
  background-color: $bodyBG;
}
</style>
