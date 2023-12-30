import RickAndMortyCharacter from "./RickAndMortyCharacter";
import RickAndMortyCharacterRequestInfo from "./RickAndMortyCharacterRequestInfo";

class RickAndMortyCharacterResponse {
  info: RickAndMortyCharacterRequestInfo = new RickAndMortyCharacterRequestInfo();
  results: Array<RickAndMortyCharacter> = [];
}
export default RickAndMortyCharacterResponse;
