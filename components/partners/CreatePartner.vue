<script>
import { mapState } from 'vuex'
import ResourceItemSelector from '../resources/ResourceItemSelector.vue'
const memberInitial = {
  code: '',
  name: '',
  surname: '',
  bornDate: null,
  sipCard: '',
  email: '',
  phone: '',
  observations: '',
  pendent: ''
  /* sex: null,
  partner: null,
  nationality: null,
  residency: null */
}
export default {
  components: { ResourceItemSelector },
  data () {
    return {
      member: { ...memberInitial }
    }
  },
  computed: {
    ...mapState({
      data: state => state.partners.item
    }),
    editingMember () {
      return typeof this.$route.params.partner !== 'undefined'
    }
  },
  mounted () {
    if (this.editingMember) {
      this.member = {
        ...this.data
      }
    }
  },
  methods: {
    doClose () {
      if (!this.editingMember) {
        this.member = { ...memberInitial }
      }
      console.log('cerrando')
      this.$emit('close')
    },
    async submitMember () {
      console.log('submitigng member', this.member)
      if (this.editingMember) {
        this.updatePartner()
      } else {
        await this.createPartner()
      }
      this.doClose(this.member)
    },
    async createPartner () {
      try {
        await this.$axios.post('/api/partners', this.member)
        this.$dialog.notify.success('Miembro creado')
      } catch (error) {
        console.log('🚀 ~ file: CreatePartner.vue ~ line 36 ~ submitMember ~ error', error)
        this.$dialog.notify.error('El miembro no se ha podido crear: ' + error.message)
      }
    },
    async updatePartner () {
      try {
        const partnerId = this.member.id
        const partner = {
          ...this.member
        }
        console.log(this.member, partner)
        debugger
        await this.$axios.put('/api/partners/' + partnerId, partner)
        await Promise.all([
          await this.$store.dispatch('partners/fetchPartner', partnerId),
          await this.$store.dispatch('attentions/fetchAttentions', partnerId)
        ])
        this.$dialog.notify.success('Miembro actualizado')
      } catch (error) {
        this.$dialog.notify.error('El miembro no se ha podido actualizar: ' + error.message)
      }
    }
  }
}
</script>

<template>
  <v-card tag="form" @submit.prevent="submitMember">
    <v-card-title class="pa-0">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          {{ editingMember ? 'Editar socio' : 'Crear socio' }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="doClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text class="mt-4">
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field v-model.trim="member.code" label="Codigo" />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model.trim="member.name" label="Nombre" />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model.trim="member.surname" label="Apellidos" />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model.trim="member.phone" label="Teléfono" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model.trim="member.sipCard" label="Tarjeta sip" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model.trim="member.email" label="Correo electrónico" />
        </v-col>
        <v-col cols="12" md="3">
          <resource-item-selector v-model.trim="member.sex" :multiple-selections="false" :initial-value="member.sex" :type-resource="'sexos'" :label-resource="'Sexo'" />
        </v-col>
        <v-col cols="12" md="3">
          <resource-item-selector v-model.trim="member.partner" :multiple-selections="false" :initial-value="member.partner" :type-resource="'socioonos'" :label-resource="'Socio o no'" />
        </v-col>
        <v-col cols="12" md="3">
          <resource-item-selector v-model.trim="member.nationality" :multiple-selections="false" :initial-value="member.nationality" :type-resource="'nacionalidads'" :label-resource="'Nacionalidad'" />
        </v-col>
        <v-col cols="12" md="3">
          <resource-item-selector v-model.trim="member.residency" :multiple-selections="false" :initial-value="member.residency" :type-resource="'residencias'" :label-resource="'Residencia'" />
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea v-model.trim="member.observations" label="Observaciones" />
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea v-model.trim="member.pendent" label="Cosas pendientes" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" color="primary">
        {{ editingMember ? 'Actualizar socio' : 'Guardar socio' }}
      </v-btn>
      <v-btn @click="doClose">
        Cancelar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
