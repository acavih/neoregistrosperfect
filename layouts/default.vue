<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Registros</v-toolbar-title>
      <v-spacer />
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
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
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      menu: false
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
