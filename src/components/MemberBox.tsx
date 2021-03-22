import React from 'react';
import { Member } from '../models';

type Props = {
  member: Member;
};

export const MemberBox: React.FC<Props> = ({ member }) => {
  const genderColor =
    member.gender == 'm' ? 'border-blue-500' : 'border-red-500';
  const grade = 2021 - member.admissionYear;
  return (
    <div className="border p-2">
      <div className="mb-2">
        <span className={`pl-1 border-l-8 ${genderColor}`}>
          {member.lastName} {member.firstName}
        </span>
        <span className="text-sm ml-4">
          <span>{grade}年生</span>
          <span className="ml-2">{member.faculty}</span>
        </span>
      </div>
      <div>
        {member.positions.map((pos, i) => (
          <span
            key={i}
            className="border bg-gray-100 text-gray-600 rounded p-1 mr-1 text-sm"
          >
            {pos}
          </span>
        ))}
        {member.oldPositions.map((pos, i) => (
          <span
            key={i}
            className="rounded bg-gray-100 text-gray-600 p-1 mr-1 text-sm"
          >
            元 {pos}
          </span>
        ))}
      </div>
    </div>
  );
};
