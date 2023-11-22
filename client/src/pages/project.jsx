import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../graphlql/queries/projectQueries'
import ClientInfo from '../components/project/clientInfo'
import DeleteProject from '../components/project/deleteProject'
import EditProject from '../components/project/editProject'

export default function Project() {

    const { id } = useParams()

    const {  loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id }
    })

    if(loading) return <Spinner />
    if(error) return <p>Something Went Wrong</p>

  return (
    <>
        { !loading && !error && (
                <div className="mx-auto w-75 card p-5">
                    <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
                        Back
                    </Link>
                    <h1>{ data.project.name }</h1>
                    <p>{ data.project.description }</p>
                    <h5 className="mt-3">Project status</h5>
                    <p className="lead">{ data.project.status }</p>

                    <ClientInfo client={data.project.client} />

                    <EditProject project={data.project} />

                    <DeleteProject projectId={data.project.id} />
                </div>
            )
        }
    </>
  )
}
