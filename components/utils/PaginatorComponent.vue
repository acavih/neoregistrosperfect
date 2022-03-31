<script>
import { mapState } from 'vuex'
export default {
  props: {
    totalItems: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      options: {
        page: Number(this.$route.query.page || 1),
        limit: Number(this.$route.query.limit || 10)
      }
    }
  },
  computed: {
    ...mapState({
      itemsPerPageOptions: state => state.pagination.itemsPerPageOptions
    }),
    totalPages () {
      return Math.ceil(this.totalItems / this.options.limit)
    }
  },
  watch: {
    options: {
      deep: true,
      handler () {
        this.overrideQuery()
      }
    },
    '$route.query.page': {
      deep: true,
      handler () {
        this.options.page = Number(this.$route.query.page || 1)
      }
    }
  },
  methods: {
    overrideQuery () {
      const newProps = this.options
      this.$router.push({
        query: {
          ...this.$route.query,
          ...newProps
        }
      })
    }
  }
}
</script>

<template>
  <v-sheet>
    <v-flex class="flex-row d-flex justify-space-between">
      <v-select v-model="options.limit" :full-width="false" style="max-width: 150px" :items="itemsPerPageOptions" />
      <v-pagination
        v-model="options.page"
        :length="totalPages"
        :total-visible="7"
        :items-per-page="options.itemsPerPage"
      />
    </v-flex>
  </v-sheet>
</template>
