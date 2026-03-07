export const isProduction = process.env.NODE_ENV === "production"

export const apiURL = isProduction ?
  "https://us-central1-genki-food.cloudfunctions.net" :
  "http://localhost:5001/genki-food/us-central1"

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const subscribeEmail = async (email) => {
  if (!validateEmail(email)) return false
  let resp = await fetch(`${apiURL}/subscribeNewsletter?email=${email}`)
  let result = await resp.json()
  if (result.message === "Message Sent") return true
  else throw new Error()
}
