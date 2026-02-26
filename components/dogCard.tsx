import Image from 'next/image';
import React from 'react'
import { Dog } from '@/types/dog';

type CardProps = {
  dog: Dog
  setAsMain: (dog: Dog) => void;
}

const DogCard = (props: CardProps) => {
  return (
    <button
      className={`flex flex-row w-[250px] h-[100px] shadow-sm rounded-lg cursor-pointer hover:scale-105 transition-all duration-300`}
      onClick={() => props.setAsMain(props.dog)}>
      <div id='image' className=' w-[100px] h-[100px]'>
        <Image
          width={100}
          height={100}
          src={props.dog.imageUrl}
          alt={props.dog.dogBreed}
          className="w-full h-full object-cover"
        />
      </div>
      <span className='m-auto'>{props.dog.dogBreed}</span>
    </button>
  )
}

export default DogCard