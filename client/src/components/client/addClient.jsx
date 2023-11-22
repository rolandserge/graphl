import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { FaUser } from "react-icons/fa"
import { ADD_CLIENT } from '../../graphlql/mutations/clientMutations'
import { GET_CLIENTS } from '../../graphlql/queries/clientQueries'


export default function AddClient() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient }}) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS })
            cache.writeQuery({
              query: GET_CLIENTS,
              data: { clients: [...clients, addClient]}
            })
          }
    })

    const onSubmit = (e) => {
        e.preventDefault()
        
        addClient(name, email, phone)
    }

  return (
    <>
        <button 
            type="button" 
            className="btn btn-secondary" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal"
        >
            <div className="d-flex align-items-center">
                <FaUser className='icon' />
                <div>Add Client</div>
            </div>
        </button>
        <div 
            className="modal fade" 
            id="exampleModal" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 
                            className="modal-title fs-5" 
                            id="exampleModalLabel"
                        >
                            Add Client
                        </h1>
                        <button 
                            type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"
                        >

                        </button>
                    </div>
                    <div className="modal-body">
                        <form action="" onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    id='name'
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                 />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">E-mail</label>
                                <input 
                                    type="email"
                                    id='email'
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                 />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input 
                                    type="text" 
                                    id='phone'
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                 />
                            </div>
                            <button 
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                type='submit'
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
