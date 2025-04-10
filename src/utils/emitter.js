import mitt from 'mitt'

const emitter = mitt()

emitter.on('send-data-test', () => {
  console('send data test')
})

emitter.emit('send-data-test')
emitter.off('send-data-test')

export default emitter
