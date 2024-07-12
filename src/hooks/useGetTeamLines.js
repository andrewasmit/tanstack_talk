import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

const proxy = "https://cors-anywhere-gzhu.onrender.com/"
const dailyFaceOffAPIBaseURL = "https://www.dailyfaceoff.com/_next/data/uIiikkd2u32fY37bbYsYO/teams/"
const dailyFaceOffAPITag ="/line-combinations.json"


export const fetchTeamData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status === 200) {
    return data.pageProps;
  } else throw new Error(data.message);
};


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
    // retry: 1,
  });
};
