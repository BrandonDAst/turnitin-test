export const CleanDogBreedName = (imageUrl: string) => {
    const strings = imageUrl.split("/");
    const breedName = strings[4];
    const finalName = breedName.replace("-", " ").toLocaleUpperCase();

    return finalName;
}
export const GetDogImageIdentifier = (imageUrl: string): string => {
    const strings = imageUrl.split("/");
    const identifier = strings[5];
    return identifier;
}