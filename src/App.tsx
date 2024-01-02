import { useState } from 'react';
import './App.css';
import RickAndMortyAutocomplete from './components/RickAndMortyCharacterAutocomplete';
import RickAndMortyCharacter from './models/RickAndMortyCharacter';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';

function App() {
  // Secili karakterlerin tutuldugu state, baslangicta bos. 
  const [karakterler, setKarakterler] = useState<Array<RickAndMortyCharacter>>([]);
  return (
    <Grid container padding={2} spacing={2} height="100%">
      <Grid item xs={12}>
        {/* Component benzer sekilde farkli yerlerde kullanilabilir sekilde tasarlandi*/}
        <RickAndMortyAutocomplete
          label="Karakter Seçin"
          value={karakterler}
          onChange={(e)=>{
            setKarakterler(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} height="100%">
        {/* State'in dogru set edildigini gostermek icin state'i burada liste halinde yazdiriyorum */}
        Seçilen Karakterler:
        <ol>
          {karakterler?.map(k => <li key={k.id}>
            {k?.name}
          </li>)}
        </ol>
      </Grid>
      <Grid item xs={12} height="100%">
        <Link
          href="https://github.com/berdanakyurek/AdCreative-Case"
          target="_blank"
        >
          Kaynak Kod
        </Link> 
        
      </Grid>
    </Grid>
  );
}

export default App;
