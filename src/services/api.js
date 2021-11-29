/* eslint-disable import/no-anonymous-default-export */
const baseUrl = 'https://api.b7web.com.br/devcond/api/admin'

const request = async (method, endpoint, params, token = null) => {
  method = method.toLowerCase()
  let fullUrl = `${baseUrl}${endpoint}`
  let body = null

  switch(method) {
    case 'get':
      let queryString = new URLSearchParams(params).toString()
      fullUrl += `?${queryString}`
    break
    case 'post':
    case 'put':
    case 'delete':
      body = JSON.stringify(params)
      break
    default:
      break
  }
  let headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let req = await fetch(fullUrl, { method, headers, body })
  let json = await req.json()
  return json
}

export default () => {
  return {
    getToken: () => {
      return localStorage.getItem('token')
    },
    validateToken: async () => {
      let token = localStorage.getItem('token')
      let json = await request('post', '/auth/validate', {}, token)
      return json
    },
    login: async (email, password) => {
      let json = await request('post', '/auth/login', { email, password })
      return json
    },
    logout: async () => {
      let token = localStorage.getItem('token')
      let json = await request('post', '/auth/logout', {}, token)
      localStorage.removeItem('token')
      return json
    },
    getWall: async () => {
      let token = localStorage.getItem('token')
      let json = await request('get', '/walls', {}, token)
      return json
    },
    updateWall: async (id, data) => {
      let token = localStorage.getItem('token')
      let json = await request('put', `/wall/${id}`, data, token)
      return json
    },
    addWall: async (data) => {
      let token = localStorage.getItem('token')
      let json = await request('post', '/walls', data, token)
      return json
    },
    removeAll: async (id) => {
      let token = localStorage.getItem('token')
      let json = await request('delete', `/wall/${id}`, {}, token)
      return json
    },
    getDocuments: async () => {
      let token = localStorage.getItem('token')
      let json = await request('get', '/docs', {}, token)
      return json
    },
    addDocument: async (data) => {
      let token = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('title', data.title)

      if (data.file) {
        formData.append('file', data.file)
      }

      let req = await fetch(`${baseUrl}/docs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      let json = await req.json()
      return json
    },
    updateDocument: async (id, data) => {
      let token = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('title', data.title)

      if (data.file) {
        formData.append('file', data.file)
      }

      let req = await fetch(`${baseUrl}/doc/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      let json = await req.json()
      return json
    },
    removeDocument: async (id) => {
      let token = localStorage.getItem('token')
      let json = await request('delete', `/doc/${id}`, {}, token)
      return json
    },
    getReservations: async () => {
      let token = localStorage.getItem('token')
      let json = await request('get', `/reservations`, {}, token)
      return json
    },
    getUnits: async () => {
      let token = localStorage.getItem('token')
      let json = await request('get', `/units`, {}, token)
      return json
    },
    getAreas: async () => {
      let token = localStorage.getItem('token')
      let json = await request('get', `/areas`, {}, token)
      return json
    },
    addReservation: async (data) => {
      let token = localStorage.getItem('token')
      let json = await request('post', `/reservations`, data, token)
      return json
    },
    updateReservation: async (id, data) => {
      let token = localStorage.getItem('token')
      let json = await request('put', `/reservation/${id}`, data, token)
      return json
    },
    removeReservation: async (id) => {
      let token = localStorage.getItem('token')
      let json = await request('delete', `/reservation/${id}`, {}, token)
      return json
    },
    getWarnings: async () => {
      let token = localStorage.getItem('token')
      let json = await request('get', `/warnings`, {}, token)
      return json
    },
    updateWarning: async (id) => {
      let token = localStorage.getItem('token')
      let json = await request('put', `/warning/${id}`, {}, token)
      return json
    },
    getFoundAndLost: async () => {
      let token = localStorage.getItem('token')
      let json = await request('get', `/foundandlost`, {}, token)
      return json
    },
    updateFoundAndLost: async (id) => {
      let token = localStorage.getItem('token')
      let json = await request('put', `/foundandlost/${id}`, {}, token)
      return json
    },
    getUsers: async () => {
      let token = localStorage.getItem('token')
      let json = await request('get', `/users`, {}, token)
      return json
    },
    removeUser: async (id) => {
      let token = localStorage.getItem('token')
      let json = await request('delete', `/user/${id}`, {}, token)
      return json
    },
    addUser: async (data) => {
      let token = localStorage.getItem('token')
      let json = await request('post', `/users`, data, token)
      return json
    },
    updateUser: async (id, data) => {
      let token = localStorage.getItem('token')
      let json = await request('put', `/user/${id}`, data, token)
      return json
    },
  }
}
