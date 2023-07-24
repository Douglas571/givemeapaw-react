import * as fakeServer from './fake-server';

const HOST = 'http://localhost:1337/api';


// for fetch the campaigns from the api
export async function getCampaigns() {
  let campaigns = [];

  try {
    let res = await fetch(`${HOST}/campaigns?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await res.json();
    console.log({ res });

    campaigns = res.data;


  } catch (err) {
    // console.log(err);
  }

  

  // return campaigns.map((c) => ({
  //   ...c.attributes,
  //   id: c.id,
  //   cover: {
  //     url: c.attributes.cover.data.attributes.url,
  //     formats: c.attributes.cover.data.attributes.formats,
  //   },
  // }));

  return campaigns.map((c) => {
    console.log({c})

    return {
      id: c.id,
      ...c.attributes,
      cover: {
        url: "http://localhost:1337" + c.attributes.cover.data?.attributes.url,
        formats: c.attributes.cover.data?.attributes.formats,
      },
    }
  })
}

// DONATIONS

async function getDonations() {
  let donations = []

  // make the fetch to get donations

  try {
      let res = await fetch('http://localhost:1337/api/donations?populate=*')
      res = await res.json()

      console.log({res})

      donations = res.data.map(d => {
          const newDonation = {id: d.id, ...d.attributes}
          newDonation.date = new Date(Date.parse(d.attributes.publishedAt))
          return newDonation
      })
  } catch (err) {
      console.log('error')
  }

  // filter the data

  return donations
}

const APIRoute = 'http://localhost:1337/api/'

async function validateDonation(id, token) {
  let donationUpdated = {}

  try {
      let res = await fetch(`http://localhost:1337/api/donations/${id}`,
      {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
          },        
          method: 'PUT',
          body: JSON.stringify({ data: {verified: true} }),
      })
      res = await res.json()
      console.log({res})
  } catch(err) {
      console.log(err)
  }

  return donationUpdated
}

async function removeDonations(id, token) {
  
  let res

  try {
    res = await fetch(APIRoute + 'donations/' + id, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`
      },     
    })

    res = await res.json()

  } catch(err) {
    console.log(err)
  }

  return res?.data
}

export const donations = {
  get: getDonations,
  remove: removeDonations,
  validate: validateDonation,
}

