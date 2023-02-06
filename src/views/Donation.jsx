import { useParams, useSearchParams } from 'react-router-dom'

import { Paper, Typography } from '@mui/material'

import DeadEndLayout from '@/layout/DeadEndLayout'
import { Box } from '@mui/system'

const Donation = () => {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const query = Object.fromEntries([...searchParams])

  console.log({query})

  const convertToBs = (amount) => {
    return amount
  }
  return (
    <DeadEndLayout>

      <Paper sx={{ m: 2, p: 2 }}>
        <Typography
          variant="h3"
        >
          Donación
        </Typography>

        <Typography variant="h6">
          Total a Pagar
        </Typography>

        <h2>Metodos de pago</h2>

        <h3>Pago mobil</h3>
        <p>pagar 0102 04120615855 29374865 {convertToBs(query.amount)}</p>
        <button>Copiar</button>

        <h3>transferencia</h3>
        <p>Banco de Venezuela: 01020984891209348914</p>
        <button>Copiar</button>

        <h3>PayPal</h3>
        <p>No idea how to pay by paypal</p>

      </Paper>

      
    </DeadEndLayout>

  )
}

export default Donation