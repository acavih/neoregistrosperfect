<script>
import { format } from 'date-fns'
import AttentionEditor from './AttentionEditor.vue'

export default {
  components: { AttentionEditor },
  filters: {
    date (value) {
      return format(new Date(value), 'dd/MM/yyyy')
    }
  },
  props: {
    attention: {
      type: Object,
      default: () => ({})
    },
    partnerName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      attentionData: { ...this.attention },
      attentionEdit: { ...this.attention },
      editing: false,
      keys: [
        { key: 'attentionReasons', text: 'Razones de atención' },
        { key: 'derivedTo', text: 'Derivado a' },
        { key: 'derivedFrom', text: 'Derivado de' },
        { key: 'attentionsTypes', text: 'Tipos de atención' },
        { key: 'formation', text: 'Formación' },
        { key: 'projects', text: 'Proyectos' },
        { key: 'volunteer', text: 'Voluntariado' }
      ]
    }
  },
  methods: {
    editAttention () {
      this.editing = true
      this.attentionEdit = { ...this.attention }
      this.$router.push({ params: { attention: this.attentionEdit._id } })
    },
    showEditModal () {
      this.editing = true
    },
    deleteAttention () {
      console.log('eliminando atención')
    },
    async reloadAttention () {
      console.log('reloading')
      try {
        const partnerId = this.$route.params.partner
        await Promise.all([
          await this.$store.dispatch('partners/fetchPartner', partnerId),
          await this.$store.dispatch('attentions/fetchAttentions', partnerId)
        ])
        console.log(this.attention)
        this.attentionData = { ...this.attention }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <v-card outlined class="mb-4">
    <v-card-title>
      <v-spacer />
      <v-btn icon @click="editAttention">
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn icon @click="deleteAttention">
        <v-icon color="red">
          mdi-delete
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <tbody>
          <tr v-for="key in keys" :key="key.key">
            <th>{{ key.text }}</th>
            <td>{{ attentionData[key.key].map(a => a.name).join(', ') }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-alert>
        {{ attentionData.comment }}
      </v-alert>
      <template v-if="attentionData.datePendent">
        <v-card outlined color="warning" class="darken-4" dark>
          <v-card-title>
            Cosas pendientes ({{ attentionData.datePendent | date }})
          </v-card-title>
          <v-card-text>
            {{ attentionData.pendent }}
          </v-card-text>
        </v-card>
      </template>

      <v-dialog v-model="editing" fullscreen>
        <attention-editor :editing-attention="true" :attention="attentionData" :partner-name="partnerName" @update="reloadAttention" @close="editing = false" />
      </v-dialog>
    </v-card-text>
    <v-card />
  </v-card>
</template>
