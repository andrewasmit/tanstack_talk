// External Dependencies
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

// Local Variables
const proxy = "https://cors-anywhere-gzhu.onrender.com/"
const dailyFaceOffAPIBaseURL = "https://www.dailyfaceoff.com/_next/data/Y6RrRloCdVTq6Of00z_lD/teams/" // If ever any 404 errors, it is most likely the string between /data/ and /teams/ that needs to be updated
const dailyFaceOffAPITag ="/line-combinations.json"


// This is the function I use to execute a simple GET request from a URL that is passed in
const fetchTeamData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status === 200) {
    return data.pageProps; // the .pageProps is a specificity to this particular API. You would normally just return 'data'
  } else throw new Error(data.message);
};


// Custom hook to take in the string of a Team Name, build the url we need to make the GET request to, and then utilize TanStack query accordingly
export const useGetTeamLines = (teamName) => {
  const url = useMemo(() => {
    return proxy + dailyFaceOffAPIBaseURL + teamName + dailyFaceOffAPITag;
  }, [teamName]);

  const queryFn = useCallback(() => {
    return fetchTeamData(url);
  }, [url]);

  return useQuery({
    queryKey: [`${teamName}-lines`],
    queryFn,
    // retry: 2,
  });
};
