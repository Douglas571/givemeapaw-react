import ProgressBar from '@/components/ProgressBar'

const DashboardCampaignShorcut = (props) => {
  const { campaign } = props 
  console.log({campaign})

  return (
    <div className="flex gap-4 border-solid border-divisor border-[1px] rounded-md p-5 mb-5
      hover:shadow-lg">
      <img className='bg-black w-20 h-20 rounded-full' src={'http://localhost:1337' + campaign.cover.formats.thumbnail.url}/> 
      <div className='grow'>
      <h3 className="mb-2 title text-[2rem] leading-[1.5rem]" key={campaign.id}>{campaign.title}</h3>
      <div className='mb-2 flex justify-between'>
          <p className='text-4xl font-black text-primary'>{campaign.collected}$</p>
          <p className='text-4xl font-black text-divisor'>{campaign.goal}$</p>
      </div>

      <ProgressBar percent={50}/>
      </div>
    </div>
  )
}

export default DashboardCampaignShorcut