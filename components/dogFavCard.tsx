import Image from 'next/image';
import React from 'react'
import { Dog } from '@/types/dog';

type CardProps = {
    dog: Dog
    setAsMain: (dog: Dog) => void;
    removeFromFavs: (dog: Dog) => void;
}

const DogFavCard = (props: CardProps) => {
    return (
        <div>
            <button
                className={`flex flex-row w-[100px] h-[80px] shadow-sm rounded-lg cursor-pointer`}
                onClick={() => props.setAsMain(props.dog)}>
                <div id='image' className=' w-[100px] h-[80px]'>
                    <Image
                        width={100}
                        height={100}
                        src={props.dog.imageUrl}
                        alt={props.dog.dogBreed}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* <span className='m-auto'>{props.dogBreed}</span> */}
            </button>
            <button
                onClick={() => props.removeFromFavs(props.dog)}
                className='w-[100px] h-[20px] bg-red-400 bold text-white font-bold cursor pointer'>Remove</button>
        </div>
    )
}

export default DogFavCard