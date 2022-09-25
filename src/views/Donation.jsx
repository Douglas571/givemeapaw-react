import { useParams, useSearchParams } from 'react-router-dom'

const Donation = () => {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const query = Object.fromEntries([...searchParams])

  console.log({query})

  const convertToBs = (amount) => {
    return amount
  }
  return (
    <div>
      <h1>Donation</h1>

      <h2>Metodos de pago</h2>
      
      <h3>Pago mobil</h3>
      <p>pagar 0102 04120615855 29374865 {convertToBs(query.amount)}</p>
      <button>Copiar</button>

      <h3>transferencia</h3>
      <p>Banco de Venezuela: 01020984891209348914</p>
      <button>Copiar</button>

      <h3>PayPal</h3>
      <p>No idea how to pay by paypal</p>

    </div>

  )
}

export default Donation