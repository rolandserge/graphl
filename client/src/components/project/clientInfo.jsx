import React from 'react'
import { FaEnvelope, FaIdBadge, FaPhone } from 'react-icons/fa'

export default function ClientInfo({ client }) {
  return (
    <>
        <h5 className="mt-5">Client Information</h5>
        <ul className="list-group">
            <li className="list-group-item">
                <FaIdBadge className='icone' /> { client?.name }
            </li>
            <li className="list-group-item">
                <FaEnvelope className='icone' /> { client?.email }
            </li>
            <li className="list-group-item">
                <FaPhone className='icone' /> { client?.phone }
            </li>
        </ul>
    </>
  )
}
