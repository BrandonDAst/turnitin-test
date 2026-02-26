import Image from 'next/image';
import React from 'react';
import { Dog } from '@/types/dog';

type CardProps = {
  dog: Dog;
  addToFavorites: (dog: Dog) => void;
};

const DogMainCard = (props: CardProps) => {
  return (
    <div
      className="flex flex-col w-[300px] min-h-[300px] rounded-lg shadow-l overflow-hidden"

    >
      <div id="image" className="w-[300px] h-[300px] ">
        {props.dog?.imageUrl && (
          <Image
            width={300}
            height={300}
            src={props.dog.imageUrl}
            alt={props.dog.dogBreed}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <span className="m-auto text-center">{props.dog?.dogBreed}</span>
      <button className='mt-4 cursor-pointer bg-yellow-100' onClick={() => props.addToFavorites(props.dog)}>Add To Favorites</button>
    </div>
  )
}

export default DogMainCard