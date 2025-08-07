import { PuffLoader } from 'react-spinners'

type LoaderProps = {
  size?: number
}

const Loader = ({ size = 24 }: LoaderProps) => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
    >
      <PuffLoader color="#ee7752" size={size} />
    </div>
  )
}

export default Loader
