// External Dependencies
// import { useMemo } from 'react'

// Internal Dependencies

// Local Dependencies
// import { useIsOpen } from './hooks/useIsOpen';
import './App.css'
import { useMemo } from 'react';
import { getGridClass } from './hooks/gridClassHelper';

function Linemates({ data, handleClose }) {

  const linesToDisplay = useMemo(() =>{
    if(data){
      return data.combinations.players.map((player, idx) =>{
        const gridClass = getGridClass(idx);

        return <div 
                className={`${gridClass} player-wrapper`}
                key={`${player.playerId}-${idx}`}
                id={player.playerId}
              >
              
          {player.name}
        </div>
      })
    }

    return null
  }, [data]);

  return (
    <div className="lines-container">
      <button className="close-modal" onClick={handleClose}>X</button>
      {linesToDisplay}
    </div>
  )
}

export default Linemates