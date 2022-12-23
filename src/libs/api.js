import * as fakeServer from './fake-server.js'

const HOST = 'http://localhost:1337/api'

export async function getCampaigns(op = {}) {
  const {id} = op



  if (id) {
    return fakeServer.data.campaigns.find( c => c.id === id )
  }


  let campaigns = []
  try {
    let res = await fetch(`${HOST}/campaigns?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    

    res = await res.json()
    console.log({res})

    campaigns = res.data

  } catch(err) {
    console.log(err)
  }

  
  console.log({inApi: campaigns})

  return campaigns.map( c => ({
    ...c.attributes,
    cover: {
      url: c.attributes.cover.data.attributes.url,
      formats: c.attributes.cover.data.attributes.formats,
    }
  }))
}