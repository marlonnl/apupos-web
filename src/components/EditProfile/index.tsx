import { useEffect, useState } from 'react'
import {
  ProfileResponseAPI,
  useGetProfileQuery,
  useUpdateProfileMutation
} from '../../services/api_profile'
import {
  CloseIcon,
  Modal,
  ModalForm,
  ModalFormButtons,
  ModalHeader
} from './styles'

type UpdateProfileType = {
  name: string
  bio: string
  site: string
  location: string
}

type Props = {
  username: string
  onClick: () => void
}

const EditProfile = ({ username, onClick }: Props) => {
  const initialProfileDate = {
    name: '',
    bio: '',
    site: '',
    location: ''
  }

  const [profileData, setProfileData] =
    useState<UpdateProfileType>(initialProfileDate)
  const { data, isSuccess } = useGetProfileQuery(username)
  const [updateProfile, { isSuccess: updateIsSuccess }] =
    useUpdateProfileMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    try {
      await updateProfile(profileData)
      if (updateIsSuccess) {
        console.log('Informações do perfil atualizadas')
      }
    } catch (e) {
      console.log('Erro: ', e)
    }
  }

  const updateData = () => {
    if (data) {
      const newProfileData = {
        name: data.profile.first_name,
        bio: data.profile.bio,
        site: data.profile.site,
        location: data.profile.location
      }
      setProfileData(newProfileData)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      updateData()
    }
  }, [isSuccess])

  return (
    <>
      <Modal>
        {data && (
          <>
            <ModalHeader>
              <h2>Editar perfil de {data.username}</h2>
              <CloseIcon size={'24px'} onClick={onClick} />
            </ModalHeader>
            <ModalForm>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />

              <label>Bio</label>
              <input
                type="text"
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
              />

              <label>Site</label>
              <input
                type="url"
                name="site"
                value={profileData.site}
                onChange={handleChange}
              />

              <label>Local, cidade, país</label>
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleChange}
              />

              <ModalFormButtons>
                <button onClick={onClick}>cancelar</button>
                <button onClick={(e) => handleUpdateProfile(e)}>
                  confirmar
                </button>
              </ModalFormButtons>
            </ModalForm>
          </>
        )}
      </Modal>
    </>
  )
}

export default EditProfile
