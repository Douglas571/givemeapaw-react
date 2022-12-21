export * as api from './api'

import * as fakeServer from './fake-server.js'

const HOST = 'http://localhost:1337'

export async function login (authData) {
  //const theUser = fakeServer.data.users.find( u => u.email === user?.email )

  console.log({authData})

  const response = await fetch(`${HOST}/api/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      identifier: authData.email,
      password: authData.password
    })
  })

  console.log({response})
  const data = await response.json()
  console.log({data})

  const {jwt, user} = data
  console.log({jwt, user}) 

  let err 
  if (data.error) {
    err = new Error(data.error.message)
    throw err
  }

  return {token: jwt, user}
}

export async function regist (newUser) {
  const response = await fetch(`${HOST}/api/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": `${newUser.name} ${newUser.surname}`,
      "email": newUser.email,
      "password": newUser.password
    })
  })

  const data = await response.json()
  console.log({data})

  let err 
  if (data.error) {
    err = new Error(data.error.message)
    throw err
  }

  return {token: data.jwt, user: data.user}
}
