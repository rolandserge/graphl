import React from 'react'
import Client from '../components/client/client'
import Project from "../components/project/project"
import AddClient from '../components/client/addClient'
import AddProject from '../components/project/addProject'

export default function Home() {
  return (
    <>
        <div className="d-flex gap-3 mb-4">
          <AddClient />
          <AddProject />
        </div>
        <Project />
        <hr />
        <Client />
    </>
  )
}
