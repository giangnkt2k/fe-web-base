export default (context) => {
  const token = context.store.getters['auth/getToken']
  if (token !== '' && token !== 'undefined') {
    return context.redirect('/')
  }
}
