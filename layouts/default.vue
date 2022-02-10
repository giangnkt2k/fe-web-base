<template>
  <div class="wrapper-login-page">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayoutTemplate',
  middleware: ['initAuth', 'auth']
}
</script>
