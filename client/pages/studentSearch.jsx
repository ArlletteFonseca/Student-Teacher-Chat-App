import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function teacherSearch(props) {
  const history = useHistory();

  function handleClick(e) {
    e.preventDefault(e);
    const lowercaseName = props.value.toLowerCase();
    const teacherArr = ['diapaola', 'brant', 'darlene', 'mund', 'jack', 'hosea'];
    if (lowercaseName.includes('diapaola') || lowercaseName.includes('brant')) {
      const path = './diapaola';
      history.push(path);
    } else if (lowercaseName.includes('darlene') || lowercaseName.includes('mund')) {
      const path = './mund';
      history.push(path);
    } else if (lowercaseName.includes('jack') || lowercaseName.includes('hosea')) {
      const path = './hosea';
      history.push(path);
    } else if (!teacherArr.includes(lowercaseName)) {
      const path = './nouserStudent';
      history.push(path);
    }
  }

  return (
    <div>
        <div className="teacherSignOn"><p>{props.studentName} <span>|</span> Student</p></div>
      <div className="container-fluid my-container d-flex flex-column justify-content-center align-items-center ">
        <div className="row">
          <div className="col">
           <h1 className="logo">CHATBOX</h1>
          </div>
        </div>
        <div className="row ">
          <div className="col ">
            <h4 className="h4">Welcome {props.studentName}</h4>
            <h5 className="heading">Find a Teacher for help!</h5>
          </div>
        </div>
        <form className=" d-flex  flex-column align-items-center justify-content-around mb-5">
          <div className="row form-group input-row-search">
            <div className="col">
              <input type="text" onChange={props.onChange} name="studentName" placeholder="Search by name" className="inputSearch" />
            </div>
          </div>
          <div className="row form-group input-row-search">
            <div className="col">
              <button onClick={handleClick} type="submit" className="searchBtn">Search</button>
            </div>
          </div>
          <div className="row form-group link-row-search">
            <div className="col ">
              <Link className="linkSearch" to='./teacherList'>Browse by Name</Link>
            </div>
          </div>
        </form>
        <div className="row line-row">

        </div>
        <div className="row  m-2 ">
          <div className="col p-0 d-flex align-items-end justify-content-between">
            <div onClick={props.onClick}><Link to='./' ><i className="fas fa-sign-out-alt fa-2x"></i></Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}
