import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on('connection', (socket) => {
  socket.on('newUser', (username) => {
    addNewUser(username, socket.id);
    console.log(username);
  });

  socket.on(
    'sendtohome',
    ({ sendername, senderagency, senderpurpose, senderhno }) => {
      const receiver = getUser(senderhno);
      io.to(receiver.socketid).emit('entryalert', {
        sendername,
        senderagency,
        senderpurpose,
      });
      console.log(sendername, senderagency, senderpurpose);
    }
  );
  socket.on('aord', ({ answer, apartno, receiver }) => {
    const send = getUser(receiver);
    io.to(send.socketid).emit('receiveans', {
      answer,
      apartno,
    });
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
  });
});

io.listen(5001);