const ConvertLength = async (event, measures): Promise<void> => {
  const yardsToMeters = measures.yards * 0.9144
  const feetsToMeters = measures.feets * 0.3048
  const inchesToMeters = measures.inches * 0.0254
  const results = yardsToMeters + feetsToMeters + inchesToMeters
  await event.reply('convert-length-response', parseFloat(results.toString()).toFixed(4))
}

export default ConvertLength
