// External Dependencies
import { useMemo } from 'react'

// Local Dependencies
import { allTeams } from '../assets/allTeams';
import '../App.css'


function TeamLogos({ handleOpen, setCurrentTeam }) {

  const teamsToDisplay = useMemo(() => {
    return allTeams.map( team => {
      return <div 
              id={team.id} 
              className='team-logo'
              key={team.id}
              onClick={() => {
                setCurrentTeam(team.id);
                handleOpen();
              }}
            >
        <img src={`https://www.dailyfaceoff.com${team.src}`} width={100}/>
      </div>
    })
  }, [handleOpen, setCurrentTeam])


  return (
    <div id="team-logo-container">
      {teamsToDisplay}
    </div>
  )
}

export default TeamLogos