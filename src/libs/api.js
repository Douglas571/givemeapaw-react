import * as fakeServer from './fake-server.js'

export async function getCampaigns(op = {}) {
  const {id} = op

  if (id) {
    return fakeServer.data.campaigns.find( c => c.id === id )
  }
  return fakeServer.data.campaigns
}