<template>
  <div class="wrapper-login-page">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'LayoutAuth',
  middleware: ['initAuth', 'hasLogin']
}
</script>
