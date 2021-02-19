import React from 'react';
import Home from './pages/home';
import { Route } from 'react-router-dom';
import TeacherLogin from './pages/teacherLogin';
import TeacherSearch from './pages/teacherSearch';
import StudentList from './pages/studentList';
import Pattison from './pages/students/pattison';
import Brown from './pages/students/brown';
import Grant from './pages/students/grant';
import ChatForm from './pages/chatForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      studentName: null,
      messages: [],
      studentID: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleID = this.handleID.bind(this);
  }

  componentDidMount() {
    this.getAllStudents();
    this.getAllMessages();
  }

  getAllStudents() {
    fetch('/api/student')
      .then(res => res.json())
      .then(data => this.setState({ students: data }))
      .catch(error => console.error('Error', error));
  }

  getAllMessages() {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => this.setState({ messages: data }))
      .catch(error => console.error('Error', error));
  }

  handleChange(event) {
    this.setState({ studentName: event.target.value });
  }

  handleID(studentID) {
    this.setState({ studentID: studentID }, function () {
    });
  }

  addMessage(newMessage) {
    const messageList = this.state.messages;
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    })
      .then(res => res.json())
      .then(newMessage => {
        messageList.push(newMessage);
        this.setState({ messages: messageList });
      })
      .catch(error => console.error('Error', error));
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
          />
        </Route>
        <Route path='/studentList'>
          <StudentList
            onChange={this.state.students}
            onClick={this.handleID}
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
        <Route path='/chatForm'>
          <ChatForm
          database= {this.state.messages}
          onSubmit= {this.addMessage}
          studentID={this.state.studentID}
          />
        </Route>
      </div>
    );
  }
}
