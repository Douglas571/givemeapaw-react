import { useState } from 'react'
import { css, useTheme } from '@emotion/react'

import NavBar from '@/components/NavBar'
import Button from '@/components/Button'

import Footer from '@/components/Footer'
import { Link } from 'react-router-dom'

const CSS = css`
  min-height: 100vh;

  .panel {
    height: 100vh;
  }

  #panel-1 {
    background-image: url('/home1.jpg');
    background-size: cover;
    background-position: center;
  }

  #panel-2 {
    background-color: white;
    background-image: url('/home2.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0% 65%;
  }
`

const Home = () => {
    const theme = useTheme()

    return (
        <> 
            <NavBar/>
            <div css={CSS}>             
                {/* Panel #1 with the discover campaign advertisement */}   
                <div className='panel p-8 pt-[5rem] flex flex-col' id='panel-1'>
                    <h1 className='text-7xl text-primary font-extrabold'>Salvando Animales, Cambiando Vidas</h1>
                    <div className='grow relative'>
                        <div className='flex justify-center relative top-[60%]' >
                            <button className='p-4 py-6 rounded-lg bg-primary text-white text-2xl'>
                                <Link to="/campaigns">Descubre campañas</Link>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Panel #2 with the sign up shelter or ONG advertisement*/}
                <div className='panel p-8 pt-[5rem] flex flex-col' id='panel-2'>
                    <h1 className='text-7xl text-secondary font-extrabold'>Ellos Necesitan de tu Ayuda</h1>
                    <div className='grow relative'>
                        <div className='flex justify-center relative top-[75%]' >
                            <button className='p-4 py-6 rounded-lg bg-secondary text-white text-2xl'>Registra tu refúgio u ONG</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home