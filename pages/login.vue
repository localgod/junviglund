<template>
  <b-container>
    <h1>Login</h1>
  </b-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.$auth.loginWith('auth0')
  },
}
</script>

<style scoped></style>
