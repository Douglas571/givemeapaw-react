// this section is intended to publish adoptions requests
import { useState } from 'react'
import { AppBar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Paper, Stack, TextField, Toolbar, Typography } from "@mui/material";

// material icons
import TuneIcon from '@mui/icons-material/Tune';
import MenuIcon from "@mui/icons-material/Menu";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";



import MainMenu from '@/components/MainMenu'
import CAppBar from '@/components/AppBar'

export default function Adoptions() {

    const [ showSideMenu, setShowSideMenu ] = useState(false)

    function toggleMenu() {
        setShowSideMenu(!showSideMenu)
    }

    return (
        <>
            
            <CAppBar title='Adopción'/>
            <Box mt={7} p={2}  sx={{background: '#f3f3f3', height: '100vh'}}>
                <Stack gap={2}>
                    <Paper>
                        <Stack p={2} direction='row' gap={2}>
                            <TextField
                                defaultValue={'Coro, Falcón'}
                            />
                            <Button variant="outlined">
                                <TuneIcon/>
                            </Button>
                        </Stack>
                    </Paper>

                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component={'img'}
                                height={140}
                                image="/img.jpg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Stack>
            </Box>
        </>
    )
}