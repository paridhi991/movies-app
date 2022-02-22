import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
export const API_KEY='579c2260';
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const Container=styled.div`
  display:flex;
  flex-direction:column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const YearBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 40px;
  width: 50%;
  background-color: white;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const YearInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 35px;
`;
const Placeholder = styled.div`
  display:flex;
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
  align:center;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const[yearQuery,updateYearQuery]=useState("");
  


  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();
  

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  

  return (
    <Container>
    <Header><AppName>🎞️MOVIE TIME</AppName>
    <SearchBox>
    🔍<SearchInput placeholder="Search Movie" 
    value={searchQuery}
    onChange={onTextChange}


    />
    </SearchBox>
    <YearBox>
    🌪️<YearInput placeholder="Filter by year"
    value={yearQuery}
    onChange={onTextChange}
    />

      
    </YearBox>
    </Header>
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (

          <Placeholder>🎞️🎞️🎞️🎞️<strong>happy watching!</strong>🎞️🎞️🎞️🎞️</Placeholder> 
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
