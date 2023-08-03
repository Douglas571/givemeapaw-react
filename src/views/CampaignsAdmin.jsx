import { useState, useRef, useEffect } from 'react'
import { Box, Paper, TextField, Typography, 
    Button, Stack, Alert, IconButton, 
    Menu, MenuItem, Fab } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add';


import { useAuth } from '@/hooks/Auth'
import KAppBar from '@/components/KAppBar'
import CampaignItem from '@/components/CampaignItem'

import useCampaigns from '../hooks/useCampaigns'

const CampaignsAdmin = () => {


    const { token } = useAuth()
    const [newCampaign, setNewCampaing] = useState({
        name: '',
        description: '',
        goal: ''
    })
    const [file, setFile] = useState()

    const [fileUrl, setFileUrl] = useState('')
    const inputRef = useRef(null)

    const [ campaigns, updateCampaigns ] = useCampaigns();
    const [ success, setSuccess ] = useState(false);


    // to open the hidden input file
    function handleUploadClick() {
        inputRef.current?.click()
    }

    useEffect(() => {
        if (fileUrl) {
            URL.revokeObjectURL(fileUrl)
            setFileUrl('')
        }

        if (file) {
            setFileUrl(window.URL.createObjectURL(file))
        }
    }, [file])

    function handleInputChange(evt) {
        let c = {...newCampaign}
        c[evt.target.name] = evt.target.value
        setNewCampaing(c)
    }

    function handleFileChange(e) {
        if (!e.target.files) {
            return
        }

        const newFile = e.target.files[0]

        setFile(newFile)
    }

    function cleanFields() {
        setNewCampaing({
            name: '',
            description: '',
            goal: ''
        })
        setFile(null)
    }

    async function handlePublish() {
        // TO-DO: change names according to server sechema
        let data = {
            title: newCampaign.name,
            description: newCampaign.description,
            goal: newCampaign.goal,

        }

        // putting the data into a form data 
        const formData = new FormData()
        formData.append(`files.cover`, file, file.name)
        formData.append('data', JSON.stringify(data))

        console.log('publishing campaign...')
        console.log({token})
        let res = await fetch('http://localhost:1337/api/campaigns', {
            headers: {
                Authorization: `Bearer ${token}`
            },        
            method: 'post',
            body: formData
        })

        console.log('requested to server.')

        // to check the response
        const json = await res.json()
        const msg = await json
        console.log({jsonResponse: msg})

        // to apper and disapper the success message
        setSuccess(true)
        setTimeout(() => {
            console.log('in 5sec the message will disapper')
            setSuccess(false)
        }, 5000)
        
        cleanFields()
        updateCampaigns()
    }

    return (
        <>
            <KAppBar 
                title='Administración de Campañas'
                // endAction={
                //     (
                //         <>
                //             <IconButton
                //                 color="primary"
                //             >
                //                 <MoreVertIcon/>
                //             </IconButton>
                //             <Menu>
                //                 <MenuItem>Agregar</MenuItem>

                //             </Menu>
                //         </>
                //     )
                // }
            />

            <Box mt={7} p={3}>
                
                <Paper sx={{ display: 'flex', 'flex-flow': 'column', gap: 2, p: 2 }}>
                <Typography variant='h3'>Nueva Campaña</Typography>
                    <TextField 
                        label={'Nombre de la campaña'}
                        value={newCampaign.name}
                        onChange={handleInputChange}
                        name="name"/>

                    <TextField 
                        label={'Descripción'}
                        value={newCampaign.description}
                        onChange={handleInputChange}
                        name="description"/>

                    <TextField 
                        label={'Dinero a Recaudar ($)'} 
                        defaultValue={'0'}
                        value={newCampaign.goal}
                        onChange={handleInputChange}
                        name="goal"/>    

                    <Button
                        variant="outlined"
                        component="label"
                        onClick={handleUploadClick}
                    >
                        Subir imagen de portada
                    </Button>
                    <input
                        type="file"
                        hidden
                        ref={inputRef}
                        onChange={handleFileChange}
                        style={{display: 'none'}}
                    />

                    <Box><img src={fileUrl}/></Box>

                    { success ? 
                        <Alert severity="success">Campaña publicada exitosamente</Alert>
                        : null
                    }

                    <Button 
                        variant='contained'
                        onClick={handlePublish}>PUBLICAR CAMPAÑA
                    </Button>
                </Paper>
            </Box>

            {/*! remove for a while*/}
            <Box>
                <Paper sx={{ display: 'flex', 'flex-flow': 'column', gap: 2, m: 2, p: 2 }}>
                    
                    <Stack spacing={2}>
                        { campaigns.map((c) => (
                            <CampaignItem campaign={c} key={c.id} forCard={{ variant: 'outlined' }} />
                        ))}
                    </Stack>

                </Paper>
            </Box>

            {/* NOTE: for when you change the way of add campaings

            <Fab
                sx={{position: 'fixed', right: 16 , bottom: 16}}
                color='primary'
            >
                <AddIcon/>
            </Fab> */}
        </>
    )
}

// a field to write campaign name
// a field to write a short description
// a field to put the money needed 
// a field to upload an image

export default CampaignsAdmin