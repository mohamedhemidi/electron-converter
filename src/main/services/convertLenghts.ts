const ConvertLength = async (event, measures): Promise<void> => {
  const feets = measures.feets
  const inches = measures.inches
  const results = feets * 30.48 + inches * 2.54
  await event.reply('convert-length-response', results)
}

export default ConvertLength
