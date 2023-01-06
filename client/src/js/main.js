import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const container = document.querySelector('.message-container');
const form = document.querySelector('.message-form');
const messageInput = document.getElementById('message');
const roomInput = document.getElementById('room');
const roomButton = document.querySelector('.room__button');

/* ======================= Socket Events ======================= */

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  displayMessage(`You are now connected with ID: ${socket.id}`);
});

socket.on('receive-message', (message) => {
  displayMessage(message);
});

/* ======================= Event Handlers ======================= */

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = messageInput.value;
  const room = messageInput.value;

  if (message === '') return undefined;

  displayMessage(message);
  socket.emit('send-message', message);

  messageInput.value = '';

  return undefined;
});

roomButton.addEventListener('click', () => {
  const room = roomInput.value;

  console.log('Room button click:', room);
});

function displayMessage(message) {
  const p = document.createElement('p');

  p.classList.add('message-container__item');
  p.textContent = message;

  container.append(p);
}
