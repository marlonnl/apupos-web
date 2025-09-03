import { useEffect, useState } from 'react'
import {
  ProfileResponseAPI,
  UpdateProfile,
  useGetProfileQuery,
  useUpdateProfileMutation
} from '../../services/api_profile'
import { RootReducer } from '../../store'
import { useSelector } from 'react-redux'
import { ConfigForm } from '../Config/styles'
import { useGetMeQuery } from '../../services/api'
import Avatar from '../Avatar'

type UpdateProfileType = {
  name?: string
  bio?: string
  site?: string
  location?: string
  image?: string
}

const EditProfile = () => {
  const { data, isSuccess } = useGetMeQuery()

  const [profileData, setProfileData] = useState<UpdateProfile>({
    name: 'loading',
    bio: 'loading',
    site: 'loading',
    location: 'loading',
    image: undefined
  })
  const [updateProfile, { isSuccess: updateIsSuccess }] =
    useUpdateProfileMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAvatar = e.target.files?.[0]

    if (newAvatar) {
      // setProfileData({
      //   ...profileData,
      //   [e.target.name]: e.target.files?[0]
      // })
      const newAvatarUrl = URL.createObjectURL(newAvatar)
      // console.log(e.target.files?.item)
      setProfileData({
        ...profileData,
        [e.target.name]: e.target.files?.[0]
      })

      return () => URL.revokeObjectURL(newAvatarUrl)
    }
  }

  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    try {
      console.log(profileData)
      const formData = new FormData()
      formData.append('name', profileData.name)
      formData.append('bio', profileData.bio)
      formData.append('location', profileData.location)
      formData.append('site', profileData.site)
      formData.append('image', profileData.image, profileData.image.name)

      await updateProfile(formData).unwrap()
      if (updateIsSuccess) {
        alert('Informações do perfil atualizadas')
      }
    } catch (e) {
      console.log('Erro: ', e)
    }
  }

  // const updateData = () => {
  //   if (data) {
  //     setProfileData({
  //       name: data.first_name,
  //       bio: data.bio,
  //       location: data.location,
  //       site: data.site,
  //       image: data.image
  //     })
  //   }
  // }

  useEffect(() => {
    if (isSuccess && data) {
      setProfileData({
        name: data.first_name,
        bio: data.bio,
        location: data.location,
        site: data.site,
        image: data.image
      })
    }
  }, [isSuccess, data])

  return (
    <ConfigForm>
      {profileData && (
        <>
          <h3>editar meu perfil</h3>

          <Avatar url={profileData.image} />
          <label>Avatar</label>
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            // value={profileData.image}
            onChange={handleImageChange}
          />

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

          <button onClick={handleUpdateProfile}>salvar alterações</button>
        </>
      )}
    </ConfigForm>
  )
}

// const abc = () => {
//   const data = ''

//   return (
//     <>
//       {data && (
//         <>
//           <ModalHeader>
//             <h2>Editar perfil de {data.username}</h2>
//             <CloseIcon size={'24px'} onClick={onClick} />
//           </ModalHeader>
//           <ModalForm>
//             <label>Avatar</label>
//             <input type="file" name="avatar" />

//             <label>Nome</label>
//             <input
//               type="text"
//               name="name"
//               value={profileData.name}
//               onChange={handleChange}
//             />

//             <label>Bio</label>
//             <input
//               type="text"
//               name="bio"
//               value={profileData.bio}
//               onChange={handleChange}
//             />

//             <label>Site</label>
//             <input
//               type="url"
//               name="site"
//               value={profileData.site}
//               onChange={handleChange}
//             />

//             <label>Local, cidade, país</label>
//             <input
//               type="text"
//               name="location"
//               value={profileData.location}
//               onChange={handleChange}
//             />

//             <ModalFormButtons>
//               <button onClick={onClick}>cancelar</button>
//               <button onClick={(e) => handleUpdateProfile(e)}>confirmar</button>
//             </ModalFormButtons>
//           </ModalForm>
//         </>
//       )}
//     </>
//   )
// }

export default EditProfile
