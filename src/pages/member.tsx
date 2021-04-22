import React from 'react';
import { Layout } from '../components/Layout';
import { MemberBox } from '../components/MemberBox';
import { content } from '../content';

const PageComponent: React.FC = () => {
  const title = content.pages.member.title;
  const description = content.pages.member.description;
  const members = content.members;

  return (
    <Layout title={title} description={description}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {members.map((member, i) => (
          <React.Fragment key={i}>
            <MemberBox member={member} />
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};

export default PageComponent;
