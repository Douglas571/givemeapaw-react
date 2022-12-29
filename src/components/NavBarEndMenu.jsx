import IconButton from '@/components/IconButton'

import { useNavigate } from 'react-router'

const NavBarEndMenu = () => {
    const navegation = useNavigate()

    const goBack = () => {
        navegation('..')
    }

    return (
        <div className='bg-white shadow-xl py-2'>
            <IconButton 
                className='text-primary'
                be="arrow_back"
                onClick={goBack}
            />
        </div>
    )
}

export default NavBarEndMenu 