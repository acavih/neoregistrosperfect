import Vue from 'vue'

export const dataMixin = Vue.extend({
  watch: {
    options: {
      deep: true,
      handler () {
        const { page, itemsPerPage } = this.options
        const query = {
          ...this.$route.query,
          page,
          limit: itemsPerPage || limit
        }
        this.$router.push({ query })
      }
    }
  },
  watchQuery: ['page', 'limit', 'q']
})
