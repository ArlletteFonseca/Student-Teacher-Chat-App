import React from 'react';
import { Link } from 'react-router-dom';

export default function studentList(props) {
  const listStudent = props.onChange.map(student =>
    <ul className="list-group m-2" key={student.studentID}>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <span className="badge bg-secondary badge-pill "><Link className=" studentLink" to={'/' + student.lastName }></Link>
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
    <div>
      <Link to='./teacherSearch'><i className="fas fa-chevron-left fa-2x back"></i></Link>
      {listStudent}
    </div>
  );
}
