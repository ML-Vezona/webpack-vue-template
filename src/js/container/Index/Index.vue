<style lang="stylus" src="./index.sass">
</style>

<style>

</style>

<template lang="pug">

.container
  p this is good
  .wrap
    .insider1
    .insider2
  
  .for-loop
    span.loop1 {{name}}
    select.wish(v-model="cities")
      option(v-for="o, i in cities") {{o.name}}
    //- .city(v-for="city in cities") {{city.name}}

  
</template>

<script>

export default {
   name: 'index',
  data: () => ({
    name:"來一個迴圈吧",
    cities: [
      { name: 'New York' },
      { name: 'Tokyo' },
      { name: 'Montreal' }
    ]
  }),
  computed: {
    wishList(){

    }
    
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
