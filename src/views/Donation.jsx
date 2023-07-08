import { useParams, useSearchParams } from 'react-router-dom'

import { Button, Paper, Stack, TextField, Typography } from '@mui/material'

import DeadEndLayout from '@/layout/DeadEndLayout'
import { Box } from '@mui/system'

const Donation = () => {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const query = Object.fromEntries([...searchParams])

  console.log({query})

  function copyToClickboard(string) {
    navigator.clipboard.writeText(this.state.textToCopy)
  }

  const convertToBs = (amount) => {
    return amount * 27
  }
  return (
    <DeadEndLayout>

      <Paper sx={{ display: 'flex', 'flex-flow': 'column', gap: 2, m: 2, p: 2 }}>
        <Typography
          variant="h3"
        >
          Donación
        </Typography>

        <Typography variant="h6">
          Total a Pagar: {query.amount}$
        </Typography>

        <Typography>
          Pago Móvil: pagar 0102 04120615855 29374865 MONTO 
          <Button onClick={() => copyToClickboard("pagar 0102 04120615855 29374865 MONTO")}>Copiar</Button>
        </Typography>

        <Typography variant='h7'>Transferencia (Venezuela)</Typography>
        
        <Typography>
          <Box>
            {"Cedula: 29374865 "}
            <Button onClick={() => copyToClickboard("29374865")}>Copiar</Button>
          </Box>

          <Box>
            {"Número de cuenta: 01020984891209348914 "}
            <Button onClick={() => copyToClickboard("01020984891209348914")}>Copiar</Button>
          </Box>
        </Typography>

        <TextField
          name="pay-ref"
          label={"Referencia de pago"}
        />

        <Button variant='contained'>Enviar referencia</Button>

      </Paper>

      
    </DeadEndLayout>

  )
}

export default Donation