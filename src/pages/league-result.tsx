import React from 'react';
import { Layout } from '../components/Layout';
import { Table, Td, Th } from '../components/Table';
import { content } from '../content';

const { leagueResult } = content;

const Component: React.FC = () => {
  const title = content.pages.leagueResult.title;
  const description = content.pages.leagueResult.description;

  return (
    <Layout title={title} description={description}>
      <section>
        <Table>
          <thead>
            <tr>
              <Th>年度</Th>
              <Th>男子</Th>
              <Th>女子</Th>
            </tr>
          </thead>
          <tbody>
            {leagueResult.map((v, i) => (
              <tr key={i}>
                <Td>{v.year}</Td>
                <Td>{v.m}</Td>
                <Td>{v.w}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </Layout>
  );
};

export default Component;
