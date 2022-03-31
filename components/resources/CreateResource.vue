<script>
const initValues = {
  type: '',
  name: '',
  archived: false
}

export default {
  props: {
    isEditing: {
      required: false,
      type: Boolean,
      default: false
    },
    resourceEditing: {
      required: false,
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      data: {},
      typeResourceDefined: false,
      isLoading: false
    }
  },
  mounted () {
    const typeResource = this.$route.query.type || ''
    this.typeResourceDefined = typeResource.length > 0
    this.data = this.isEditing ? { ...this.resourceEditing } : { ...initValues }
    this.data.type = typeResource
  },
  methods: {
    async submitResource () {
      this.isLoading = true
      if (this.isEditing) {
        const resource = await this.$axios.put('/api/resources/' + this.resourceEditing._id, this.data)
        this.$emit('edit-resource', { newValues: resource.data.payload, resource: this.resourceEditing })
      } else {
        const resource = await this.$axios.post('/api/resources', this.data)
        this.$emit('add-resource', resource.data.payload)
      }
      this.isLoading = false
      this.data = { ...initValues }
    }
  }
}
</script>

<template>
  <v-card :loading="isLoading" :disabled="isLoading" tag="form" @submit.prevent="submitResource">
    <v-card-title>
      Crear un recurso
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="data.name" label="Nombre del recurso" />
      <v-text-field v-model="data.type" :disabled="typeResourceDefined" label="Tipo del recurso" />
      <v-checkbox v-model="data.archived" label="Archivado" />
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" color="primary" elevation="0">
        Insertar recurso
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
