export const enabledId = (id: string | number) => {
  if (typeof id === 'number') {
    return id > 0
  }
  if (id != null && id.trim().length === 0) return false
  if (id === '') return false
  return true
}