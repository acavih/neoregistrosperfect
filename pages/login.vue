<template>
  <v-container>
    <login-form @doLogin="login" />
  </v-container>
</template>

<script>
import LoginForm from '@/components/auth/login.vue'
export default {
  components: {LoginForm},
  layout: 'guestlayout',
  auth: false,
  async mounted () {
    console.log(this.$auth.$state.user)
    await this.$auth.logout()
  },
  methods: {
    async login (loginData) {
      console.log('Haciendo login', loginData)
      try {
        const response = await this.$auth.loginWith('local', {data: loginData})
        console.log(response)
      } catch (error) {
        console.log(error)
        console.log('un error sucedio')
      }
    }
  }
}
</script>
