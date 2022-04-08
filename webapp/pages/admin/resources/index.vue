<script>
import ResourcesPage from '~/components/resources/ResourcesPage.vue'
export default {
  components: { ResourcesPage },
  data () {
    return {
      title: 'Recursos'
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>

<template>
  <resources-page v-model="title" />
</template>
