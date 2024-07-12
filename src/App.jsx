// External Dependencies
import { useState, useEffect } from 'react'
// import { useGetTeamLines } from './hooks/useGetTeamLines'

// Internal Dependencies

function App() {
  const [teamData, setTeamData] = useState({});

  const proxy = "https://cors-anywhere-gzhu.onrender.com/"
  const dailyFaceOffAPIBaseURL = "https://www.dailyfaceoff.com/_next/data/uIiikkd2u32fY37bbYsYO/teams/"
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
    fetchTeamData('dallas-stars')
    .then(res => {
      setTeamData(res.pageProps);
    });
  }, []);

  console.log("TEAM DATA: ", teamData);

  return (
    <>
      Hello, World
    </>
  )
}

export default App
