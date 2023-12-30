import RickAndMortyLocation from "./RickAndMortyLocation";

// Bir karakteri simgeleyen sınıftır. Tanımı api documentation kullanılarak yapılmıştır.
// https://rickandmortyapi.com/documentation/#character-schema
class RickAndMortyCharacter {
  id: number = 0;
  name: string = "";
  status?: string = "";
  species?: string = "";
  type?: string = "";
  gender?: string = "";
  origin?: RickAndMortyLocation;
  location?: RickAndMortyLocation;
  image?: string = "";
  episode?: Array<string> = [];
  url?: string = "";
  created?: string = "";
}
export default RickAndMortyCharacter;
