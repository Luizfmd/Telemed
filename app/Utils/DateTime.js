'use strict'

const normalizeTimestamp = async (timestamp) => {
    const date_time = timestamp.split(' ');
    const date = date_time[0].split('/');
    const time = date_time[1];
    return `${date[2]}-${date[1]}-${date[0]} ${time}`;
}


module.exports = {
    normalizeTimestamp
}
