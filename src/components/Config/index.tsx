import { ArrowLeft } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { UserContainer, UserHeader } from '../../pages/User/styles'
import { color } from '../../styles/colors'
import { ConfigForm, ConfigNav } from './styles'
import { useState } from 'react'
import { useChange_passwordMutation } from '../../services/api_auth'
import EditProfile from '../EditProfile'

const Config = () => {
  const navigate = useNavigate()

  const [folder, setFolder] = useState<'edit' | 'password' | 'delete'>('edit')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')

  const [changePassword, { isSuccess, isLoading, isError }] =
    useChange_passwordMutation()

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (newPassword != newPassword2) {
      alert('ERRO: a confirmação da sua nova senha não bate com a nova senha.')
    }

    const changeResponse = await changePassword({
      oldpassword: oldPassword,
      newpassword: newPassword
    })

    if (
      changeResponse.data &&
      changeResponse.data['Change password'] === 'success'
    ) {
      alert('SENHA ALTERADA COM SUCESSO!')
      navigate('..')
    } else {
      alert('ERRO!! Tente novamente')
    }
  }

  const generateFolder = () => {
    if (folder === 'edit') {
      return <EditProfile />
    }

    if (folder === 'password') {
      return (
        <>
          <ConfigForm>
            <h3>alterar senha</h3>
            <label>senha atual:</label>
            <input
              type="password"
              name="oldpassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label>nova senha:</label>
            <input
              type="password"
              name="newpassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>confirmação da nova senha:</label>
            <input
              type="password"
              name="newpassword2"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
            />
            <button onClick={(e) => onSubmit(e)}>Alterar senha</button>
          </ConfigForm>
        </>
      )
    }

    if (folder === 'delete') {
      return (
        <>
          <ConfigForm>
            <h3>deletar conta</h3>
            <p>
              <b>ATENÇÃO</b>: ao clicar em &apos;deletar minha conta&apos; sua
              conta será apagada e não há como desfazer.
            </p>
            <label>
              Para deletar sua conta é necessário confirmar com a sua senha:
            </label>
            <input type="password" name="deletepassword" />
            <button>Deletar minha conta</button>
          </ConfigForm>
        </>
      )
    }
  }

  return (
    <UserContainer>
      <UserHeader>
        <div
          style={{
            marginBottom: '16px',
            display: 'flex',
            gap: '24px'
          }}
        >
          <Link to="/">
            <ArrowLeft size={22} />
          </Link>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Configurações</p>
        </div>
        <hr style={{ color: color.separator }}></hr>
      </UserHeader>

      <ConfigNav>
        <ul>
          <li onClick={() => setFolder('edit')}>editar perfil</li>
          <li onClick={() => setFolder('password')}>alterar senha</li>
          <li onClick={() => setFolder('delete')}>deletar conta</li>
        </ul>
      </ConfigNav>

      {generateFolder()}
    </UserContainer>
  )
}

export default Config
