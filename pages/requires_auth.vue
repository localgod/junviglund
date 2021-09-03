 <template>
  <b-container>
   <h1>Requires login</h1>
  </b-container>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
    }
  },
}
</script>

<style scoped>
</style>
