import { useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import SideAuth from '../../components/SideAuth'
import {
  FormItem,
  GoToRegister,
  Panels,
  RegisterForm,
  Title
} from '../Register/styles'
import { useLoginMutation } from '../../services/api_auth'
import ErrorBox from '../../components/ErrorBox'
import { useDispatch, useSelector } from 'react-redux'
import { authentication } from '../../store/reducers/auth'
import { RootReducer } from '../../store'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'

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

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLogged } = useSelector((state: RootReducer) => state.authSlice)

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

  if (isSuccess) {
    navigate('/')
  }

  useEffect(() => {
    // console.log('sucesso!!!')
    if (isSuccess && data) {
      console.log(data)
      const authData = {
        id: data.user.id,
        username: data.user.username,
        name: data.user.name,
        bio: data.user.bio,
        site: data.user.site,
        location: data.user.location
        // email: data.user.email
      }

      dispatch(authentication(authData))
      // dispatch(refresh())
      navigate('/')
      // console.log(data)
    }
    // if (data && data.tokens.access && data.tokens.refresh) {
    //   dispatch(authentication(data))
    //   localStorage.setItem('accessToken', data?.tokens.access)
    //   localStorage.setItem('refreshToken', data?.tokens.refresh)
    // }
  }, [isSuccess, data, dispatch, navigate])

  if (isLoading) {
    return <Loader size={48} />
  }

  return (
    <div className="container" style={{ marginTop: '16px' }}>
      <Logo />
      <Title>Login</Title>

      {/* {isError && error && <ErrorBox errordata={error} />} */}

      <Panels>
        <RegisterForm>
          <FormItem>
            <label>Username:</label>
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

          <button
            type="submit"
            id="animation"
            disabled={isLoading}
            onClick={(e) => onSubmit(e)}
          >
            Entrar
          </button>
          <p>
            Não possui uma conta?
            <GoToRegister to="/register" id="animation">
              Registre-se!
            </GoToRegister>
          </p>
        </RegisterForm>
        <SideAuth />
      </Panels>
    </div>
  )
}

export default Login
