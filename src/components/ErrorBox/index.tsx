import { ErrorContainer } from './styles'

type ErrorRegisterAPI = {
  data?: {
    username?: string[]
    email?: string[]
    password1?: string[]
    password2?: string[]
  }
}

type ErrorProps = {
  errordata: any
}

const ErrorBox = ({ errordata }: ErrorProps) => {
  return (
    <ErrorContainer>
      {Object.keys(errordata.data).map((item: string) => {
        return (
          <li key={item}>
            {item}: {errordata.data[item]}
          </li>
        )
      })}
    </ErrorContainer>
  )
}

export default ErrorBox
