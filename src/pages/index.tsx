import React from 'react';
import { ExternalLink } from 'components/ExternalLink';
import { Layout } from 'components/Layout';
import { settings } from 'settings';

const Component: React.FC = () => (
  <Layout title="" description="一橋大学体育会バドミントン部の公式サイト">
    <div className="text-center mb-8 py-8">
      <h1 className="text-3xl">
        一橋大学
        <br />
        バドミントン部
      </h1>
      <div className="text-gray-600 mt-4">
        Hitotsubashi University Badminton Club was established in 1952.
      </div>
    </div>
    <div className="text-center">
      <div className="mb-4">
        <ExternalLink href={settings.url.twitter}>Twitter</ExternalLink>
      </div>
      <div className="mb-4">
        <ExternalLink href={settings.url.instagram}>Instagram</ExternalLink>
      </div>
      <div className="mb-4">
        <ExternalLink href={settings.url.bbs}>掲示板</ExternalLink>
      </div>
      <div>
        <ExternalLink href={settings.url.map}>
          活動場所（Google Map）
        </ExternalLink>
      </div>
    </div>
  </Layout>
);

export default Component;
