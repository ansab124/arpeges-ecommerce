import React from 'react'

const Input = ({ placeholder, value, onChange, rows }) => {
    return (
        rows ?
            <textarea
                className='input'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
            />
            : <input
                className='input'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
    )
}

export default Input