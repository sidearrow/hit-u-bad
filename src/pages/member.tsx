import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { microCMS } from '../microCMS';
import { Member } from '../models';
import { MemberBox } from '../components/MemberBox';

import content from '../../content/member.json';
import { PageHeader } from '../components/PageHeader';

const PageComponent: React.FC = () => {
  const title = content.title;
  const description = content.description;

  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    (async () => {
      const _members = await microCMS.getMember();
      setMembers(_members);
    })();
  }, []);

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
