import { useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { Button, Paper, Stack, TextField, Typography, Alert } from '@mui/material'

import DeadEndLayout from '@/layout/DeadEndLayout'
import { Box } from '@mui/system'

import {useAuth} from '@/hooks/Auth'

const Donation = () => {
  const [ inProcess, setInProcess ] = useState(false)
  const [ isSuccessDonation, setIssuccessDonation ] = useState(false)
  const [ error, setError ] = useState(false)

  const referenceInputRef = useRef(null)

  const { user } = useAuth()

  const params = useParams()
  const [searchParams] = useSearchParams()
  const query = Object.fromEntries([...searchParams])

  

  function copyToClickboard(string) {
    navigator.clipboard.writeText(this.state.textToCopy)
  }

  const convertToBs = (amount) => {
    return amount * 27
  }

  const makeDonation = async () => {
    setInProcess(true)
    setError(false)
    const reference = referenceInputRef.current.value
    console.log('the reference is: ', reference)

    const newDonation = {
      user: user.email,
      amount: query.amount,
      campaign: params.id,
      comment: '',
      verified: false,
      reference: reference
    }

    console.log({newDonation})

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donations`, {
        method: 'post',
        headers: {
          // Authorization: `Bearer ${token}`
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({data: newDonation})
      })


      const data = await res.json()

      console.log({data})

      if (data.error || !data.data.id) throw data.error

      setIssuccessDonation(true)
      return data.data


    } catch (err) {
      console.log({err})
      setError(err)
      setInProcess(false)
    }
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
          inputRef={referenceInputRef}
        />

        { isSuccessDonation && (<Alert severity="success">¡Tu donación ha sido registrada exitosamente!</Alert>) }
        { error && (<Alert severity="error">Ah ocurrido un error, intentalo más tarde.</Alert>)}

        <Button disabled={inProcess} variant='contained' onClick={makeDonation}>Enviar referencia</Button>

      </Paper>

      
    </DeadEndLayout>

  )
}

export default Donation