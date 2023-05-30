
const BASE_URL = 'http://localhost:3333'

export default {
  auth: {
    login: (email, password) => {
      return fetch(`${BASE_URL}/login?email=${email}&senha=${password}`)
    },
  },
  user: {
    create: (values) => {
      return fetch(`${BASE_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
    },
    update: (id, values) => {
      return fetch(`${BASE_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
    },
},

  disciplinas: {
    get: () => { 
      return fetch(`${BASE_URL}/disciplinas`)
    }
  }

}