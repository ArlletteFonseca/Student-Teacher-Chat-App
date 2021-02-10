import React from 'react';
import Home from './pages/home';
import { Route } from 'react-router-dom';
import TeacherLogin from './pages/teacherLogin';
import TeacherSearch from './pages/teacherSearch';
import StudentInfo from './pages/studentInfo';
import StudentList from './pages/studentList';
import Pattison from './pages/students/pattison';
import Brown from './pages/students/brown';
import Grant from './pages/students/grant';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { student: [], studentName: null };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getDatabase();
  }

  getDatabase() {
    fetch('/api/student')
      .then(res => res.json())
      .then(data => this.setState({ student: data }))
      .catch(error => console.error('Error', error));
  }

  handleChange(event) {
    this.setState({ studentName: event.target.value });
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
        <Route path='/studentInfo'>
          <StudentInfo/>
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
      </div>
    );
  }
}
