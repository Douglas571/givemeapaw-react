import {Link} from 'react-router-dom'

const CustomLink = (props) => {
    const {to, className, children} = props
    console.log({className})
    return (
        <Link to={to} className='text-primary underline'>
            {children}
        </Link>
    )
}

export default CustomLink