import Landing from './components/home/landing';
import NavBar from './components/home/navbar';
import FAQ from './faq/page';
import Footer from './components/home/footer';
import { Analytics } from '@vercel/analytics/react';
import Instructions from './instructions/page';


export default function Page() {
  return (
    <>
      <NavBar />
      <Landing />
      <FAQ id='faq' />
      <Instructions id='instructions' />
      <Footer />
      <Analytics />
    </>
  )
}
