// External Dependencies
import { 
  useMemo,
  useState, 
  useCallback,
  // useEffect 
} from 'react'

// Internal Dependencies
import { useGetTeamLines } from './hooks/useGetTeamLines';

// Local Dependencies
import { allTeams } from './allTeams';
import './App.css'

function App() {
  // const [teamData, setTeamData] = useState({});
  const [currentTeam, setCurrentTeam] = useState('');

  // const proxy = "https://cors-anywhere-gzhu.onrender.com/"
  // const dailyFaceOffAPIBaseURL = "https://www.dailyfaceoff.com/_next/data/uIiikkd2u32fY37bbYsYO/teams/"
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
  //   fetchTeamData('dallas-stars')
  //   .then(res => {
  //     setTeamData(res.pageProps);
  //   });
  // }, []);


  // USING TAN STACK QUERY
  const { data: teamData } = useGetTeamLines(currentTeam);
  
  // const { 
    //   data: teamData,
    //   error,
    //   status,
    //   isFetching,
    // } = useGetTeamLines('dallas-stars');
    
    console.log("TEAM DATA: ", teamData);

    const handleClickTeam = useCallback((id) => {
      return setCurrentTeam(id)
    }, []);


    const teamsToDisplay = useMemo(() => {
      return allTeams.map( team => {
        return <div 
                id={team.id} 
                className='team-logo'
                key={team.id}
                onClick={() => handleClickTeam(team.id)}
              >
          <img src={`https://www.dailyfaceoff.com${team.src}`} width={100}/>
        </div>
      })
    }, [handleClickTeam])

  return (
    <>
      <div className="heading">
        <h1>Hockey Teams</h1>
        <h3>Click to See Team`s Player Info</h3>
      </div>

      <div id="team-logo-container">
        {teamsToDisplay}
      </div>
    </>
  )
}

export default App
