<script>
import { mapState } from 'vuex'
import CreateMember from '@/components/partners/CreatePartner.vue'
import Paginator from '@/components/utils/PaginatorComponent.vue'
export default {
  components: { CreateMember, Paginator },
  async asyncData (ctx) {
    await ctx.store.dispatch('partners/fetchPartners', ctx.query)
    return {
      q: ctx.route.query.q || '',
      creatingMember: false
    }
  },
  computed: {
    ...mapState({
      data: state => state.partners.items,
      headers: state => state.partners.headers
    })
  },
  watch: {
    q () {
      this.$router.push({
        query: {
          ...this.$route.query,
          q: this.q,
          page: 1
        }
      })
    }
  },
  watchQuery: ['q', 'page', 'limit']
}
</script>

<template>
  <v-container>
    <v-breadcrumbs>
      <v-breadcrumbs-item to="/admin/partners" disabled>
        Listado de miembros
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card elevation="0">
      <v-card-title>
        <v-toolbar>
          <v-toolbar-title>
            Listado de miembros
          </v-toolbar-title>
          <v-spacer />
          <v-btn elevation="0" color="primary" @click="creatingMember = true">
            Añadir miembro
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-card>
          <v-card-text>
            <v-text-field v-model="q" label="Buscar mimebro por codigo" />
            <v-data-table
              :headers="headers"
              :items="data.items"
              :server-items-length="data.count"
              hide-default-footer
            >
              <template #[`item.actions`]="{item}">
                <v-btn small :to="'/admin/partners/' + item._id" elevation="0">
                  Ver miembro
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
    <paginator v-if="data" :total-items="data.count" />
    <v-dialog v-model="creatingMember" fullscreen>
      <create-member @close="creatingMember = false" />
    </v-dialog>
  </v-container>
</template>
