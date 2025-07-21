import { useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import SideAuth from '../../components/SideAuth'
import { FormItem, Panels, RegisterForm, Title } from '../Register/styles'
import { useLoginMutation } from '../../services/api_auth'

type FormDataLogin = {
  username: string
  password: string
}

const Login = () => {
  const [login, { isLoading = false, isSuccess, isError, error, data }] =
    useLoginMutation()
  const [formDataLogin, setFormDataLogin] = useState<FormDataLogin>({
    username: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({
      ...formDataLogin,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    try {
      await login(formDataLogin)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    console.log('sucesso!!!')
    // console.log(data?.tokens.access)
    if (data?.tokens.access && data?.tokens.refresh) {
      localStorage.setItem('accessToken', data?.tokens.access)
      localStorage.setItem('refreshToken', data?.tokens.refresh)
    }
  }, [isSuccess, data])

  return (
    <div className="container" style={{ marginTop: '16px' }}>
      <Logo />
      <Title>Login</Title>

      <Panels>
        <RegisterForm>
          <FormItem>
            <label>E-mail:</label>
            <input
              type="text"
              name="username"
              value={formDataLogin.username}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <label>Senha:</label>
            <input
              type="password"
              name="password"
              value={formDataLogin.password}
              onChange={handleChange}
            />
          </FormItem>

          <button type="submit" id="animation" onClick={(e) => onSubmit(e)}>
            Entrar
          </button>
        </RegisterForm>
        <SideAuth />
      </Panels>
    </div>
  )
}

export default Login
