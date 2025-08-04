import styled from 'styled-components'
import { color } from '../../styles/colors'
import { XCircleFill } from 'react-bootstrap-icons'

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  margin: 200px auto;
  background-color: ${color.bgPrimary};

  width: 500px;
  height: fit-content;
  padding: 40px 24px;

  /* display: flex;
  align-items: center;
  justify-content: center; */

  border: 1px solid ${color.separator};
  border-radius: 16px;
`

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${color.separator};
  width: 100%;

  h2 {
    padding-bottom: 8px;
  }
`

export const CloseIcon = styled(XCircleFill)`
  :hover {
    cursor: pointer;
    fill: ${color.separator};
  }
`

export const ModalForm = styled.form`
  /* width: 70%; */
  margin-top: 24px;
  font-size: 13px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    color: ${color.secondaryText};
    margin-bottom: -6px;
  }

  input {
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    color: ${color.text};
    background-color: ${color.bgNavButtonHover};

    &:focus {
      outline: 1px solid ${color.secondaryText};
    }
  }
`

export const ModalFormButtons = styled.div`
  margin-top: 16px;
  padding-top: 8px;
  border-top: 1px solid ${color.separator};

  display: flex;
  justify-content: flex-end;
  gap: 16px;

  button {
    padding: 6px 8px;
  }
`
