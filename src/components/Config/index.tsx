import { ArrowLeft } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { UserContainer, UserHeader } from '../../pages/User/styles'
import { color } from '../../styles/colors'
import { ConfigForm } from './styles'

const Config = () => {
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
      <ConfigForm>
        <h3>alterar senha</h3>
        <label>senha atual:</label>
        <input type="password" name="oldpassword" />
        <label>nova senha:</label>
        <input type="password" name="newpassword" />
        <label>confirmação da nova senha:</label>
        <input type="password" name="newpasswordconf" />
        <button>Alterar senha</button>
      </ConfigForm>
      <hr style={{ color: color.separator, margin: '16px 24px' }}></hr>
      <ConfigForm>
        <h3>deletar conta</h3>
        <label>
          Para deletar sua conta é necessário confirmar com a sua senha:
        </label>
        <input type="password" name="deletepassword" />
        <button>Deletar minha conta</button>
      </ConfigForm>
    </UserContainer>
  )
}

export default Config
