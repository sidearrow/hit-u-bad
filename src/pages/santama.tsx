import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

import { Layout } from 'components/Layout';
import { Button } from 'components/Button';
import { content } from 'content';

const groupBy = <T extends { [key: string]: any }>(
  objects: T[],
  key: keyof T
): { [key: string]: T[] } =>
  objects.reduce((map, obj) => {
    map[obj[key]] = map[obj[key]] || [];
    map[obj[key]].push(obj);
    return map;
  }, {} as { [key: string]: T[] });

const santamaResult = groupBy(content.santamaResult, 'year');

const Component: React.FC = () => {
  const title = content.pages.santama.title;
  const description = content.pages.santama.description;

  return (
    <Layout title={title} description={description}>
      <h2 className="h2">過去の結果</h2>
      <section>
        {Object.keys(santamaResult).map((k, i) => (
          <>
            <h3 className="h3">{k} 年</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-1 pb-2" key={i}>
              {santamaResult[k].map((v, i) => (
                <div key={i}>
                  <a
                    href={`files/santama/${k}/${v.fileName}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button color={v.title[0] === 'M' ? 'blue' : 'red'}>
                      <div className="flex">
                        <span className="">
                          <FontAwesomeIcon icon={faFilePdf} />
                        </span>
                        <span className="flex-grow text-center">{v.title}</span>
                      </div>
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </>
        ))}
      </section>
    </Layout>
  );
};

export default Component;
