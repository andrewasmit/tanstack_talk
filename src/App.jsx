// External Dependencies
import { useState, useEffect } from 'react'

// Internal Dependencies
import { useIsOpen } from './hooks/useIsOpen';

// Local Dependencies
import TeamLogos from './TeamLogos';
import LinesModal from './LinesModal';
import './App.css'

function App() {
  const [currentTeam, setCurrentTeam] = useState('');
  const [teamData, setTeamData] = useState();

  const proxy = "https://cors-anywhere-gzhu.onrender.com/"
  const dailyFaceOffAPIBaseURL = "https://www.dailyfaceoff.com/_next/data/W9FRt5PFIRBjmn5x2i5ae/teams/"
  const dailyFaceOffAPITag ="/line-combinations.json"

  const fetchTeamData = async (teamName) => {
    const url = proxy + dailyFaceOffAPIBaseURL + teamName + dailyFaceOffAPITag;

    const res = await fetch(url);
    const data = await res.json();

    if (res.status === 200) {
      return data;
    } else throw new Error(data.message);

  };

  useEffect(() => {   
    fetchTeamData(currentTeam)
    .then(res => {
      setTeamData(res.pageProps);
    });
  }, [currentTeam]);

  const { 
    handleOpen: openPopup, 
    handleClose: closePopup,
    isOpen: isPopupOpen
  } = useIsOpen();

  return (
    <>
      <div className="heading">
        <h1>NHL Teams</h1>
        <h3>Click to see lines of each team</h3>
      </div>

      <TeamLogos 
        handleOpen={openPopup}
        setCurrentTeam={setCurrentTeam}
      />

      { isPopupOpen &&
        <LinesModal 
          currentTeam={currentTeam}
          handleClose={closePopup}
          teamData={teamData}
        />
      }
    </>
  )
}

export default App
