<template>
  <v-container>
    <template v-if="!$auth.loggedIn">
      <login-form :message="message" @doLogin="login" />
    </template>
    <template v-else>
      <v-card>
        <v-card-title>Ya has accedido</v-card-title>
        <v-card-text>
          <v-btn elevation="0" to="/profile">
            Ir a la pagina de perfil
          </v-btn>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import LoginForm from '@/components/auth/login.vue'
export default {
  name: 'LoginPage',
  components: { LoginForm },
  layout: 'guestlayout',
  auth: false,
  data () {
    return {
      message: ''
    }
  },
  head () {
    return {
      title: 'Iniciar sesión'
    }
  },
  computed: {
    isLogged () {
      console.log('AUTH', this.$auth)
      return this.$auth.loggedIn
    }
  },
  async mounted () {
    console.log(this.$auth.$state.user)
    await this.$auth.logout()
  },
  methods: {
    async login (loginData) {
      console.log('Haciendo login', loginData)
      try {
        const response = await this.$auth.loginWith('local', { data: loginData })
        this.$router.push('/profile')
        console.log(response)
      } catch (error) {
        console.dir(error)
        if (error.isAxiosError) {
          this.$dialog.notify.error(error.response.data.message)
          this.message = error.response.data.message
        } else {
          this.$dialog.notify.error(error.response.data.message)
          this.message = error.message
        }
        console.log('un error sucedio')
      }
    }
  }
}
</script>
