import React from 'react'
import MembersTable from '../ProjectOverview/MembersTable'

function MembersOverview({ members }) {
  return (
    <div className='p-6 bg-[#F9FBFD] min-h-screen w-full overflow-y-auto'>
        <MembersTable members={members} />
    </div>
  )
}

export default MembersOverview