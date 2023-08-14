// import * as fakeServer from './fake-server';

const HOST = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${HOST}/api`

export async function login(authData) {
  // const theUser = fakeServer.data.users.find( u => u.email === user?.email )

  console.log({ authData });

  const response = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: authData.email,
      password: authData.password,
    }),
  });

  console.log({ response });
  const data = await response.json();
  // console.log({data})

  const { jwt, user } = data;
  // console.log({ jwt, user });

  let err;
  if (data.error) {
    err = new Error(data.error.message);
    err.type = data.error.name;

    // console.log('the erro type is: ' + err.type)
    throw err;
  }

  return { token: jwt, user };
}

export async function regist(newUser) {
  const response = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: `${newUser.name}_${newUser.surname}`,
      email: newUser.email,
      password: newUser.password,
    }),
  });

  const data = await response.json();
  // console.log({data})

  let err;
  if (data.error) {
    err = new Error(data.error.message);
    err.type = data.error.name;

    throw err;
  }

  return { token: data.jwt, user: data.user };
}

export * as api from './api';
