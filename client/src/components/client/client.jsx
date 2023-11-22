import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_CLIENTS } from '../../graphlql/queries/clientQueries'
import ClientRow from './clientRow'
import Spinner from '../spinner'


export default function Client() {

  const { loading, error, data } = useQuery(GET_CLIENTS)

  if(loading) return <Spinner />
  if(error) return <p>Something went wrong {error.message}</p>

  return (
    <>
      {
        !loading && !error && (
          <table className='table table-hover mt-3'>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {
                    data.clients.map((client, index) => (
                      <ClientRow client={client} key={index} />
                    ))
                  }
              </tbody>
          </table>
        )
      }
    </>
  )
}
