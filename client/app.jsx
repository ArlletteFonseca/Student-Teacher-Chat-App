import React from 'react';
import Home from './pages/home';
import { Route } from 'react-router-dom';
import TeacherLogin from './pages/teacherLogin';
import TeacherSearch from './pages/teacherSearch';
import StudentInfo from './pages/studentInfo';
import StudentList from './pages/studentList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { student: [] };
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
          <TeacherSearch/>
        </Route>
        <Route path='/studentInfo'>
          <StudentInfo/>
        </Route>
        <Route path='/studentList'>
          <StudentList
            onChange={this.state.student}
          />
        </Route>
      </div>
    );
  }
}
