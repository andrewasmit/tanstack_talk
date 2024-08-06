// Internal Dependencies
// import { useGetTeamLines } from '../hooks/useGetTeamLines';

// Local Dependencies
import Linemates from './Linemates';
import '../App.css'


function LinesModal({ 
  // currentTeam, // ID of Team Clicked on
  handleClose, 
  teamData //Old version of data fetched in App.js
}) {

  // UTILIZING TAN STACK QUERY
  // const { data: teamData } = useGetTeamLines(currentTeam); // Utilize more other available built-in hooks isFetching, isError, etc.

  // console.log("TEAM DATA (in Modal): ", teamData);

  // if(isFetching){
  //   return (
  //     <h3 className='loading-screen'>Loading...</h3>
  //   )
  // }

  // if(isError){
  //   return (
  //     <h4 className='loading-screen'>Try again later</h4>
  //   )
  // }

  if(teamData){
    return (
      <div className='modal-container'>
        <Linemates data={teamData} handleClose={handleClose} />
      </div>
    )
  }
}

export default LinesModal