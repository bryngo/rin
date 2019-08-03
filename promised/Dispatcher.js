async function playFile(connection, filePath) {
  return new Promise(async (resolve, reject) => {
    const dispatcher = await connection.play(filePath)
    dispatcher.setVolume(1);
    dispatcher.on('end', () => {
      resolve()
    });
    dispatcher.on('error', (error) => {
      reject(error)
    })
  })
}

module.exports = { playFile };
