// get all kardex
export const getAllKardex = async () => {
  const response = await fetch('http://localhost:3001/kardex')
  const data = await response.json()
  return data
}

// get searched kardex
export const getSearchedKardex = async (searchTerm: string) => {
  const response = await fetch(
    `http://localhost:3001/kardex?search=${searchTerm}`
  )
  const data = await response.json()
  return data
}

// create kardex
export const createKardex = async (kardex: Kardex) => {
  const response = await fetch('http://localhost:3001/kardex', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(kardex)
  })
  const data = await response.json()
  return data
}
