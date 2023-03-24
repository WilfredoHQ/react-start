interface Payload {
  sub: string
  exp: number
}

const parseJwt = (jwt: string): Payload | null => {
  try {
    const base64Payload = jwt.split(".")[1]
    return JSON.parse(atob(base64Payload))
  } catch (error) {
    return null
  }
}

export const validateJwt = (jwt: string): string | null => {
  const payload = parseJwt(jwt)

  if (payload !== null) {
    const date = Date.now()
    const payloadDate = payload.exp * 1000
    if (date < payloadDate) return jwt
  }

  return null
}
