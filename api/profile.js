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
  return await axios.put('profile', params)
}

export const upload = async (params = {}) => {
  return await axios.post('upload-common', params)
}
