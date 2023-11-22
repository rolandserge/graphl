import React, { useState } from 'react'
import { GET_PROJECTS } from '../../graphlql/queries/projectQueries'
import { useMutation, useQuery } from '@apollo/client'
import { FaList } from 'react-icons/fa'
import { GET_CLIENTS } from '../../graphlql/queries/clientQueries'
import Spinner from '../spinner'
import { ADD_PROJECT } from '../../graphlql/mutations/projectMutation'

export default function AddProject() {
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('new')
    const [clientId, setClientId] = useState('')

    // Get clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS)

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        update(cache, { data: { addProject }}) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS })
            cache.writeQuery({
              query: GET_PROJECTS,
              data: { projects: [...projects, addProject]}
            })
          }
    })

    const onSubmit = async(e) => {
        e.preventDefault()
        // console.log(name, description, status, clientId)
        await addProject(name, description, status, clientId)
    }
    
    if(loading) return <Spinner />
    if(error) return <p>Something Went Wrong</p> 

  return (
    <>
    {
        !loading && !error && (
            <>
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    data-bs-toggle="modal" 
                    data-bs-target="#addProjectModal"
                >
                    <div className="d-flex align-items-center">
                        <FaList className='icon' />
                        <div>Add Project</div>
                    </div>
                </button>
                <div 
                    className="modal fade" 
                    id="addProjectModal" 
                    aria-labelledby="addProjectModalLabel" 
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 
                                    className="modal-title fs-5" 
                                    id="addProjectModalLabel"
                                >
                                    New Project
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
                                        <label className="form-label">Description</label>
                                        <textarea
                                            id='description'
                                            className="form-control"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        >
                                        </textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select 
                                            id='status'
                                            className="form-select"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            required
                                        >
                                            <option value="new">Not started</option>
                                            <option value="progress">In progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className='form-label'>Client</label>
                                        <select 
                                            id="clientId" 
                                            value={clientId} 
                                            className="form-select"
                                            onChange={(e) => setClientId(e.target.value)}
                                        >  
                                            <option value="">Select Client</option>
                                            { 
                                                data.clients.map((client, index) => (
                                                    <option value={client.id} key={index}>{ client.name }</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <button 
                                        className="btn btn-primary"
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
        </>  
    )
}
