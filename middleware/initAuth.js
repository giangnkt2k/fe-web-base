export default (context) => {
  context.store.dispatch('auth/initAuth', context.req)
}
