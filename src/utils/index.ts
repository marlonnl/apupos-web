export const formatDate = (date: string) => {
  const dateNow = new Date(Date.now())

  const data = new Date(date)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  const diff = Math.abs(data.getTime() - dateNow.getTime())
  const mins = Math.round(diff / (1000 * 60))

  // return diff.toLocaleDateString('pt-BR')
  return `${mins > 60 ? mins : mins / 60} min`
}

export const BASE_API_URL = 'http://localhost:8000/api'
export const BASE_API_AUTH_URL = BASE_API_URL + '/auth/'
export const MAX_LENGTH = 240

// export const handleLogout = async () => {
//   try {

//   }
// }
