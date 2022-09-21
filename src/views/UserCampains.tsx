import { Link } from 'react-router-dom'


import {getCampains} from '@/libs'

let campains = await getCampains()

const UserCampains = () => {

  return (
    <div>
      <h1>Mis campañas</h1>
      <div>
      { campains.map( c => {
          return (
            <div key={c.id}>
              <h1>{c.title}</h1>
              <Link to={`/campains/${c.id}`}>Ver más</Link>
            </div>
          )
        })
      }
      </div>
    </div>

  )
}

export default UserCampains