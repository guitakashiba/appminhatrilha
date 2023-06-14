
const BASE_URL = 'http://localhost:3333'

export default {
  auth: {
    login: async (email, password) => {
      try {
          const response = await fetch(`${BASE_URL}/login`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, senha: password })
          });
  
          const data = await response.json();
  
          if (response.ok) {
              return data;
          } else {
              throw new Error(data.message || 'Erro desconhecido');
          }
      } catch (error) {
          console.error(error);
          throw error;
      }
    },
    logout: async () => {
        try {
            const response = await fetch(`${BASE_URL}/logout`, {
                method: 'GET',
                credentials: 'same-origin'
            });

            if (!response.ok) {
                throw new Error('Falha ao fazer logout');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
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
    },
    getConcluidas: (userId) => {
      return fetch(`${BASE_URL}/usuarios/${userId}/disciplinas`);
    }
  }

  
}