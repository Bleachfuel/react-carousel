import React from 'react'

function Counter({counter, pageIndex, pageCount}) {
  return (
    <span className="carousel-counter">{`${counter[1] ? counter[1] : ""} ${pageIndex + 1} / ${pageCount}`}</span>
  )
}

export default Counter
