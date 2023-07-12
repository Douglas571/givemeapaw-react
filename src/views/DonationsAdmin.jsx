import { Box, Paper, Button, Table, TableCell, TableContainer, TableHead, Typography, TableBody, TableRow, IconButton, Link } from '@mui/material'
import { useState, useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import NavBarEndMenu from '../components/NavBarEndMenu'

import {useAuth} from '@/hooks/Auth'


async function getDonations() {
    let donations = []

    // make the fetch to get donations

    try {
        let res = await fetch('http://localhost:1337/api/donations?populate=*')
        res = await res.json()

        console.log({res})

        donations = res.data.map(d => {
            const newDonation = {id: d.id, ...d.attributes}
            newDonation.date = new Date(Date.parse(d.attributes.publishedAt))
            return newDonation
        })
        
    } catch (err) {
        console.log('error')
    }

    // filter the data

    return donations
}

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
    const { donation, key, onValidate }= props
    console.log({donation})

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
                        onClick={() => deleteDonation(donation.id)}
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

    const [ donations, setDonations ] = useState([])
    const { token } = useAuth()

    const data = [
        { amount: 5, reference: '0438' },
        { amount: 5, reference: '0438' },
        { amount: 5, reference: '0438' },
        { amount: 5, reference: '0438' },
    ]
    
    // TODO: finish the validation funciton.
    // - when client send the update, 
    // it should update the donation row state
    const handleValidation = async (id) => {
        let res 
        try {
            res = await validateDonation(id, token)
            console.log(res)
        } catch(err) {
            console.log(err)
        }

        return res
    }

    useEffect(() => {

        getDonations()
        .then( donations => {
            setDonations(donations)
        })

    }, [])

    return (
        <>
            <NavBarEndMenu/>
            <Box sx={{ p: 3}}>
                <Paper sx={{ p: 3}}>
                    <Typography variant='h3'>
                        Lista de donaciones
                    </Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableCell></TableCell>
                                <TableCell align='center'>Referencia</TableCell>
                                <TableCell align='center'>Cantidad</TableCell>
                                <TableCell></TableCell>
                            </TableHead>
                            <TableBody>
                                { donations.map((d) => (
                                    <Row key={d.id} donation={d} onValidate={handleValidation}/>
                                )) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    )
}