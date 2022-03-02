import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('qam/category', { params })
}

export const add = async (params = {}) => {
  return await axios.post('qam/category', params)
}

export const update = async (params = {}) => {
  return await axios.put(`qam/category/${params.id}`, params)
}

export const details = async (id) => {
  return await axios.get(`qam/category/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.post('qam/category/delete', id)
}
