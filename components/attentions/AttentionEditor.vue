<script>
import VuetifyDatePicker from '../VuetifyDatePicker.vue'
import ResourceInputSelectors from '../resources/ResourceItemSelectors.vue'
import ResourceInputSelector from '../resources/ResourceItemSelector.vue'
export default {
  components: { VuetifyDatePicker, ResourceInputSelectors, ResourceInputSelector },
  props: {
    partnerName: {
      type: String,
      required: true
    },
    attention: {
      type: Object,
      default: () => ({})
    },
    editingAttention: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      attentionData: { ...this.attention },
      keys: [
        { multiple: true, columns: 6, attentionKey: 'attentionReasons', key: 'motivosatencions', text: 'Razones de atención' },
        { multiple: true, columns: 6, attentionKey: 'derivedTo', key: 'derivaciones', text: 'Derivado a' },
        { multiple: true, columns: 6, attentionKey: 'derivedFrom', key: 'derivaciones', text: 'Derivado de' },
        { multiple: true, columns: 6, attentionKey: 'attentionsTypes', key: 'tipoatenciones', text: 'Tipos de atención' },
        { multiple: true, columns: 4, attentionKey: 'formation', key: 'formacions', text: 'Formación' },
        { multiple: true, columns: 4, attentionKey: 'projects', key: 'proyectos', text: 'Proyectos' },
        { multiple: true, columns: 4, attentionKey: 'volunteer', key: 'volunteer', text: 'Voluntariado' },
        { multiple: false, columns: 12, attentionKey: 'placeAttention', key: 'lugaratencions', text: 'Lugar de atencion' }
      ]
    }
  },
  computed: {
    editing () {
      return this.attention._id !== undefined
    },
    attentionPayload () {
      const keysResources = [
        'attentionReasons',
        'attentionsTypes',
        'derivedFrom',
        'derivedTo',
        'formation',
        'projects',
        'volunteer'
        // 'placeAttention'
      ]
      const payload = { ...this.attentionData }
      keysResources.forEach((key) => {
        if (payload[key] !== undefined) {
          payload[key] = payload[key].map((item) => {
            console.log(item)
            return typeof payload[key] !== 'string' ? item : item._id
          })
        }
      })
      payload.placeAttention = typeof payload.placeAttention === 'string' ? payload.placeAttention : payload.placeAttention._id
      return payload
    }
  },
  methods: {
    submitData () {
      let result = false
      if (this.editingAttention) {
        result = this.updateAttention()
      } else {
        result = this.createAttention()
      }
      if (result) {
        this.$emit('update')
        this.$emit('close')
      }
    },
    async updateAttention () {
      try {
        const response = await this.$axios.put('/api/attentions/' + this.attention._id, this.attentionPayload)
        console.log('response', response)
        return true
      } catch (error) {
        console.log('error', error)
        this.$dialog.notify.success('Error al actualizar la atención ' + error.message)
        return false
      }
    },
    createAttention () {
      try {
        const response = this.$axios.post('/api/attentions', this.attentionPayload, {
          params: { partner: this.$route.params.partner }
        })
        console.log('response', response)
        return true
      } catch (error) {
        console.log('error', error)
        this.$dialog.notify.success('Error al crear la atención ' + error.message)
        return false
      }
    }
  }
}
</script>

<template>
  <v-card tag="form" @submit.prevent="submitData">
    <v-card-title class="pa-0">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          {{ editing ? 'Editando' : 'Nueva' }} atención de {{ partnerName }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-container>
        <vuetify-date-picker v-model="attentionData.dateAttention" :label="'Fecha de la atencion'" />
        <v-row>
          <v-col v-for="key in keys" :key="key.text" :md="key.columns">
            <resource-input-selectors v-if="key.multiple" v-model="attentionData[key.attentionKey]" :initial-values="attentionData[key.attentionKey]" :label-resource="key.text" :type-resource="key.key" />
            <resource-input-selector v-else v-model="attentionData[key.attentionKey]" :initial-value="attentionData[key.attentionKey]" :label-resource="key.text" :type-resource="key.key" />
          </v-col>
        </v-row>
        <v-textarea v-model="attentionData.comment" label="Comentario de la atencion" />
        <vuetify-date-picker v-model="attentionData.datePendent" :label="'Fecha cosas pendientes'" />
        <v-textarea v-model="attentionData.pendent" label="Cosas pendientes" />
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" type="submit">
        Guardar cambios
      </v-btn>
      <v-btn @click="$emit('close')">
        Cancelar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
