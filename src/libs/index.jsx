export * as api from './api'

import * as fakeServer from './fake-server.js'

export async function login (user) {


  const theUser = fakeServer.data.users.find( u => u.email === user?.email )

  let err 
  if (!theUser) {
    err = new Error('Invalid e-mail.')
    err.type = 'email'
    throw err
  }

  if (!(theUser.password === user?.password)) {
    err = new Error('Invalid password.')
    err.type = 'password'
    throw err
  }

  console.log({theUser})

  return '17034781975829058'
}
