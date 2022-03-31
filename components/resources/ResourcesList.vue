<script>
export default {
  props: {
    resources: {
      type: Array,
      default: () => ([])
    },
    itemsCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      options: {},
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Tipo', value: 'type' },
        { text: 'Actions', value: 'actions' }
      ]
    }
  },
  watch: {
    options: {
      deep: true,
      handler () {
        console.log(this.options.page)
        this.$router.push({ query: { ...this.$route.query, page: this.options.page } })
      }
    }
  }
}
</script>

<template>
  <v-card>
    <v-card-title>
      Recursos ({{ $route.query.type }})
      <v-spacer />
      <v-btn elevation="0" color="primary" @click="$emit('open-editor')">
        Crear recurso
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table :server-items-length="itemsCount" :options.sync="options" :items="resources" :headers="headers">
        <template #[`item.actions`]="{item}">
          <v-btn small color="primary" elevation="0" @click="$emit('set-editing-resource', item)">
            Editar
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
