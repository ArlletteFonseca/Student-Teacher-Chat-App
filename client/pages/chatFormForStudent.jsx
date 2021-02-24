import React from 'react';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';

const connectionOptions = {
  reconnection: true,
  reconnectionAttempts: 'Infinity',
  timeout: 20000,
  transports: ['websocket']
};
const socket = io('http://192.168.1.47:3001', connectionOptions);

export default class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recvMessages: [],
      databaseMessages: [],
      messageToSend: '',
      teacherID: props.teacherID,
      studentID: props.studentID
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    this.getOldMessages();
    const connectionOptions = {
      reconnection: true,
      reconnectionAttempts: 'Infinity',
      timeout: 20000,
      transports: ['websocket']
    };
    io('http://192.168.1.47:3001', connectionOptions);
    socket.on('message', message => {

      this.setState({ recvMessages: [...this.state.recvMessages, message] });

    });
    // socket.on('message', message => {
    //   this.setState({ recvMessages: [...this.state.recvMessages, message] });
    // });

  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ messageToSend: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit('chat message', this.state.messageToSend);
    const newMessage = {
      message: this.state.messageToSend,
      teacherID: this.state.teacherID,
      studentID: this.state.studentID
    };
    this.props.onSubmit(newMessage);
    event.target.reset();
  }

  getOldMessages() {
    fetch(`/api/messages/${this.state.teacherID}/${this.state.studentID}`)
      .then(res => res.json())
      .then(data => this.setState({ databaseMessages: data }))
      // .then(data => console.log("mydata", data))
      .catch(error => console.error('Error', error));
  }

  render() {
    const oldMessages = this.state.databaseMessages;
    const messagesReceived = this.state.recvMessages;
    const listMessages = oldMessages.map((msg, chatID) =>
      <ul key={chatID} className="list-group m-2 listWidth">
        <p>{msg.firstName} {msg.lastName}</p>
        <li className="list-group-item d-flex justify-content-between align-items-center">{msg.message}</li>
      </ul>
    );
    const textOfRecvMessages = messagesReceived.map((msg, chatID) =>
      <ul key={chatID} className="list-group m-2 listWidth">
        <li className="list-group-item d-flex justify-content-between align-items-center">{msg}</li>
      </ul>
    );

    return (
      <div className="container-fluid my-container d-flex flex-column align-items-center  ">
        <Link to='./studentSearch' className="arrowWidth"><i className="fas fa-chevron-left fa-2x back arrowWidth"></i></Link>
        {listMessages}
        {textOfRecvMessages}
        <form onSubmit={this.handleSubmit} className="form fixed" method="post">
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
