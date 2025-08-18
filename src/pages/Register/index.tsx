import { useState } from 'react'
import { FormItem, Panels, RegisterForm, Title } from './styles'
import { useRegisterMutation } from '../../services/api_auth'
import Logo from '../../components/Logo'
import SideAuth from '../../components/SideAuth'
import ErrorBox from '../../components/ErrorBox'
import { useNavigate } from 'react-router-dom'

type formDataType = {
  username: string
  email: string
  password1: string
  password2: string
}

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<formDataType>({
    username: '',
    email: '',
    password1: '',
    password2: ''
  })
  const [register, { isLoading = false, isSuccess, isError, error }] =
    useRegisterMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // console.log(formData)
  }

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    try {
      await register(formData)
      if (isSuccess) {
        console.log('registro concluido!!')
        navigate('/login')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="container" style={{ marginTop: '16px' }}>
      <Logo />
      <Title>Cadastrar novo usuário</Title>

      {isError && error && <ErrorBox errordata={error} />}

      <Panels>
        <RegisterForm>
          <FormItem>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <label>E-mail:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <label>Senha:</label>
            <input
              type="password"
              name="password1"
              value={formData.password1}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <label>Confirmação de senha:</label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
            />
          </FormItem>

          <button
            type="submit"
            id="animation"
            disabled={isLoading}
            onClick={(e) => handleSubmit(e)}
          >
            Registrar!
          </button>
        </RegisterForm>
        <SideAuth />
      </Panels>
    </div>
  )
}

export default Register
