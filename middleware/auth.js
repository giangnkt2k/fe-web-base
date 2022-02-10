export default (context) => {
  const token = context.store.getters['auth/getToken']
  if (token === '' || token === 'undefined') {
    // eslint-disable-next-line no-console
    return context.redirect('/login')
  }
}
