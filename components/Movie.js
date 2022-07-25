import React from 'react'

export default function Movie(props) {
    const FavComponent = props.FavComponent;
    return (
        <div className='image-container d-flex justify-content-start m-3'
            onClick={() => props.handleFavClick(props.movie)}>
            <img src={props.movie.Poster} alt={`${props.movie.Title} (${props.movie.Year})`} />
            <div
                className='overlay d-flex align-items-center justify-content-center'
            >
                <FavComponent />
            </div>
        </div>
    )
}
