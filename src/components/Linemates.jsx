// Local Dependencies
import '../App.css'
import { useMemo } from 'react';
import { getGridClass } from '../hooks/gridClassHelper';

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


  linesToDisplay.splice(0,0,<div className="grid-full grid-header" key="forwards">Forwards</div>);
  linesToDisplay.splice(1,0,<div className="grid-third grid-subheader" key="lw">LW</div>);
  linesToDisplay.splice(2,0,<div className="grid-third grid-subheader" key="c">C</div>);
  linesToDisplay.splice(3,0,<div className="grid-third grid-subheader" key="rw">RW</div>);
  linesToDisplay.splice(16,0,<div className="grid-full grid-header" key="d">Defensive Pairs</div>);
  linesToDisplay.splice(17,0,<div className="grid-half grid-subheader" key="ld">LD</div>);
  linesToDisplay.splice(18,0,<div className="grid-half grid-subheader" key="rd">RD</div>);
  linesToDisplay.splice(25,0,<div className="grid-full grid-header" key="goalies">Goalies</div>);
  linesToDisplay.splice(26,0,<div className="grid-half grid-subheader" key="starting">Starting</div>);
  linesToDisplay.splice(27,0,<div className="grid-half grid-subheader" key="backup">Backup</div>);
  linesToDisplay.splice(30,0,<div className="grid-full grid-header" key="pp1">Power Play 1</div>);
  linesToDisplay.splice(36,0,<div className="grid-full grid-header" key="pp2">Power Play 2</div>);
  linesToDisplay.splice(42,0,<div className="grid-full grid-header" key="pk1">Penalty Kill 1</div>);
  linesToDisplay.splice(47,0,<div className="grid-full grid-header" key="pk2">Penalty Kill 2</div>);

  if (linesToDisplay.length > 52){
    linesToDisplay.splice(52,0,<div className="grid-full grid-header" key="ir">Injured Reserve</div>);
  }

  return (
    <div className="lines-container">
      <button className="close-modal" onClick={handleClose}>X</button>
      {linesToDisplay}
    </div>
  )
}

export default Linemates