import DeadEndMenu from '@/components/DeadEndMenu'

const DeadEndLayout = (props) => {
  const { children } = props

  return (
    <div>
      <DeadEndMenu/>
      {children}
    </div>

  )
}

export default DeadEndLayout