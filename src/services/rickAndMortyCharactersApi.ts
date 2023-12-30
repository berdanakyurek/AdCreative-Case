import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import RickAndMortyCharacterResponse from '../models/RickAndMortyCharacterResponse';

export class KarakterAramaSorgu {
  aramaMetni: string = "";
  sayfa: number = 1;
}

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: builder => ({
    stringdenKarakterleriGetir: builder.query<RickAndMortyCharacterResponse, KarakterAramaSorgu>({
      query: (req) => {
        let query = "character";
        if(req.aramaMetni)
          query += `?name=${req.aramaMetni.toLowerCase()}`;
        if(req.sayfa > 1){
          if(req.aramaMetni)
            query += "&";
          else
            query += "?";
          query += `page=${req.sayfa}`
        }
        return query;
      }
    }),
  }),
})
export const { useStringdenKarakterleriGetirQuery } = rickAndMortyApi;
