import React from 'react'
import MembersTable from '../ProjectOverview/MembersTable'
import { Button } from '@mui/material'
import AddMembers from './AddMembers'

function MembersOverview({project, members,  onMembersEdited }) {
  return (
    <div className='p-6 bg-[#F9FBFD] min-h-screen w-full overflow-y-auto'>
      <h1 className='text-3xl font-bold mb-1'>
       {project.name} : Members Overview
      </h1> 
      <p className="text-md text-gray-600 mb-6">
        {project.description || "No description available for this project."}
      </p>
      <div className='flex justify-end mb-4'>
        <AddMembers project={project}  onMembersEdited={onMembersEdited}/>
      </div>
        <MembersTable members={members} project={project} onMembersEdited={onMembersEdited} isMembersPage={true} />
    </div>
  )
}

export default MembersOverview