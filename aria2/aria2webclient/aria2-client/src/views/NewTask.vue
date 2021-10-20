<template>
  <div>
    <div>
      <textarea v-model="uris" name="" id="" cols="50" rows="10"></textarea>
    </div>
    <button @click="start">确定</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uris: '',
    }
  },
  methods: {
    async start() {
      let uris = this.uris.split('\n').map(it => it.trim())
      let taskIds = await window.aria2.addUri(uris)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>