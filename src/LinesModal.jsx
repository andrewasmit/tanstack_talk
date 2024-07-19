// External Dependencies
// import { useMemo } from 'react'

// Internal Dependencies
import { useGetTeamLines } from './hooks/useGetTeamLines';

// Local Dependencies
import Linemates from './Linemates';
import './App.css'


function LinesModal({ currentTeam, handleClose }) {

  // const { data: teamData } = useGetTeamLines(currentTeam);
  const { 
    data: teamData,
    error,
    // status,
    isFetching,
  } = useGetTeamLines(currentTeam);

  if(error){
    return (
      <h4>{ error }</h4>
    )
  }

  if(isFetching){
    return (
      <h3 className='loading-screen'>Loading...</h3>
    )
  }

  if(teamData){
    return (
      <div className='modal-container'>
        <Linemates data={teamData} handleClose={handleClose} />
      </div>
    )
  }
}

export default LinesModal