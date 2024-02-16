import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
      id: 10000,
      content: 'This note is not saved to server',
      important: true,
    }
    return request.then(response => response.data.concat(nonExisting))
  }

const create = (newobject) => {
    const request = axios.post(baseUrl, newobject)
    return request.then(response => response.data)
}

const update = (id, newobject) => {
    const request = axios.put(`${baseUrl}/${id}`, newobject)
    return request.then(response => response.data)
}

export default { getAll, create, update }
