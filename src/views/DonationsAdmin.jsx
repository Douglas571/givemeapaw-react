import { Box, Paper, Button, Table, TableCell, TableContainer, TableHead, Typography, TableBody, TableRow, IconButton, Link, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
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
    removeAsync as removeDonation,
    validateAsync as validateDonation,
} from '@/services/actions/donations'

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

const ConfirmDialog = (props) => {
    const { onClose, open } = props 

    const handleClose = () => {
        onClose()
    }

    const handleCancel = () => {
        onClose(false)
    }

    const handleOk = () => {
        onClose(true)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent dividers><Typography>¿Seguro que quieres eliminar la donación?</Typography></DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button onClick={handleOk} color='error'>Eliminar</Button>
            </DialogActions>
        </Dialog>
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
            // TODO: KEEP GOING... IS NOT TESTED...
            dispatch(validateDonation({id, token}))
            console.log(res)
        } catch(err) {
            console.log(err)
        }

        return res
    }

    const handleRemove = (id) => {
        // TODO: request confirmation
        //dispatch(removeDonation({id, token}))
        console.log('the id to delete is: ', id)
        setIdToDelete(id)
        openConfirmationDialog()
        
    }

    useEffect(() => {
        console.log('useEffect: updateDonations')
        dispatch(updateDonations())
    }, [])

    let toRender

    if (donations.length == 0) {
        toRender = <Typography sx={{ textAlign: 'center' }}>No hay donaciones</Typography>
    } else {
        console.log({donations})
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
                                        onRemove={() => handleRemove(d.id)}/>
                                )) }
                            </TableBody>
                        </Table>
                    </TableContainer>)
    }

    const [openDialog, setOpenDialog] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)

    const openConfirmationDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseConfirmationDialog = (response) => {
        console.log('the response is: ', response, ' the id is: ', idToDelete)
        setOpenDialog(false)

        if (response) {
            dispatch(removeDonation({id: idToDelete, token}))
        }
        
        setIdToDelete(null)
    }


    // TODO: create the dialog button to confir the removal of a donation
    return (
        <>
            <KAppBar title='Lista de donaciones'/>
            
            <Box sx={{ mt: 7, p: 3, minHeight: '100vh'}}>
                
            <ConfirmDialog open={openDialog} onClose={handleCloseConfirmationDialog}/>

                <Paper sx={{ p: 3}}>

                    { toRender }
                    
                </Paper>
            </Box>
        </>
    )
}