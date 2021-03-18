import React from 'react';
import { Link } from 'react-router-dom';

export default function studentList(props) {
  function handleCLick(key) {
    props.onClick(key);
  }

  const listStudent = props.onChange.map(student =>
    <ul className="list-group m-2 " key={student.studentID}>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <span className="badge  badge-pill "><Link className=" studentLink" to={'/' + student.lastName} key={student.studentID} onClick={() => handleCLick(student.studentID)}>Open Profile</Link>
        </span>
        <div className="d-flex justify-content-around align-items-center">
          <span className="name">{student.firstName}</span> <span className="name">{student.lastName}</span>
        </div>
      </li>
      <li className="list-group-item d-flex justify-content-end align-items-center ">
        {student.gradeLevel}
      </li>
    </ul>

  );

  return (
    <div className="container-fluid ">
      <Link to='./teacherSearch' className="arrowWidth "><i className="fas fa-chevron-left fa-2x "></i></Link>
      <p className="m-2 arrowWidth arrowP">Select Student</p>
        {listStudent}
    </div>
  );
}
