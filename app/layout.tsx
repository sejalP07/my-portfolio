import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Sejal P — Portfolio',
  description: 'MCA Student & Full-Stack Developer at RV Institute of Technology and Management, Bangalore.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
