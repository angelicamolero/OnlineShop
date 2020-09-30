import React from 'react'


const Error = ({location}) => {
    return (
        <h2 className="error">Oops! no match for <strong> {location.pathname}... </strong>Are you sure you it's not a typo?</h2>
    )
}

export default Error;
