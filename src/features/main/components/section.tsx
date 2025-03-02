import ImageCard from '@/components/image-card';

interface Destination {
  id: number;
  title: string;
  description: string;
  image_url: string;
  location: string;
  price: string;
  price_currency: string;
  rating?: number;
  category_name?: string;
}

interface SectionProps {
  title: string;
  data: Destination[];
}

const Section: React.FC<SectionProps> = ({ title, data }) => (
  <section className='py-12'>
    <div className='mx-auto max-w-7xl px-4'>
      <h2 className='mb-8 text-2xl font-semibold text-orange-300'>{title}</h2>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'>
        {data.map((item) => (
          <ImageCard
            key={item.id}
            name={item.title}
            description={item.description}
            imageUrl={item.image_url}
            location_url={`https://www.google.com/maps/search/?q=${encodeURIComponent(item.title)}`}
            price={parseFloat(item.price)}
            price_currency={item.price_currency}
            rating={item.rating || 4.5}
            viewUrl={`/wheretogo/${item.id}`}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Section;
