<script>
export default {
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
        <v-text-field label="Correo electrónico" v-model="loginData.email" />
        <v-text-field label="Contraseña" type="password" v-model="loginData.password" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn type="submit" elevation="0" color="primary">Acceder a la aplicación</v-btn>
      </v-card-actions>
    </v-card>
</template>