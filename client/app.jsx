import React from 'react';
import Home from './pages/home';
import { Route } from 'react-router-dom';
import TeacherLogin from './pages/teacherLogin';
import TeacherSearch from './pages/teacherSearch';
import StudentList from './pages/studentList';
import Pattison from './pages/students/pattison';
import Brown from './pages/students/brown';
import Grant from './pages/students/grant';
import ChatFormForTeacher from './pages/chatFormForTeacher';
import ChatFormForStudent from './pages/chatFormForStudent';
import StudentLogin from './pages/studentLogin';
import StudentSearch from './pages/studentSearch';
import TeacherList from './pages/teacherList';
import Mund from './pages/teachers/mund';
import Diapaola from './pages/teachers/diapaola';
import Hosea from './pages/teachers/hosea';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      messages: [],
      studentID: 1,
      teacherID: 3,
      teachers: [],
      studentName: '',
      teacherName: ''

    };
    this.handleTeacherChange = this.handleTeacherChange.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleStudentID = this.handleStudentID.bind(this);
    this.handleTeacherID = this.handleTeacherID.bind(this);
    this.handleStudentChange = this.handleStudentChange.bind(this);
  }

  componentDidMount() {
    this.getAllStudents();
    this.getAllTeachers();
  }

  getAllStudents() {
    fetch('/api/student')
      .then(res => res.json())
      .then(data => this.setState({ students: data }))
      .catch(error => console.error('Error', error));
  }

  getAllTeachers() {
    fetch('/api/teacher')
      .then(res => res.json())
      .then(data => this.setState({ teachers: data }))
      .catch(error => console.error('Error', error));
  }

  handleTeacherChange(event) {
    this.setState({ studentName: event.target.value });
  }

  handleStudentChange(event) {
    this.setState({ teacherName: event.target.value });
  }

  handleTeacherID(key) {
    this.setState({ studentID: key }, function () {
    });
  }

  handleStudentID(key) {
    this.setState({ teacherID: key });
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
        <Route path='/studentLogin'>
          <StudentLogin/>
        </Route>
        <Route path='/teacherSearch'>
          <TeacherSearch
            onChange={this.handleTeacherChange}
            value={this.state.studentName}
          />
        </Route>
        <Route path='/studentSearch'>
          <StudentSearch
            onChange={this.handleStudentChange}
            value={this.state.teacherName}
          />
        </Route>
        <Route path='/studentList'>
          <StudentList
            onChange={this.state.students}
            onClick={this.handleStudentID}
          />
        </Route>
        <Route path='/teacherList'>
          <TeacherList
            onChange={this.state.teachers}
            onClick={this.handleTeacherID}
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
        <Route path='/mund'>
          <Mund/>
        </Route>
        <Route path='/diapaola'>
          <Diapaola/>
        </Route>
        <Route path='/hosea'>
          <Hosea/>
        </Route>

        <Route path='/chatFormForTeacher'>
          <ChatFormForTeacher
          database= {this.state.messages}
          onSubmit= {this.addMessage}
          studentID={this.state.studentID}
          />
        </Route>
        <Route path='/chatFormForStudent'>
          <ChatFormForStudent
          database= {this.state.messages}
          onSubmit= {this.addMessage}
          teacherID={this.state.studentID}
          />
        </Route>
      </div>
    );
  }
}
