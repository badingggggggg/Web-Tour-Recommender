import NavBar from '@/features/main/components/nav-bar';
import Footer from './components/footer';

export default async function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen flex-col bg-transparent'>
      <NavBar />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
