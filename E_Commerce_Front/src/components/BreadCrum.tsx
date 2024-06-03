import React from 'react'

const BreadCrum = ({ title }: { title: string }) => {
    return (
        <div className='breadcrum commonSection'>
            <div className="container">
                <h1 className='heading'>{title}</h1>
                <p className='subHeading'>Home / {title}</p>
            </div>
        </div>
    )
}

export default BreadCrum
