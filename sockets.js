export default (io) => {
  io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('message', (data) => {
      console.log(data)

      if (data.from === null) data.from = 'Random_User'
      console.log(data.from)
      socket.broadcast.emit('message', {
        body: data.body,
        from: data.from
      })
    })
  })
}
