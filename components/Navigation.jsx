import React from 'react'

function Navigation({pageCount, goToPage, pageIndex}) {
  return (
    <div className="carousel-navigation">
    {Array.from({ length: pageCount }, (_, index) => (
        <button
            className="carousel-navigation-button"
            key={index}
            onClick={() => goToPage(index)}
            style={{
                backgroundColor: pageIndex === index ? 'rgba(173, 216, 230, 0.75)' : 'rgba(255, 255, 255, 0.75)',
                border: 'none',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                margin: '0 5px',
                cursor: 'pointer',
            }}

        >
        </button>
    ))}
</div>
  )
}

export default Navigation
