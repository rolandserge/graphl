import React from 'react'
import Logo from "/Assets/graphql.png"

export default function Header() {
  return (
    <div className='navbar bg-light mb-4 p-0'>
        <div className="container">
            <a href="/" className='navbar-brand'>
                <div className="d-flex">
                    <img src={Logo} alt="Logo" width="10%" className='mr-2' />
                    <div>
                        ProjectMangemenet
                    </div>
                </div>
            </a>
        </div>
    </div>
  )
}
