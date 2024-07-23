// External Dependencies
// import { useEffect, useState } from 'react';

// Internal Dependencies
import { useGetTeamLines } from '../hooks/useGetTeamLines';

// Local Dependencies
import Linemates from './Linemates';
import '../App.css'


function LinesModal({ currentTeam, handleClose, teamData }) {
  // const [teamData, setTeamData] = useState();

  // const proxy = "https://cors-anywhere-gzhu.onrender.com/"
  // const dailyFaceOffAPIBaseURL = "https://www.dailyfaceoff.com/_next/data/W9FRt5PFIRBjmn5x2i5ae/teams/"
  // const dailyFaceOffAPITag ="/line-combinations.json"

  // const fetchTeamData = async (teamName) => {
  //   const url = proxy + dailyFaceOffAPIBaseURL + teamName + dailyFaceOffAPITag;

  //   const res = await fetch(url);
  //   const data = await res.json();

  //   if (res.status === 200) {
  //     return data;
  //   } else throw new Error(data.message);

  // };

  // useEffect(() => {   
  //   fetchTeamData(currentTeam)
  //   .then(res => {
  //     setTeamData(res.pageProps);
  //   });
  // }, [currentTeam]);


  // USING TAN STACK QUERY
  // const { data: teamData } = useGetTeamLines(currentTeam);
  // const { 
  //   data: teamData,
  //   error,
  //   // status,
  //   isFetching,
  // } = useGetTeamLines(currentTeam);

  console.log("TEAM DATA: ", teamData);

  // if(error){
  //   return (
  //     <h4>{ error }</h4>
  //   )
  // }

  // if(isFetching){
  //   return (
  //     <h3 className='loading-screen'>Loading...</h3>
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