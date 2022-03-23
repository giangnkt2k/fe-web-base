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

export const uploadCommon = async (params = {}) => {
  return await axios.post('upload-common', params)
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

export const addComment = async (params = {}) => {
  return await axios.post('idea/comment', params)
}

export const getListComment = async (id) => {
  return await axios.get(`idea/${id}/comment`)
}

export const deleteComment = async (id) => {
  return await axios.delete(`idea/comment/${id}`)
}

export const getUserLikeIdea = async (id) => {
  return await axios.get(`idea/${id}/like`)
}

export const likeIdea = async (id) => {
  return await axios.post(`idea/${id}/like`)
}

export const returnLikeIdea = async (id) => {
  return await axios.delete(`idea/${id}/like`)
}

export const getUserDisLikeIdea = async (id) => {
  return await axios.get(`idea/${id}/dislike`)
}

export const disLikeIdea = async (id) => {
  return await axios.post(`idea/${id}/dislike`)
}

export const returnDislikeIdea = async (id) => {
  return await axios.delete(`idea/${id}/dislike`)
}

// adv
export const advGetAll = async (params = {}) => {
  return await axios.get('adv/idea', { params })
}

export const advGetListComment = async (id) => {
  return await axios.get(`adv/idea/${id}/comment`)
}

export const advDetails = async (id) => {
  return await axios.get(`adv/idea/${id}`)
}

// qam
export const listQamAcademic = async () => {
  return await axios.get('qam/academic-year')
}

export const exportCSVIdea = async (params = {}) => {
  return await axios.get('qam/export-ideas', { params })
}

export const exportZip = async () => {
  return await axios.get('qam/export-docs')
}
