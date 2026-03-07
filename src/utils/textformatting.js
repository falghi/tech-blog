export const shortenText = (text, maxLength) => {
  if (text.length > maxLength) {
    text = text.slice(0, maxLength - 3)
    while (!text.endsWith("...")) {
      text += "."
    }
    return text
  }
}
