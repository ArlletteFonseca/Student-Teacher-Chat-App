import React from 'react';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';

// original chat form
const connectionOptions = {
  reconnection: true,
  reconnectionAttempts: 'Infinity',
  timeout: 20000,
  transports: ['websocket']
};

// const socket = io('http://192.168.1.202:3001', connectionOptions);

const socket = io(connectionOptions);

export default class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recvMessages: [],
      databaseMessages: [],
      messageToSend: '',
      teacherID: props.teacherID,
      studentID: props.studentID,
      sender: props.studentName

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getOldMessages();
    socket.on('message', message => {
      this.setState(({
        recvMessages: [...this.state.recvMessages, message]
      }));
    });

  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ messageToSend: event.target.value });

  }

  handleSubmit(event) {
    const newMessage = {
      message: this.state.messageToSend,
      studentID: this.state.studentID,
      teacherID: this.state.teacherID,
      sender: this.state.sender
    };

    event.preventDefault();
    socket.emit('chat message', newMessage);
    this.props.onSubmit(newMessage);
    event.target.reset();
  }

  getOldMessages() {
    fetch(`/api/messages/${this.state.studentID}/${this.state.teacherID}`)
      .then(res => res.json())
      .then(data => this.setState({ databaseMessages: data }))
      .catch(error => console.error('Error', error));
  }

  render() {
    const oldMessages = this.state.databaseMessages;
    const messagesReceived = this.state.recvMessages;

    const listMessages = oldMessages.map((msg, chatID) =>
      <ul key={chatID} className="list-group m-2 listWidth ">
        {msg.sender}
        <li className="list list-group-item d-flex justify-content-between align-items-center">{msg.message}</li>
      </ul>
    );
    const textOfRecvMessages = messagesReceived.map((msg, chatID) =>
      <ul key={chatID} className="list-group m-2 listWidth ">
        <span>{msg.name}</span>
        <li className="list list-group-item d-flex justify-content-between align-items-center">{msg.message}</li>
      </ul>
    );

    return (
      <div >
        <Link to='./studentSearch' className=""><i className="fas fa-chevron-left fa-2x "></i></Link>
        <div className="container-fluid my-container d-flex flex-column align-items-center chatScreen" >
          {listMessages}
          {textOfRecvMessages}

        </div>
        <form onSubmit={this.handleSubmit} className="form gray form-width d-flex align-items-center justify-content-center " method="post">
            <input
              id="input"
              className="chatInput"
              onChange={this.handleChange}
            />
            <button className="btn-success">Send</button>
          </form>
      </div>

    );
  }

}
