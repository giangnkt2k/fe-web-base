import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('department', { params })
}
export const listAdmin = async (params = {}) => {
  return await axios.get('admin/department', { params })
}

export const add = async (params = {}) => {
  return await axios.post('admin/department', params)
}

export const update = async (params = {}) => {
  return await axios.put(`admin/department/${params.id}`, params)
}

export const details = async (id) => {
  return await axios.get(`admin/department/${id}`)
}

export const destroy = async (id) => {
  return await axios.delete(`admin/department/${id}`)
}
