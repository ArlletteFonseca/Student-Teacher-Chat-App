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

const socket = io('http://192.168.1.202:3001', connectionOptions);
// const socket = io(connectionOptions);

export default class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recvMessages: [],
      databaseMessages: [],
      messageToSend: '',
      teacherID: props.teacherID,
      studentID: props.studentID,
      sender: props.teacherName,
      avatar: 'orange'

    };
    this.myRef = React.createRef();
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

  componentDidUpdate() {
    if (this.myRef) {
      this.handleScroll();
    }
  }

  handleChange(event) {
    this.setState({ messageToSend: event.target.value });
  }

  handleSubmit(event) {
    const newMessage = {
      message: this.state.messageToSend,
      studentID: this.state.studentID,
      teacherID: this.state.teacherID,
      sender: this.state.sender,
      avatar: this.state.avatar
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

  handleScroll() {
    this.myRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'center', bottom: 0 });

  }

  render() {
    const oldMessages = this.state.databaseMessages;
    const messagesReceived = this.state.recvMessages;
    const listMessages = oldMessages.map((msg, chatID) =>

      <ul key={chatID} className="chat">
        <li className="left clearfix">
          <span className="chat-img pull-left">
            <p className={msg.avatar}>{msg.sender[0]}</p>
          </span>
          <div className="chat-body clearfix">
            <div className="header">
              <strong className="primary-font ">{msg.sender}</strong>
            </div>
              <p>{msg.message}</p>
          </div>
        </li>
      </ul>

    );
    const textOfRecvMessages = messagesReceived.map((msg, chatID) =>

    <ul className="chat" key={chatID}>
        <li className="left clearfix">
          <span className="chat-img pull-left">
           <p className={msg.avatar}>{msg.name[0]}</p>
          </span>
          <div className="chat-body clearfix" >
            <div className="header">
              <strong className="primary-font ">{msg.name}</strong>
            </div>
              <p >{msg.message}</p>
          </div>
        </li>
      </ul>

    );

    return (

    <div >
       <div className="teacherSignOn"><p className="nameMargin">{this.state.sender} <span>|</span> Teacher</p></div>
     <Link to='./teacherSearch' className="fixed "><i className="fas fa-chevron-left fa-2x arrowMargin "></i></Link>
        <div className="parent" ref={this.myRef} >
          {listMessages}
          {textOfRecvMessages}

        </div>

     <div className="fixed-input ">
         <form onSubmit={this.handleSubmit} >
          <div className="input-group " >
            <input id="btn-input" type="text" className="form-control  input-sm " placeholder="Type your message here..." onChange={this.handleChange} />
            <span className="input-group-btn">
              <button className="btn btn-warning" id="btn-chat" >Send</button>
            </span>
           </div>
          </form>
      </div>
    </div>

    );
  }

}
