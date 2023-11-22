import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { UPDATE_PROJECT } from '../../graphlql/mutations/projectMutation'
import { GET_PROJECT } from '../../graphlql/queries/projectQueries'

export default function EditProject({project}) {

    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState('')

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status},
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id }}]
    })

    const onSubmit = async(e) => {
        e.preventDefault()
        await updateProject(name, description, status)
    }
    
  return (
    <div className='mt-5'>
        <h3>Update project details</h3>
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

            <button 
                type='submit'
                className="btn btn-primary"
            >
                Submit
            </button>
        </form>
    </div>
  )
}
