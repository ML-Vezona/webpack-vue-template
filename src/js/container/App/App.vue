<style lang="stylus" src="./app.styl">
</style>

<template lang="pug">
.app-root
  router-view
</template>

<script>

export default {
  name: 'App',
  data: () => ({
  }),
  computed: {
    
  },
  methods: {
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  mounted() {
  },
  beforeDestroy() {
  },
  components: {
  },
};
</script>
