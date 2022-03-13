import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('idea/my-idea', { params })
}

export const getAll = async (params = {}) => {
  return await axios.get('idea', { params })
}

export const add = async (params = {}) => {
  return await axios.post('idea', params)
}

export const upload = async (params = {}) => {
  return await axios.post('upload', params)
}

export const update = async (params = {}) => {
  return await axios.put(`idea/${params.id}`, params)
}

export const getListCategory = async (params = {}) => {
  return await axios.get('category')
}

export const details = async (id) => {
  return await axios.get(`idea/${id}`)
}

export const destroy = async (id) => {
  return await axios.delete(`idea/${id}`)
}
