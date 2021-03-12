import React from 'react';
import { Link } from 'react-router-dom';

export default function nouser() {
  return (
    <div>
        <Link to='./teacherSearch' className="back"><i className="fas fa-chevron-left fa-2x"></i></Link>
      <p className='noUser'>User not found</p>
    </div>
  );
}
