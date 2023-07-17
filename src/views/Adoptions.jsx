// this section is intended to publish adoptions requests

import { AppBar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Paper, Stack, TextField, Toolbar, Typography } from "@mui/material";

// material icons
import TuneIcon from '@mui/icons-material/Tune';
import MenuIcon from "@mui/icons-material/Menu";

export default function Adoptions() {
    return (
        <>
            <Box>
                <AppBar>
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            edge='start'
                            size='larger'
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon/>
                        </IconButton>

                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Adopción
                        </Typography>

                        {/* <Button color='inherit'> login </Button> */}
                    </Toolbar>
                </AppBar>
            </Box>
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