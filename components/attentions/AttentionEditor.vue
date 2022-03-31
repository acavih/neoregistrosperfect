<script>
import VuetifyDatePicker from '../VuetifyDatePicker.vue'
import ResourceInputSelector from '../resources/ResourceItemSelector.vue'
export default {
  components: { VuetifyDatePicker, ResourceInputSelector },
  props: {
    partnerName: {
      type: String,
      required: true
    },
    attention: {
      type: Object,
      default: () => ({})
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
        { multiple: true, columns: 4, attentionKey: 'projects', key: 'proyctos', text: 'Proyectos' },
        { multiple: true, columns: 4, attentionKey: 'volunteer', key: 'volunteer', text: 'Voluntariado' },
        { multiple: false, columns: 12, attentionKey: 'placeAttention', key: 'lugaratencions', text: 'Lugar de atencion' }
      ]
    }
  },
  computed: {
    editing () {
      return this.attention._id !== undefined
    }
  },
  methods: {
    submitData () {
      this.$emit('close')
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
            <resource-input-selector v-model="attentionData[key.attentionKey]" :initial-values="attentionData[key.attentionKey]" :multiple-selections="key.multipleSelections" :label-resource="key.text" :type-resource="key.key" />
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
