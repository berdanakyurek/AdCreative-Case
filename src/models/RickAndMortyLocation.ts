// Bir konumu simgeleyen sınıftır. Tanımı api documentation kullanılarak yapılmıştır.
// https://rickandmortyapi.com/documentation/#location-schema
class RickAndMortyLocation {
  id: number = 0;
  name?: string = "";
  type?: string = "";
  dimension?: string = "";
  residents?: string = "";
  url?: string = "";
  created?: string = "";
}
export default RickAndMortyLocation;
