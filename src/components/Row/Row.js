import React, {useState, useEffect} from 'react';
import axios from '../../axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/";


function Row({title, fetchUrl, isLargeRow}){

    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(()=>{
        async function getData(){
            const request = await axios.get(fetchUrl) 
            setMovies(request.data.results)
            return request
        }
        getData() 
    }, [fetchUrl])

    console.table(movies)

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = (movie)=>{
        if(trailerUrl){
            setTrailerUrl('')
        }else{
            movieTrailer(movie?.name || "")
            .then(url=>{
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'))
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }

    return (
        <div className="row">
            <h2> {title}</h2>
            <div className="row_posters">
                {movies.map(movie=>{
                    if(isLargeRow){
                        if(!movie.poster_path){
                            return null;
                        }else{
                            return (<img 
                                onClick={()=>handleClick(movie)}
                                key={movie.id}
                                src={`${baseUrl}${isLargeRow? movie.poster_path: movie.backdrop_path}`} 
                                alt={movie.name} 
                                className={`row_poster ${isLargeRow && 'row_posterLarge'}`}></img>) 
                        }
                    }
                    else {
                        if(movie.backdrop_path){
                            return (<img 
                                onClick={()=>handleClick(movie)}
                                key={movie.id}
                                src={`${baseUrl}${isLargeRow? movie.poster_path: movie.backdrop_path}`} 
                                alt={movie.name} 
                                className={`row_poster ${isLargeRow && 'row_posterLarge'}`}></img>)
                        }else{
                            return null;
                        }
                    }
                })}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;