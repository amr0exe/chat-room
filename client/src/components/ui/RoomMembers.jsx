
// components/RoomMembers.js
import React from 'react';

const RoomMembers = ({ members }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Room Members</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index} className="py-2 border-b last:border-b-0">
            {member}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomMembers;