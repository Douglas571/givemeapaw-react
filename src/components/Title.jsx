const Title = (props) => {
    const { children, className } = props
    return (
        <h1 className={'font-bold text-6xl text-title-gray ' + className}>{children}</h1>
    )
}

export default Title