import MainLayout from '@/features/main/layout';
import PostList from './component/PostList';

const WhereToGo = () => {
  return (
    <MainLayout>
      <section
        className='bg-gray-100 bg-cover bg-center py-12'
        style={{ backgroundImage: 'url(/bg-2.jpg)', height: '60vh' }}
      ></section>

      <PostList page={1} />
    </MainLayout>
  );
};

export default WhereToGo;
