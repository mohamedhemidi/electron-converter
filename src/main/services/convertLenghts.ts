const ConvertLength = async (event, measures): Promise<void> => {
  const feetsToMeters = measures.feets * 0.3048
  const inchesToMeters = measures.inches * 0.0254
  const results = feetsToMeters + inchesToMeters
  await event.reply('convert-length-response', parseFloat(results).toFixed(4))
}

export default ConvertLength
