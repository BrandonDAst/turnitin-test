"use client"
import DogCard from "@/components/dogCard";
import DogFavCard from "@/components/dogFavCard";
import DogMainCard from "@/components/dogMainCard";
import { Dog } from "@/types/dog";
import { CleanDogBreedName, GetDogImageIdentifier } from "@/utils/dogBreedClean";
import { useEffect, useState } from "react";

export default function Home() {

  const [mainDog, setMainDog] = useState<Dog>();
  const placeHolder: Dog = {
    index: "",
    dogBreed: "",
    imageUrl: "",
  }

  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  const [randomDogs, setRandomDogs] = useState<Dog[]>([]);


  useEffect(() => {
    // Fetch main Dog
    const fetchMainDog = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();

      console.log("Message:", data.message);
      console.log("Breed: ", CleanDogBreedName(data.message))
      console.log("Identifier: ", GetDogImageIdentifier(data.message))

      setMainDog(
        {
          index: GetDogImageIdentifier(data.message),
          imageUrl: data.message,
          dogBreed: CleanDogBreedName(data.message)
        });
    }
    fetchMainDog();



    // Fetch Random Dogs
    const fetchRandomDogs = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
      const data = await response.json();

      setRandomDogs(data.message.map((dog: string) => ({
        index: GetDogImageIdentifier(dog),
        imageUrl: dog,
        dogBreed: CleanDogBreedName(dog)
      })));
    }
    fetchRandomDogs();
  }, [])



  const handleSetAsMain = (dog: Dog) => {
    setMainDog(dog);
  }
  const handleAddToFavorites = (dog: Dog) => {
    const dogSet = new Set(favoriteDogs)
    dogSet.add(dog);
    setFavoriteDogs([...dogSet]);

  }
  const handleRemoveFromFavorites = (dogToRemove: Dog) => {
    const dogs = favoriteDogs.filter((dog) => dog.index != dogToRemove.index);
    setFavoriteDogs(dogs);
  }

  return (
    <div className="flex min-h-screen flex flex-col items-center">
      <h1 className="mt-4">Turnitin Test</h1>
      <div className="flex flex-row p-10">
        <main className="w-[70%]">



          <section id="main-dog" className="flex flex-col items-center">
            <h2 className="my-4 text-center">Dog of the Month</h2>
            <DogMainCard dog={mainDog || placeHolder} addToFavorites={handleAddToFavorites} />
          </section>




          <section id="random-dogs" className="mt-10" >
            <h2 className="my-4 text-center">Random Dogs</h2>
            <div className="flex flex-wrap gap-5 ">
              {
                randomDogs.map((dog) =>
                  <DogCard
                    key={dog.index}
                    dog={dog}
                    setAsMain={handleSetAsMain}
                  />)
              }
            </div>
          </section>
        </main>






        <aside className="w-[30%] h-full">
          <h2 className="text-center">Favorites</h2>
          <div className="flex flex-wrap gap-2 mt-10">
            {
              favoriteDogs.map((favDog) =>
                <DogFavCard key={favDog.index}
                  dog={favDog}
                  setAsMain={handleSetAsMain}
                  removeFromFavs={handleRemoveFromFavorites}
                ></DogFavCard>)
            }
          </div>
        </aside>
      </div>
    </div>
  );
}
