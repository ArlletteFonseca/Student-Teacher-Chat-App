import React from 'react';
import { Link } from 'react-router-dom';

export default function studentList(props) {
  function handleCLick(key) {
    props.onClick(key);
  }

  const listTeacher = props.onChange.map(teacher =>

    <ul className="list-group m-2 " key={teacher.teacherID}>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <span className="badge badge-pill "><Link className=" teacherLink" to={'/' + teacher.lastName} key={teacher.teacherID} onClick={() => handleCLick(teacher.teacherID)}><i className="fas fa-user-check fa-lg"></i></Link>
        </span>
        <div className="d-flex justify-content-around align-items-center">
          <span className="name">{teacher.firstName}</span> <span className="name">{teacher.lastName}</span>
        </div>
      </li>
      <li className="list-group-item d-flex justify-content-end align-items-center ">
        {teacher.course}
      </li>
    </ul>

  );

  return (
    <div className="container-fluid ">
      <Link to='./studentSearch' className="arrowWidth "><i className="fas fa-chevron-left fa-2x "></i></Link>
      <p className="m-2 arrowWidth arrowP">Select Teacher</p>
      {listTeacher}
    </div>
  );
}
