import React from 'react';
import Home from './pages/home';
import { Route } from 'react-router-dom';
import TeacherLogin from './pages/teacherLogin';
import TeacherSearch from './pages/teacherSearch';
import StudentList from './pages/studentList';
import Pattison from './pages/students/pattison';
import Brown from './pages/students/brown';
import Grant from './pages/students/grant';
import ChatScreen from './pages/chatScreen';
import { io } from 'socket.io-client';
const connectionOptions = {
  reconnection: true,
  reconnectionAttempts: 'Infinity',
  timeout: 20000,
  transports: ['websocket']
};
const socket = io('http://192.168.1.47:3001', connectionOptions);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: [],
      studentName: null,
      message: [],
      teacherId: null,
      studentId: null,
      setResponse: ' '
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getStudents();
    this.getMessages();
    const connectionOptions = {
      reconnection: true,
      reconnectionAttempts: 'Infinity',
      timeout: 20000,
      transports: ['websocket']
    };
    io('http://192.168.1.47:3001', connectionOptions);
  }

  getStudents() {
    fetch('/api/student')
      .then(res => res.json())
      .then(data => this.setState({ student: data }))
      .catch(error => console.error('Error', error));
  }

  getMessages() {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => this.setState({ message: data }))
      .catch(error => console.error('Error', error));
  }
  // bind

  handleChange(event) {
    this.setState({ studentName: event.target.value });

  }

  handleMessage(event) {
    this.setState({ message: event.target.value });

  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.message) {
      socket.emit('chat message', this.state.message);
    }
    event.target.reset();
  }

  render() {
    return (
      <div>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/teacherLogin'>
          <TeacherLogin/>
        </Route>
        <Route path='/teacherSearch'>
          <TeacherSearch
            value={this.state.studentName}
            onChange={this.handleChange}
            onClick={this.handleClick}
          />
        </Route>
        <Route path='/studentList'>
          <StudentList
            onChange={this.state.student}
          />
        </Route>
        <Route path='/pattison'>
          <Pattison/>
        </Route>
        <Route path='/brown'>
          <Brown/>
        </Route>
        <Route path='/grant'>
          <Grant/>
        </Route>
        <Route path='/chatScreen'>
          <ChatScreen
            onChange={this.handleMessage}
            onSubmit= {this.handleSubmit}
            newMessage={this.state.message}
          />
        </Route>

      </div>
    );
  }
}
