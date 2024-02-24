import React from 'react';

function Resident({ resident }) {
  return (
    <li>
      <strong>Name:</strong> {resident.name}, <strong>Height:</strong>{' '}
      {resident.height}, <strong>Mass:</strong> {resident.mass} ,{' '}
      <strong>Gender:</strong> {resident.gender}
    </li>
  );
}

export default Resident;
