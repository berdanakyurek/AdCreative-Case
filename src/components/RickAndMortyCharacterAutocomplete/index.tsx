import { Autocomplete, BaseTextFieldProps, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import RickAndMortyCharacter from "../../models/RickAndMortyCharacter";
import { KarakterAramaSorgu, useStringdenKarakterleriGetirQuery } from "../../services/rickAndMortyCharactersApi";
import { useEffect, useRef, useState } from "react";
import Highlight from "../Highlight";

type RickAndMortyOnChangeEvent = ({ target: { value: Array<RickAndMortyCharacter>, name?: string } });
export interface IRickAndMortyAutocompleteProps extends BaseTextFieldProps{
  value: Array<RickAndMortyCharacter>;
  onChange: (e: RickAndMortyOnChangeEvent) => void;
}

const RickAndMortyAutocomplete = (props: IRickAndMortyAutocompleteProps):JSX.Element => {
  const [karakterAramaSorgu, setKarakterAramaSorgu] = useState<KarakterAramaSorgu>(new KarakterAramaSorgu());
  const [oncekiSayfalar, setOncekiSayfalar] = useState<Array<RickAndMortyCharacter>>([]);

  const query = useStringdenKarakterleriGetirQuery(karakterAramaSorgu);
  
  return (
    <Autocomplete
      
      loading={query.isLoading || query.isFetching}
      ListboxProps={{
        // Scroll en alta ulastiysa sonraki sayfayi api'den getirip sona ekle 
        onScroll: (e)=>{
          const target = e.target as HTMLDivElement;
          const { scrollTop, scrollHeight, clientHeight } = target;
          
          const isScrollAtBottom = scrollTop + clientHeight === scrollHeight;

          if (isScrollAtBottom) {
            console.log('Reached end of scroll');
            if(!query.isFetching && !query.isLoading && query?.data?.info.next){
              setOncekiSayfalar(oncekiSayfalar.concat(query?.data?.results || []));
              setKarakterAramaSorgu({
                ...karakterAramaSorgu,
                sayfa: karakterAramaSorgu.sayfa + 1
              })
            }
          }
        }
      }}
      onBlur={()=>{
        // Blur halinde sifirla 
        setKarakterAramaSorgu({
          aramaMetni: "",
          sayfa: 1
        });
        setOncekiSayfalar([]);
      }}
      disableCloseOnSelect
      multiple
      limitTags={5}
      options={(query.isError ? [] : oncekiSayfalar.concat(query?.data?.results || [])) as Array<RickAndMortyCharacter>}
      value={props.value}
      onChange={(e, v: Array<RickAndMortyCharacter>) => {
        props.onChange({ target: { value: v, name: props.name } });
      }}
      filterOptions={option => option}
      getOptionLabel={(option) => {
        if (!option?.name)
          return '';
        return option.name;
      }}
      isOptionEqualToValue={(o, s) => o?.name == s?.name}
      
      renderOption={(props, option) => {
        if (!option?.name) return '';
        return (
          <li
            {...props}
            key={option.id}
          >
            <Stack direction="row" padding={1} spacing={1}>
              <img
                src={option.image}
                height="100px"
              />
              <Stack direction="column">
                <Highlight fullString={option.name} matchString={karakterAramaSorgu.aramaMetni} />
                <Typography>{`${option?.episode?.length || 0} Episodes`}</Typography>
              </Stack>
            </Stack>
          </li>
          
        );
      }}
      
      renderInput={(params) => (
        <TextField
          {...params}
          {...props as BaseTextFieldProps}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                {
                  (query.isFetching || query.isLoading) &&
                  <CircularProgress
                    color="inherit"
                    size={20}
                  />
                }
                {params.InputProps.startAdornment}
              </>
            )
          }}
          onChange={(e)=>{
            setKarakterAramaSorgu({
              aramaMetni: e?.target?.value,
              sayfa: 1
            });
            setOncekiSayfalar([]);
          }}          
        />
      )}
    />
  );
}
export default RickAndMortyAutocomplete;
