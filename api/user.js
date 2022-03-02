import axios from '@/utils/axios'

export const currentUser = async () => {
  return await axios.get('profile')
}

export const list = async (params = {}) => {
  return await axios.get('admin/user', { params })
}

export const listAllocation = async (params = {}) => {
  return await axios.get('admin/user/vehicle_allocation', { params })
}

export const add = async (params = {}) => {
  return await axios.post('admin/user', params)
}

export const update = async (params = {}) => {
  return await axios.put(`admin/user/${params.id}`, params)
}

export const details = async (id) => {
  return await axios.get(`admin/user/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.post('admin/user/delete', id)
}
