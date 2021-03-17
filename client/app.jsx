
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
import Hosea from './pages/teachers/hosea';
import Diapaola from './pages/teachers/diapaola';
import NouserTeacher from './pages/nouserTeacher';
import NouserStudent from './pages/nouserStudent';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      messages: [],
      studentID: 3,
      teacherID: 2,
      teachers: [],
      searchStudentName: '',
      searchTeacherName: '',
      teacherName: 'Darlene Mund',
      studentName: 'Michael Brown'
    };

    this.addMessage = this.addMessage.bind(this);
    this.handleStudentName = this.handleStudentName.bind(this);
    this.handleTeacherName = this.handleTeacherName.bind(this);
    this.handleStudentID = this.handleStudentID.bind(this);
    this.handleTeacherID = this.handleTeacherID.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
    fetch('/api/teacher/')
      .then(res => res.json())
      .then(data => this.setState({ teachers: data }))
      .catch(error => console.error('Error', error));
  }

  handleStudentName(event) {
    this.setState({ searchStudentName: event.target.value });
  }

  handleTeacherName(event) {
    this.setState({ searchTeacherName: event.target.value });
  }

  handleStudentID(key) {
    this.setState({ studentID: key });
  }

  handleTeacherID(key) {
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

  handleLogout() {
    this.setState({ studentID: 3, teacherID: 2 });
  }

  render() {
    return (
      <div>
        <Route exact path='/' demo={this.handleLogout}>
          <Home />
        </Route>
        <Route path='/teacherLogin'>
          <TeacherLogin />
        </Route>
        <Route path='/studentLogin'>
          <StudentLogin />
        </Route>

        <Route path='/teacherSearch'>
          <TeacherSearch
            value={this.state.searchStudentName}
            onChange={this.handleStudentName}
            teacher={this.state.teachers}
            teacherID={this.state.teacherID}
            onClick={this.handleLogout}

          />
        </Route>
        <Route path='/studentSearch'>
          <StudentSearch
            value={this.state.searchTeacherName}
            onChange={this.handleTeacherName}
            student={this.state.students}
            studentID = {this.state.studentID}
            onClick={this.handleLogout}

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
          <Pattison
            onClick={this.handleStudentID}
          />
        </Route>
        <Route path='/brown'>
          <Brown
            onClick={this.handleStudentID}
          />
        </Route>
        <Route path='/grant'>
          <Grant
            onClick={this.handleStudentID}
          />
        </Route>
        <Route path='/mund'>
          <Mund
            onClick={this.handleTeacherID}
          />
        </Route>
        <Route path='/hosea'>
          <Hosea
            onClick={this.handleTeacherID}
          />
        </Route>
        <Route path='/diapaola'>
          <Diapaola
            onClick={this.handleTeacherID}
          />
        </Route>
        <Route path='/chatFormForTeacher'>
         <ChatFormForTeacher
            database={this.state.messages}
            onSubmit={this.addMessage}
            studentID={this.state.studentID}
            teacherID={this.state.teacherID}
            teacherList={this.state.teachers}
            studentList={this.state.students}
            teacherName={this.state.teacherName}
          />
        </Route>
        <Route path='/chatFormForStudent'>
          <ChatFormForStudent
            database={this.state.messages}
            onSubmit={this.addMessage}
            studentID={this.state.studentID}
            teacherID={this.state.teacherID}
            teacherList={this.state.teachers}
            studentList={this.state.students}
            studentName={this.state.studentName}
          />
        </Route>
        <Route path='/nouserTeacher'>
          <NouserTeacher/>
        </Route>
        <Route path='/nouserStudent'>
          <NouserStudent/>
        </Route>
      </div>
    );
  }
}
