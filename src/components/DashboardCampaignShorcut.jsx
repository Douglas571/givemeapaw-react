import ProgressBar from '@/components/ProgressBar'
import { Avatar, Typography } from '@mui/material'

const DashboardCampaignShorcut = (props) => {
  const { campaign } = props 
  console.log({campaign})

  return (
    <div className="flex gap-4 border-solid border-divisor border-[1px] rounded-md p-5 mb-5
      hover:shadow-lg">
      <Avatar src={import.meta.env.VITE_BACKEND_URL + campaign.cover?.formats?.thumbnail?.url}/> 
      <div className='grow'>
      <Typography variant='h6' key={campaign.id}>{campaign.title}</Typography>
      <div className='mb-2 flex justify-between'>
          <Typography variant='subtitle1'>{campaign.collected}$</Typography>
          <p className='text-4xl font-black text-divisor'>{campaign.goal}$</p>
      </div>

      <ProgressBar percent={50}/>
      </div>
    </div>
  )
}

export default DashboardCampaignShorcut