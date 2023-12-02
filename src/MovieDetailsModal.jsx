// MovieDetailsModal.jsx
import React from 'react';

const MovieDetailsModal = ({ movie, closeModal, isModalOpen }) => {
    if (!movie) return null;
    const modalClass = `modal fade ${isModalOpen ? 'show' : ''}`;
    const displayStyle = isModalOpen ? { display: 'block' } : {};
  // Bootstrap's modal structure
    return (
        <div className={modalClass} id="staticBackdrop" 
                data-bs-backdrop="static" data-bs-keyboard="false" 
                tabIndex="-1" aria-labelledby="staticBackdropLabel" 
                aria-modal="true" role="dialog" style={displayStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{movie.Title} ({movie.Year})</h5>
                    </div>
                    <div className="modal-body">
                        <div className="modal-poster">
                            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={`${movie.Title} Poster`} />
                        </div>
                        <div className="modal-details">
                            <p><strong>Director:</strong> {movie.Director}</p>
                            <p><strong>Actors:</strong> {movie.Actors}</p>
                            <p><strong>Genre:</strong> {movie.Genre}</p>
                            <p><strong>Plot:</strong> {movie.Plot}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsModal;
