import React from 'react'
import Spinner from '../spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../../graphlql/queries/projectQueries'
import ProjectCard from './projectCard'


export default function Project() {

    const { loading, error, data } = useQuery(GET_PROJECTS)

    if(loading) return <Spinner />
    if(error) return <p>Something Went Wrong</p>

  return (
    <>
        { data.projects.length > 0 ? (
            <div className="row m-4">
                { data.projects.map((project, index) => (
                    <ProjectCard project={project} key={index} />
                ))}
            </div>
        ) : (<p>No projects</p>)}
    </>
  )
}
