import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div>
      <h1>404</h1>
      <h3>No hay nada aquí!</h3>
      <p><Link to="/">Volver al inicio</Link></p>

    </div>
  )
}

export default NoMatch