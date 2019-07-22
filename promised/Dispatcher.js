async function playFile(connection, filePath) {
  return new Promise(async (resolve, reject) => {
    const dispatcher = await connection.play(filePath)
    dispatcher.setVolume(1)
    dispatcher.on('start', () => {
      console.log("Starting file")
      console.log('Playing')
    })
    dispatcher.on('end', () => {
      console.log("Stopping file")
      resolve()
    })
    dispatcher.on('error', (error) => {
      console.log("File error")
      console.error(error)
      reject(error)
    })
  })
}

module.exports = { playFile }
