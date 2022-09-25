import { Link } from 'react-router-dom'
import useCampaigns from '@/hooks/useCampaigns'

const Campaigns = () => {

  const [ campaigns, updateCampaigns ] = useCampaigns()

  return (
    <div>
      <h1>Campaigns</h1>
      <div>
        { campaigns.map( c => (
            <div className="campaign">
              <h1 key={c.id}>{c.title}</h1>
              <p>Objetivo: {c.goal}</p>
              <p>Recaudado: {c.raised}</p>
              <Link to={'/campaigns/' + c.id }>Ver más...</Link>
            </div>
        ))}    

      </div>
    </div>
  )
}

export default Campaigns