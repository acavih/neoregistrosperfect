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
    multipleSelections: {
      type: Boolean,
      default: false
    },
    initialValue: {
      type: Object,
      default: () => ({}),
      required: false
    },
    initialValues: {
      required: false,
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      resourceItems: [],
      selectedItems: [...this.initialValues],
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
        multiple: this.multipleSelections,
        label: this.labelResource,
        itemValue: '_id',
        returnObject: false,
        chips: this.multipleSelections,
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
    this.selectedItems = [...this.initialValues]
    this.selectedItem = { ...this.initialValue }
    if (this.multipleSelections) {
      this.$emit('input', this.selectedItems)
    } else {
      this.$emit('input', this.selectedItem)
    }
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
  <v-sheet color="transparent">
    <v-autocomplete
      v-if="multipleSelections"
      v-bind="autocompleteAttrs"
      v-model="selectedItems"
      :search-input.sync="userQuery"
      @keydown="handleQuery"
    >
      <template #prepend>
        <v-btn icon :disabled="loading" @click="retrieveAll">
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
    <v-autocomplete
      v-else
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
  </v-sheet>
</template>
