import { Outlet } from 'react-router-dom'

const APP_TITLE = "Danos Una Pata"

const User = () => {
  const user = {
    name: 'douglas571'
  }

  return (
    <div>
      <h1>Bienvenido {user.name}</h1>

      <div>
        <p>En {APP_TITLE} nos aseguramos de que quienes soliciten 
        ayuda sean personas honestas, con intenciones reales
        de ayudar a estos adorables seres que día a día sufren
        en las calles. Si deceas ser parte de esta gran familia te pedimos
        amablemente que hables con nosotros antes de solicitar ayuda.</p>
        <button>Solicitar Rol de Voluntario</button>
      </div>

      <Outlet/>
    </div>

  )
}

export default User