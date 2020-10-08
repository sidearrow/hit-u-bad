import React from 'react';
import { Layout } from '../components/Layout';
import { Container } from '../components/Container';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { CONFIG } from '../config';
import { PracticeTime } from '../pageComponents/index/PracticeTime';
import { BtnLink } from '../components/BtnLink';
import { Schedule } from '../pageComponents/index/Schedule';
import { Anchor } from '../components/Anchor';

export const headings = {
  sns: {
    id: 'sns',
    text: 'SNS',
  },
  activityPlace: {
    id: 'activity-place',
    text: '活動場所',
  },
  practiceTime: {
    id: 'practice-time',
    text: '練習時間',
  },
  schedule: {
    id: 'schedule',
    text: '年間スケジュール',
  },
};

const Component: React.FC = () => (
  <Layout title="" description="一橋大学体育会バドミントン部の公式サイト">
    <Container>
      <div className="text-center mb-16">
        <h1>
          <span className="text-3xl text-gray-900 tracking-widest font-bold">
            一橋大学
            <br />
            バドミントン部
          </span>
        </h1>
        <div>
          <span className="text-gray-600 font-serif">
            Hitotsubashi University Badminton Club was established in 1952.
          </span>
        </div>
      </div>
      <div>
        {(Object.keys(headings) as (keyof typeof headings)[]).map((k, i) => (
          <a href={`#${headings[k].id}`} className="mr-2 inline-block" key={i}>
            #{headings[k].text}
          </a>
        ))}
      </div>
      <section className="mt-8">
        <Anchor id={headings.sns.id}>
          <h2 className="h2">{headings.sns.text}</h2>
        </Anchor>
        <p>最新の活動情報等は Twitter, Instagram もご覧ください。</p>
        <div className="grid grid-cols-2 gap-2">
          <BtnLink href={CONFIG.url.twitter} icon={faTwitter} text="Twitter" />
          <BtnLink
            href={CONFIG.url.instagram}
            icon={faInstagram}
            text="Instagram"
          />
        </div>
      </section>
      <section className="mt-8">
        <Anchor id={headings.activityPlace.id}>
          <h2 className="h2">{headings.activityPlace.text}</h2>
        </Anchor>
        <div>一橋大学 小平国際キャンパス内 体育館</div>
        <div className="mt-4">
          <amp-iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.251314709937!2d139.47211655130576!3d35.72003733535209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e69b620ced03%3A0xf68c4deae0feda0c!2z5LiA5qmL5aSn5a2mIOWwj-W5s-Wbvemam-OCreODo-ODs-ODkeOCuQ!5e0!3m2!1sja!2sjp!4v1602116332462!5m2!1sja!2sjp"
            width="640"
            height="360"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            layout="responsive"
            sandbox="allow-scripts allow-same-origin allow-popups"
          ></amp-iframe>
        </div>
      </section>
      <section className="mt-8">
        <Anchor id={headings.practiceTime.id}>
          <h2 className="h2">{headings.practiceTime.text}</h2>
        </Anchor>
        <PracticeTime />
      </section>
      <section className="my-8">
        <Anchor id={headings.schedule.id}>
          <h2 className="h2 anchor">{headings.schedule.text}</h2>
        </Anchor>
        <Schedule />
      </section>
    </Container>
  </Layout>
);

export default Component;

export const config = { amp: true };
