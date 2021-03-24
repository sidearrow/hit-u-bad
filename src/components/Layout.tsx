import React from 'react';
import Head from 'next/head';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { PageHeader } from './PageHeader';
import { Container } from './Container';

type Props = {
  title: string;
  description: string;
};

export const Layout: React.FC<Props> = ({ children, title, description }) => {
  return (
    <div className="flex flex-col h-full">
      <Head>
        <title>
          {title === '' ? title : title + ' | '}一橋大学バドミントン部
        </title>
        <meta name="description" content={description} />
      </Head>
      <header className="sticky top-0 z-50 bg-white">
        <Navbar />
      </header>
      <main className="flex-grow flex-shrink">
        {title !== '' && <PageHeader>{title}</PageHeader>}
        <Container>
          <div className="py-4">{children}</div>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
