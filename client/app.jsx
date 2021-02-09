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
    this.state = { student: [], studentName: ' ' };
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

  handleChange(newName) {
    this.setState({ studentName: newName });

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
            onChange={this.handleChange('newname')}
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
