'use strict'

const md5     = require('md5');

const generateRoomLink = async () => {
    const roomHash = `${md5((new Date().getMilliseconds() * 1000))}`;
    return `${roomHash}`;
}

const generateRoomPassword = async () => {
    return '123123';
}

module.exports = {
    generateRoomLink,
    generateRoomPassword
}
