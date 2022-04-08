<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<template>
  <v-card tag="form" @submit.prevent="$emit('doLogin', loginData)">
    <v-card-title>
      Acceder a la aplicación
    </v-card-title>
    <v-card-text>
      <v-alert v-if="message" color="error" dark>
        El email o la contraseña son incorrectos
      </v-alert>
      <v-text-field v-model.trim="loginData.email" label="Correo electrónico" />
      <v-text-field v-model.trim="loginData.password" label="Contraseña" type="password" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn type="submit" elevation="0" color="primary">
        Acceder a la aplicación
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
