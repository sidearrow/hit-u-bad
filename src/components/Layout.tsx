import React from 'react';
import Head from 'next/head';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

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
      <main className="flex-grow flex-shrink relative max-w-screen-md mx-auto w-full">
        <div className="flex-grow flex-shrink w-full">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            {children}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
