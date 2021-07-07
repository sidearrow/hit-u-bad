import React from 'react';
import { Member, MemberPageData } from 'models';

export const MemberBox: React.FC<{ member: Member }> = ({ member }) => {
  const genderColor =
    member.gender == 'm' ? 'border-blue-500' : 'border-red-500';
  const grade = 2022 - member.admissionYear;
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

export const MemberPage: React.FC<{ memberPageData: MemberPageData }> = ({
  memberPageData,
}) => {
  const members = memberPageData.contents.members;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {members.map((member, i) => (
        <React.Fragment key={i}>
          <MemberBox member={member} />
        </React.Fragment>
      ))}
    </div>
  );
};
