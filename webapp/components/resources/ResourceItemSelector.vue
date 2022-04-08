<script>
export default {
  props: {
    labelResource: {
      type: String,
      default: 'Selector sin etiqueta'
    },
    typeResource: {
      type: String,
      required: true
    },
    initialValue: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  data () {
    return {
      resourceItems: [],
      selectedItem: { ...this.initialValue },
      userQuery: '',
      itemText: 'name',
      loading: false
    }
  },
  computed: {
    autocompleteAttrs () {
      return {
        items: this.resourceItems,
        itemText: this.itemText,
        label: this.labelResource,
        itemValue: '_id',
        returnObject: false,
        loading: this.loading,
        disabled: this.loading,
        clearable: true
      }
    }
  },
  watch: {
    selectedItem () {
      this.$emit('input', this.selectedItem)
    },
    selectedItems () {
      this.$emit('input', this.selectedItems)
    }
  },
  async mounted () {
    await this.retrieveAll()
    this.selectedItem = { ...this.initialValue }
    this.$emit('input', this.selectedItem)
  },
  methods: {
    async retrieveAll () {
      this.loading = true
      const resources = await this.$axios.get('/api/resources', { params: { typeResource: this.typeResource, paginate: false } })
      this.resourceItems = resources.data.payload
      this.loading = false
    },
    handleQuery (e) {
      if (this.userQuery && e.key === 'Enter') {
        setTimeout(() => {
          const results = this.resourceItems.filter(e => e[this.itemText].includes(this.userQuery))
          if (results.length === 0) {
            this.createNewElement(this.userQuery)
          }
        }, 120)
      }
    },
    async createNewElement (resourceText) {
      const type = this.typeResource
      const resourcesRequest = await this.$axios.post('/api/resources', { type, name: resourceText })
      const resourceCreated = resourcesRequest.data.payload
      this.$dialog.notify.success(resourcesRequest.data.message)
      this.resourceItems.push(resourceCreated)
      if (this.multipleSelections) {
        this.selectedItems.push(resourceCreated)
      } else {
        this.selectedItem = resourceCreated
      }
      this.userQuery = null
    }
  }
}
</script>

<template>
  <v-autocomplete
    v-bind="autocompleteAttrs"
    v-model="selectedItem"
    :search-input.sync="userQuery"
    @keydown="handleQuery"
  >
    <template #prepend>
      <v-btn :disabled="loading" icon @click="retrieveAll">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </template>
    <template #no-data>
      <v-card elevation="0">
        <v-card-text>
          Pulsa enter para crear nuevo elemento
        </v-card-text>
      </v-card>
    </template>
  </v-autocomplete>
</template>
