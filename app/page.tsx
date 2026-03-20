"use client";
import DogCard from "@/components/dogCard";
import DogFavCard from "@/components/dogFavCard";
import DogMainCard from "@/components/dogMainCard";
import SearchBox from "@/components/searchBox";
import { Dog } from "@/types/dog";
import {
  CleanDogBreedName,
  GetDogImageIdentifier,
} from "@/utils/dogBreedClean";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [mainDog, setMainDog] = useState<Dog>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const placeHolder: Dog = {
    index: "",
    dogBreed: "",
    imageUrl: "",
  };

  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  const [randomDogs, setRandomDogs] = useState<Dog[]>([]);

  const filteredRandomDogs: Dog[] = useMemo(() => {
    if (searchTerm.length === 0) return randomDogs;

    return randomDogs.filter((dog: Dog) =>
      dog.dogBreed.toLowerCase().includes(searchTerm),
    );
  }, [randomDogs, searchTerm]);

  useEffect(() => {
    const fetchMainDog = async (): Promise<void> => {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data: { message: string } = await response.json();

      setMainDog({
        index: GetDogImageIdentifier(data.message),
        imageUrl: data.message,
        dogBreed: CleanDogBreedName(data.message),
      });
    };
    fetchMainDog();

    const fetchRandomDogs = async (): Promise<void> => {
      const response = await fetch(
        "https://dog.ceo/api/breeds/image/random/10",
      );
      const data: { message: string[] } = await response.json();

      setRandomDogs(
        data.message.map((dog: string) => ({
          index: GetDogImageIdentifier(dog),
          imageUrl: dog,
          dogBreed: CleanDogBreedName(dog),
        })),
      );
    };
    fetchRandomDogs();
  }, []);

  const handleSetAsMain = (dog: Dog) => {
    setMainDog(dog);
  };
  const handleAddToFavorites = (dog: Dog) => {
    const dogSet = new Set(favoriteDogs);
    dogSet.add(dog);
    setFavoriteDogs([...dogSet]);
  };
  const handleRemoveFromFavorites = (dogToRemove: Dog) => {
    const dogs = favoriteDogs.filter((dog) => dog.index != dogToRemove.index);
    setFavoriteDogs(dogs);
  };

  const handleSearch = (breed: string): void => {
    setSearchTerm(breed.trim().toLowerCase());
  };
  return (
    <div className="flex min-h-screen flex flex-col items-center">
      <h1 className="mt-4">Turnitin Test</h1>
      <div className="flex flex-row p-10">
        <main className="w-[70%]">
          {/* Search Box */}
          <SearchBox
            searchBreedTerm={searchTerm}
            onSearch={handleSearch}
            placeholder="Search breed..."
          />

          <section id="main-dog" className="flex flex-col items-center">
            <h2 className="my-4 text-center">Dog of the Month</h2>
            <DogMainCard
              dog={mainDog || placeHolder}
              addToFavorites={handleAddToFavorites}
            />
          </section>

          <section id="random-dogs" className="mt-10">
            <h2 className="my-4 text-center">Random Dogs</h2>
            <div className="flex flex-wrap gap-5 ">
              {filteredRandomDogs.map((dog) => (
                <DogCard
                  key={dog.index}
                  dog={dog}
                  setAsMain={handleSetAsMain}
                />
              ))}
            </div>
          </section>
        </main>

        <aside className="w-[30%] h-full">
          <h2 className="text-center">Favorites</h2>
          <div className="flex flex-wrap gap-2 mt-10">
            {favoriteDogs.map((favDog) => (
              <DogFavCard
                key={favDog.index}
                dog={favDog}
                setAsMain={handleSetAsMain}
                removeFromFavs={handleRemoveFromFavorites}
              ></DogFavCard>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
