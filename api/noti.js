import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('notification', { params })
}

export const update = async (params = {}) => {
  return await axios.put(`notification/${params.id}`, params)
}
