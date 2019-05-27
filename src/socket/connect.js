import socketIO from 'socket.io-client';

const io = socketIO.connect(`https://socket.whereis.com.hk`);

export default io;