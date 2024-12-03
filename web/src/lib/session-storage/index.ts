export function saveToSessionStorage<T> (key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)
    sessionStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error saving to sessionStorage: ${error}`)
  }
}

export function loadFromsessionStorage<T> (key: string): T | null {
  try {
    const serializedValue = sessionStorage.getItem(key)
    if (serializedValue == null) {
      return null
    }
    return JSON.parse(serializedValue) as T
  } catch (error) {
    console.error(`Error loading from sessionStorage: ${error}`)
    return null
  }
}

export function removeFromSessionStorage (key: string): void {
  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from sessionStorage: ${error}`)
  }
}
