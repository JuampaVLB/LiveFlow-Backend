export default (io) => {
  io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('message', (data) => {
      console.log(data)

      socket.broadcast.emit('message', {
        body: data.body,
        from: data.from
      })
    })
  })
}
