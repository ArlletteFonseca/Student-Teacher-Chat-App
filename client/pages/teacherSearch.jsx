import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function teacherSearch(props) {
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleClick(e) {
    e.preventDefault(e);
    const lowercaseName = props.value.toLowerCase();
    if (lowercaseName.includes('brown') || lowercaseName.includes('michael')) {
      const path = './brown';
      history.push(path);
    } else if (lowercaseName.includes('amy') || lowercaseName.includes('pattison')) {
      const path = './pattison';
      history.push(path);
    } else if (lowercaseName.includes('josh') || lowercaseName.includes('grant')) {
      const path = './grant';
      history.push(path);
    }

  }

  return (
    <div>
      <div className="container-fluid my-container d-flex flex-column justify-content-center align-items-center ">
        <div className="row">
          <div className="col">
            <h1 className="logo">CHAT BOX</h1>
          </div>
        </div>
        <div className="row ">
          <div className="col ">
            <h4 className="heading">Help a Student!</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit} className=" d-flex  flex-column align-items-center justify-content-around mb-5">
          <div className="row form-group input-row-search">
            <div className="col">
              <input type="text" onChange={props.onChange}name="studentName" placeholder="Search by name" className="inputSearch"/>
            </div>
          </div>
          <div className="row form-group input-row-search">
            <div className="col">
              <button onClick={handleClick} type="submit"className="searchBtn">Search</button>
            </div>
          </div>
            <div className="row form-group link-row-search">
              <div className="col ">
                <Link className="linkSearch" to='./studentList'>Browse by Name</Link>
              </div>
            </div>
    </form>
          <div className="row line-row">

          </div>
          <div className="row  menu-row">
            <div className="col p-0 d-flex align-items-end justify-content-between">
            <div><Link to='./'><i className="fas fa-sign-out-alt fa-2x"></i></Link></div>
            <div><Link to='./messages'><i className="fas fa-envelope fa-2x"></i></Link></div>
            <div><Link to='./userPage'><i className="fas fa-user fa-2x"></i></Link></div>
            </div>
          </div>
    </div>
    </div>
  );
}
