import { Github } from 'react-bootstrap-icons'
import Logo from '../Logo'
import { ApupoSide, Dicionario, SideFooter, SideHeader } from './styles'

const SideAuth = () => {
  return (
    <ApupoSide>
      <SideHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo />
          <div>
            <h1>apupos</h1>
            <p>microblogging</p>
          </div>
        </div>
        <Dicionario>
          <h2>a·pu·po</h2>
          <span>substantivo masculino</span>
          <p>vaia, gritos, vozeria, brados de troça</p>
        </Dicionario>
      </SideHeader>

      <SideFooter>
        <p>
          <a
            href="https://github.com/marlonnl"
            target="_blank"
            rel="noreferrer"
          >
            <Github /> Marlonn Locatelli
          </a>
        </p>
      </SideFooter>
    </ApupoSide>
  )
}

export default SideAuth
