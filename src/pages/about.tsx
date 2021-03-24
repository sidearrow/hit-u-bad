import React from 'react';
import { Layout } from 'components/Layout';
import { Table, Td, Th } from 'components/Table';
import { content } from 'content';

const { annualSchedule, practiceSchedule } = content;

const Component: React.FC = () => {
  const title = content.pages.about.title;
  const description = content.pages.about.description;

  return (
    <Layout title={title} description={description}>
      <section className="mb-8">
        <h2 className="mb-4 text-lg">練習スケジュール</h2>
        <Table>
          <thead>
            <tr>
              <Th>曜日</Th>
              <Th>通常期</Th>
              <Th>休業期</Th>
            </tr>
          </thead>
          <tbody>
            {practiceSchedule.map((v, i) => (
              <tr key={i}>
                <Td className="text-center">{v.dow}</Td>
                <Td className="text-center">{v.normal}</Td>
                <Td className="text-center">{v.holiday}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
      <h2 className="mb-4 text-lg">年間スケジュール</h2>
      <Table>
        {annualSchedule.map((v, i) => (
          <tr key={i}>
            <Td>{v.date}</Td>
            <Td>
              <div>{v.title}</div>
              {v.description && (
                <div className="text-sm ml-2">{v.description}</div>
              )}
            </Td>
          </tr>
        ))}
      </Table>
    </Layout>
  );
};

export default Component;
