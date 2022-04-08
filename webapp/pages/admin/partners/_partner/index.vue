<script>
import { format } from 'date-fns'
import { mapState, mapGetters } from 'vuex'
import AttentionCard from '@/components/attentions/AttentionCard.vue'
import CreateMember from '@/components/partners/CreatePartner.vue'
import AttentionEditor from '@/components/attentions/AttentionEditor.vue'

export default {
  components: { AttentionCard, CreateMember, AttentionEditor },
  filters: {
    date (value) {
      return format(new Date(value), 'P')
    }
  },
  async asyncData (ctx) {
    const partnerId = ctx.route.params.partner

    await Promise.all([
      await ctx.store.dispatch('partners/fetchPartner', partnerId),
      await ctx.store.dispatch('attentions/fetchAttentions', partnerId)
    ])
    return {}
  },
  data () {
    return {
      editingMember: false,
      creatingAttention: false
    }
  },
  head () {
    return {
      title: 'Atenciones de ' + this.data.name + ' ' + this.data.surname
    }
  },
  computed: {
    ...mapState({
      data: state => state.partners.item
    }),
    ...mapGetters({
      attentions: 'attentions/attentionsGrouped',
      edad: 'partners/edad',
      formattedDate: 'partners/formattedDate'
    })
  },
  methods: {
    async updateData () {
      console.log('actualizando atenciones')
      const partnerId = this.$route.params.partner
      await Promise.all([
        await this.$store.dispatch('partners/fetchPartner', partnerId),
        await this.$store.dispatch('attentions/fetchAttentions', partnerId)
      ])
    }
  }
}
</script>

<template>
  <v-sheet>
    <v-dialog v-model="editingMember" fullscreen>
      <create-member @close="editingMember = false" />
    </v-dialog>
    <v-breadcrumbs>
      <v-breadcrumbs-item href="/admin/partners" @click.prevent="$router.go(-1)">
        Listado de miembros
      </v-breadcrumbs-item>
      <v-icon>mdi-chevron-right</v-icon>
      <v-breadcrumbs-item disabled>
        {{ data.name }} {{ data.surname }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-container>
      <v-card>
        <v-card-title>
          Información {{ data.name }} {{ data.surname }}
          <v-spacer />
          <v-btn color="primary" elevation="0" @click="editingMember = true">
            Editar miembro
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <tbody>
              <tr>
                <th>Código del miembro</th>
                <td>{{ data.code }}</td>
              </tr>
              <tr>
                <th>Correo electrónico</th>
                <td>{{ data.email }}</td>
              </tr>
              <tr>
                <th>Fecha de nacimiento</th>
                <td>{{ formattedDate }} ({{ edad }} años)</td>
              </tr>
              <tr>
                <th>Tarjeta sip</th>
                <td>{{ data.sipCard }}</td>
              </tr>
              <tr v-if="data.residency">
                <th>Residencia</th>
                <td>{{ data.residency.name }}</td>
              </tr>
              <tr v-if="data.nationality">
                <th>Nacionalidad</th>
                <td>{{ data.nationality.name }}</td>
              </tr>
              <tr v-if="data.partner">
                <th>Socio o no</th>
                <td>{{ data.partner.name }}</td>
              </tr>
              <tr v-if="data.sex">
                <th>Sexo</th>
                <td>{{ data.sex.name }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-card class="mt-5" outlined>
            <v-card-title>Cosas pendientes</v-card-title>
            <v-card-text>
              <v-alert color="warning" dark>
                {{ data.pendent || 'No hay nada pendiente' }}
              </v-alert>
            </v-card-text>
          </v-card>
          <v-card class="mt-5" outlined>
            <v-card-title>Observaciones</v-card-title>
            <v-card-text>
              <v-alert color="info" dark>
                {{ data.observations || 'No hay observaciones' }}
              </v-alert>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
      <v-card class="mt-5" elevation="0">
        <v-card-title>
          Listado de atenciones
          <v-spacer />
          <v-btn color="primary" elevation="0" @click="creatingAttention = true">
            Nueva atención
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-timeline align-top dense>
            <v-timeline-item v-for="attentionsList in attentions" :key="attentionsList.data" small>
              <v-card class="mb-4" color="primary">
                <v-card-title>
                  <v-toolbar elevation="0" color="primary" dark>
                    {{ attentionsList.date | date }}
                  </v-toolbar>
                </v-card-title>
                <v-card-text>
                  <attention-card v-for="attention in attentionsList.items" :key="attention._id" :partner-name="data.name + ' ' + data.surname + '(' + data.code + ')'" :attention="attention" @update="updateData" />
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-container>
    <v-dialog v-model="creatingAttention" fullscreen>
      <attention-editor :partner-name="data.name + ' ' + data.surname" @update="updateData" @close="creatingAttention = false" />
    </v-dialog>
  </v-sheet>
</template>
