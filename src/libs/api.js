import * as fakeServer from './fake-server';

const HOST = 'http://localhost:1337/api';

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
    // console.log({ res });

    campaigns = res.data;
  } catch (err) {
    // console.log(err);
  }
  // console.log({inApi: campaigns})

  return campaigns.map((c) => ({
    ...c.attributes,
    id: c.id,
    cover: {
      url: c.attributes.cover.data.attributes.url,
      formats: c.attributes.cover.data.attributes.formats,
    },
  }));
}

export function a() {
  return 0;
}
