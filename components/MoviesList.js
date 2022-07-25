import React from 'react'
import Movie from './Movie'

export default function MoviesList(props) {
    return (
        <>
            {props.movies.map((movie, index) => (
				<div className="idk" id={movie.imdbID} key={movie.imdbID} >
					<Movie key={movie.imdbID} movie={movie} FavComponent={props.FavComponent} handleFavClick={props.handleFavClick}/>
				</div>
			))}
        </>
    )
}
