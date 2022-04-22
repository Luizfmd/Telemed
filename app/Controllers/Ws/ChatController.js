'use strict'

const moment = require('moment');

//CANAL DE CHAT
class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  onMessage(dt) {
    const data = Object.assign(dt, { hour: moment().format('HH:mm') })
    this.socket.broadcastToAll('message', data);
  }
  onError() {

  }
  onClose() {

  }
}

module.exports = ChatController
