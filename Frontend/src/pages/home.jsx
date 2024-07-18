import React from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    title: 'Shoes qwerty!',
    description: 'If a dog chews shoes whose shoes does he choose?',
    imageUrl: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  },
  {
    id: 2,
    title: 'Headphones',
    description: 'Immerse yourself in high-quality sound.',
    imageUrl: 'https://img.freepik.com/free-photo/shiny-black-headphones-reflect-golden-nightclub-lights-generated-by-ai_188544-10148.jpg',
  },
  {
    id: 3,
    title: 'Smartwatch',
    description: 'Stay connected and track your fitness goals.',
    imageUrl: 'https://img.freepik.com/free-vector/realistic-fitness-trackers_23-2148530529.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721174400&semt=ais_user',
  },
  {
    id: 2,
    title: 'Headphones',
    description: 'Immerse yourself in high-quality sound.',
    imageUrl: 'https://img.freepik.com/free-photo/shiny-black-headphones-reflect-golden-nightclub-lights-generated-by-ai_188544-10148.jpg',
  },
  {
    id: 3,
    title: 'Smartwatch',
    description: 'Stay connected and track your fitness goals.',
    imageUrl: 'https://img.freepik.com/free-vector/realistic-fitness-trackers_23-2148530529.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721174400&semt=ais_user',
  },
  {
    id: 2,
    title: 'Headphones',
    description: 'Immerse yourself in high-quality sound.',
    imageUrl: 'https://img.freepik.com/free-photo/shiny-black-headphones-reflect-golden-nightclub-lights-generated-by-ai_188544-10148.jpg',
  },
  {
    id: 3,
    title: 'Smartwatch',
    description: 'Stay connected and track your fitness goals.',
    imageUrl: 'https://img.freepik.com/free-vector/realistic-fitness-trackers_23-2148530529.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721174400&semt=ais_user',
  },
  {
    id: 2,
    title: 'Headphones',
    description: 'Immerse yourself in high-quality sound.',
    imageUrl: 'https://img.freepik.com/free-photo/shiny-black-headphones-reflect-golden-nightclub-lights-generated-by-ai_188544-10148.jpg',
  },
  {
    id: 3,
    title: 'Smartwatch',
    description: 'Stay connected and track your fitness goals.',
    imageUrl: 'https://img.freepik.com/free-vector/realistic-fitness-trackers_23-2148530529.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721174400&semt=ais_user',
  },
  
];

function Home() {
  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center'>
        <div className="flex flex-wrap w-[93vw] items-center justify-center ml-1 p-1">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
