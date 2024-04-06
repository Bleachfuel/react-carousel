import React from 'react'

function Controls({paginate}) {
    return (
        <>
            <button name="prev" className="prev" onClick={() => paginate(-1)}>Prev</button>
            <button name="next" className="next" onClick={() => paginate(1)}>Next</button>
        </>
    )
}

export default Controls
