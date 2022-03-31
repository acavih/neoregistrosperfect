<script>
import ResourcesList from './ResourcesList.vue'
import CreateResource from '@/components/resources/CreateResource.vue'

export default {
  components: { CreateResource, ResourcesList },
  data () {
    return {
      resources: [],
      editorActive: false,
      editingResource: false,
      activeResource: {},
      typeResources: [],
      itemsCount: 0
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      handler () {
        this.retrieveAll()
      }
    }
  },
  async mounted () {
    await this.retrieveAll()
  },
  methods: {
    goToType (type) {
      this.$router.push('/admin/resources?type=' + type)
      this.$emit('input', 'Viendo recursos de tipo ' + type)
    },
    async retrieveAll () {
      const basePath = '/api/resources/'
      const typeResource = this.$route.query.type || ''
      const itemsReqeust = this.$axios.get(basePath, {
        params: { typeResource, page: 1, ...this.$route.query }
      })
      const [resources, typeResources] = await Promise.all([
        itemsReqeust,
        this.$axios.get(basePath, { params: { scope: 'types' } })
      ])
      this.resources = resources.data.payload
      this.itemsCount = resources.data.itemsCount
      this.typeResources = typeResources.data.payload
    },
    addResource (resource) {
      this.resources.payload.push(resource)
      this.editingResource = false
      this.editorActive = false
      this.retrieveAll()
    },
    editResource ({ resource, newValues }) {
      resource.name = newValues.name
      resource.archived = newValues.archived
      resource.type = newValues.type
      this.editingResource = false
      this.activeResource = {}
      this.editorActive = false
    },
    setEditingResource (resource) {
      this.editingResource = true
      this.activeResource = resource
      this.editorActive = true
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <resources-list :items-count="itemsCount" :resources="resources" @open-editor="editorActive = true" @set-editing-resource="setEditingResource" />
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-card-title>Tipos de recursos</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item to="/admin/resources" exact>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Todos</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-for="type in typeResources" :key="type" :active="$route.query.type === type" @click="goToType(type)">
                <v-list-item-content>
                  <v-list-item-title>{{ type }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="editorActive" @click:outside="editorActive = false">
      <create-resource
        v-if="editorActive"
        :is-editing="editingResource"
        :resource-editing="activeResource"
        @reload="retrieveAll"
        @add-resource="addResource"
        @edit-resource="editResource"
      />
    </v-dialog>
  </v-container>
</template>
