import React from 'react';
import Home from './pages/home';
import { Route, useHistory } from 'react-router-dom';
import TeacherLogin from './pages/teacherLogin';
import TeacherSearch from './pages/teacherSearch';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'dr.brant@college.edu', password: 'lgy' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  handleClick() {
    const history = useHistory();
    const path = './teacherSearch';
    history.push(path);
  }

  render() {
    return (
     <div>
       <Route exact path='/'>
         <Home/>
       </Route>
       <Route path='/teacherLogin'>
          <TeacherLogin
            onSubmit={this.handleSubmit}
            onClick={this.handleClick}
          />
       </Route>
       <Route path='/teacherSearch'>
         <TeacherSearch />
        </Route>
     </div>
    );
  }
}
