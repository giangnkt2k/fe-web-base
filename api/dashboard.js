import axios from '@/utils/axios'

export const statsIdea = async (params = {}) => {
  return await axios.get('qam/stats/idea', { params })
}

export const statsOverview = async (params = {}) => {
  return await axios.get('qam/stats/overview', { params })
}

export const statsUser = async (params = {}) => {
  return await axios.get('qam/stats/user', { params })
}

export const statsIdeaByCategory = async (params = {}) => {
  return await axios.get('qam/stats/idea-by-category', { params })
}

export const statsStatisicUser = async (params = {}) => {
  return await axios.get(`qam/stats/user/${params.id}`, { params })
}

export const departmentList = async (params = {}) => {
  return await axios.get('department', { params })
}

export const userList = async (params = {}) => {
  return await axios.get('qam/users', { params })
}
