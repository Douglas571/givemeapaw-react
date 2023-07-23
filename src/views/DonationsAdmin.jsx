import { Box, Paper, Button, Table, TableCell, TableContainer, TableHead, Typography, TableBody, TableRow, IconButton, Link } from '@mui/material'
import { useState, useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import NavBarEndMenu from '../components/NavBarEndMenu'
import KAppBar from '@/components/KAppBar'

import {useAuth} from '@/hooks/Auth'

import { useSelector, useDispatch } from 'react-redux';
import { 
    updateAsync as updateDonations, 
    removeAsync as removeDonation 
} from '@/services/actions/donations'

async function validateDonation(id, token) {
    let donationUpdated = {}

    try {
        let res = await fetch(`http://localhost:1337/api/donations/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },        
            method: 'PUT',
            body: JSON.stringify({ data: {verified: true} }),
        })
        res = await res.json()
        console.log({res})
    } catch(err) {
        console.log(err)
    }

    return donationUpdated
}

const Row = (props) => {
    const { donation, key, onValidate, onRemove }= props
    // console.log({donation})

    const [ isOpen, setIsOpen ] = useState(false)

    function printDate(date) {
        console.log({date})
        const [month, day, year] = [
            date.getMonth(),
            date.getDate(),
            date.getFullYear(),
        ]

        return `${day}/${month}/${year}`
    }

    return (
        <>
            <TableRow key={key}>
                <TableCell>
                    <IconButton onClick={() => setIsOpen(!isOpen)}>
                        { isOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
                    </IconButton>
                </TableCell>
                <TableCell align='center'>{donation.reference}</TableCell>
                <TableCell align='center'>{donation.amount}$</TableCell>
                <TableCell>
                    <IconButton 
                        onClick={() => onValidate(donation.id)}
                        color='primary'>
                        <CheckCircleIcon/>
                    </IconButton>
                    <IconButton 
                        onClick={() => onRemove(donation.id)}
                        color='error'>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            { isOpen 
                && (
                    <TableRow>
                        <TableCell colSpan={4}>
                            <Box sx={{m:1}}>
                                <Typography variant='h5'>Detalles de la donación</Typography>
                                <Typography>
                                    Usuario: {donation.username || 'Anonimo' }
                                </Typography>
                                <Typography>
                                    fecha: {printDate(donation.date)}
                                </Typography>
                                <Typography>
                                    estado: {donation.verified ? 'Validado' : 'No validado'}
                                </Typography>
                                { donation.comment && (
                                    <Typography>
                                        comentario: {donation.comment}
                                    </Typography>
                                )}
                                <Typography>
                                    campaña: <Link to={`/campaigns/${donation.campaign.data.id}`}>{donation.campaign.data.attributes.title}</Link>
                                </Typography>

                            </Box>
                        </TableCell>
                    </TableRow>
                )
            }
        </>
    )
}

export default function DonationsAdmin() {

    //const [ donations, setDonations ] = useState([])
    const donations = useSelector(state => state.donations.value)
    const dispatch = useDispatch()
    const { token } = useAuth()
    
    const handleValidation = async (id) => {
        console.log('validating donations')
        let res 
        try {
            res = await validateDonation(id, token)
            // TODO: Make the updates more granular.
            dispatch(updateDonations())
            console.log(res)
        } catch(err) {
            console.log(err)
        }

        return res
    }

    const handleRemove = async (id) => {
        // TODO: request confirmation
        dispatch(removeDonation({id, token}))

    }

    useEffect(() => {
        console.log('useEffect: updateDonations')
        dispatch(updateDonations())
    }, [])

    let toRender

    if (donations.length == 0) {
        toRender = <Typography sx={{ textAlign: 'center' }}>No hay donaciones</Typography>
    } else {
        toRender = (<TableContainer>
                        <Table>
                            <TableHead>
                                <TableCell></TableCell>
                                <TableCell align='center'>Referencia</TableCell>
                                <TableCell align='center'>Cantidad</TableCell>
                                <TableCell></TableCell>
                            </TableHead>
                            <TableBody>
                                { donations && donations.map((d) => (
                                    <Row key={d.id} 
                                        donation={d} 
                                        onValidate={handleValidation}
                                        onRemove={handleRemove}/>
                                )) }
                            </TableBody>
                        </Table>
                    </TableContainer>)
    }

    return (
        <>
            <KAppBar title='Lista de donaciones'/>
            <Box sx={{ mt: 7, p: 3, height: '100%'}}>
                <Paper sx={{ p: 3}}>

                    { toRender }
                    
                </Paper>
            </Box>
        </>
    )
}