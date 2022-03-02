import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('admin/academic-year', { params })
}

export const add = async (params = {}) => {
  return await axios.post('admin/academic-year', params)
}

export const update = async (params = {}) => {
  return await axios.put(`admin/academic-year/${params.id}`, params)
}

export const details = async (id) => {
  return await axios.get(`admin/academic-year/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.post('admin/academic-year/delete', id)
}
