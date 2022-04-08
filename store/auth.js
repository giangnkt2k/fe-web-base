import axios from '@/utils/axios'
import {
  getToken,
  saveToken,
  destroyToken
}
  from '@/utils/jwt'
const ID_TOKEN_KEY = 'access_token'

export const state = () => ({
  token: ''
})

export const getters = {
  getToken (state) {
    return state.token
  }
}

export const mutations = {
  setAuthenticate (state, token) {
    const strToken = token.split('Bearer')
    saveToken(strToken[1].trim())
    axios.defaults.headers.common.Authorization = 'Bearer ' +
      strToken[1].trim()
    state.token = token
  },
  logout (state) {
    state.token = ''
    axios.defaults.headers.common.Authorization = ''
    destroyToken()
    this.$router.push('/login')
  },
  setToken (state, token) {
    const strToken = token.split('Bearer')
    state.token = strToken[1].trim()
    axios.defaults.headers.common.Authorization = 'Bearer ' +
      strToken[1].trim()
  }
}

export const actions = {
  initAuth (context, req) {
    try {
      if (!req) {
        context.commit('setToken', 'Bearer ' + getToken())
        return
      }

      if (!req.headers.cookie) {
        return
      }
      const serverToken = req.headers.cookie.match(
        new RegExp('(^| )' + ID_TOKEN_KEY + '=([^;]+)'))
      if (serverToken) {
        const token = serverToken[2]
        context.commit('setToken', 'Bearer ' + token)
      }
    } catch (e) {
      return e
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
