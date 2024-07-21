// External Dependencies
import { useState } from 'react'

// Internal Dependencies
import { useIsOpen } from './hooks/useIsOpen';

// Local Dependencies
import TeamLogos from './TeamLogos';
import LinesModal from './LinesModal';
import './App.css'

function App() {
  const [currentTeam, setCurrentTeam] = useState('');

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
        />
      }
    </>
  )
}

export default App
