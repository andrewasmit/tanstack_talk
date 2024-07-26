# Intro to Cache w/ TanStack Query

This project is a simple data fetching application that starts off as a bare-bones example for you to learn the basic implementations of TanStack query.

Below is a step-by-step process of how to transform the app's current state into a higher functioning app that utilization TanStack query for state management, cache, and data fetching.

This project was constructed with Vite and written in JavaScript.
It utilizes an external API from [Daily Faceoff](https://www.dailyfaceoff.com/); a go-to resource for fantasy hockey players to get the most accurate representation of who is on what line, what goalies are starting in today's games, and other news.

*This API requires a proxy in this project. I utilized [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) and deployed my proxy server on [Render](https://render.com/).*

## Getting Started
- Fork and clone this repo
- Open the repo in your favorite IDE
- Run `yarn` to install all necessary dependencies
- Run `yarn dev` to start up Vite. Your web page should automatically load
- As mentioned above, the API will need a proxy. Before going on, you may need to incorporate your own proxy server  

At this point, the app should be fully functional. However, it can be improved and optimized! Below we will go through the steps of relying less on react hooks like `useState` and `useEffect` and instead rely more on hooks built-in to TanStack Query or custom hooks we build ourselves.

## The Current State of the App
- Out of the box, this app utilizes a `fetch` in `App.jsx`
- It has a `useEffect` with no dependencies so that when the app loads, a rerender triggers said `fetch` and saves the returned data into a local `useState` variable. 
Not horrible, but not great... Let's make it better!

## Installing and Incorporating TanStack Query
The [Documentation](https://tanstack.com/query/latest/docs/framework/react/installation) for TanStack Query is fantastic. It provides get explanations, examples, and context

### Adding TanStack via CLI commands
- Run `yarn add @tanstack/react-query` to download TanStack Query
- Run `yarn add @tanstack/react-query-dev-tools` to download the TanStack Dev Tools
- Run `yarn add -D @tanstack/eslint-plugin-query` for an ESLint plugin (especially is you are using TypeScript, which for simplicity sake, this project does not)

*replace `yarn add` with `npm i` if you prefer npm over yarn*

### Providers
In main.jsx (the highest component), we need to provide our App with a few things
- a Query Client
- DevTools
- Wrap the entire App (and DevTools) in a Query Client Provider

*Follow comments in this page for more info*

At this point, the app is ready to actually start using TanStack Query instead of `useEffect` and `useState` methods of fetching and holding data.

## Adjusting Where/How Data is Being Fetched and Stored
In App.jsx, make the following adjustments...
- Comment out `useEffect` in the External Dependencies
- Comment out `Lines 17-42` where we establish state for `teamData`, build the url that we will use to fetch data, the function that actually fetches the data, and the `useEffect` that triggers each data fetch and sets `teamData` state accordingly. *All of the above will be the business logic of TanStack Query once fully integrated*
- Comment out `Line 66` in the props for the `LinesModal` component. *This data will be fetched in a different component instead of the data being passed down to the child*

In LinesModal.jsx, make the following adjustments...
- Uncomment for `useGetTeamLines` in External Dependencies
- In the props being deconstructed in this modal, comment out `teamData`, and remove the comment for `currentTeam`. *We no longer are receiving the `teamData` from the parent component and instead are getting the `currentTeam` ID which will be used to then fetch the data in this component instead*
- Uncomment `Lines 16-18` to destructure `data`, `isFetching`, and `isError` from our custom hook that utilizes TanStack Query (*more below*)
- Uncomment `Lines 20-30` to reveal different JSX returns that mount when `isFetching` or `isError` evaluates to `true`

## Abstracting TanStack Query into a Custom Hook
If you were to study the original fetching of data that were commented out in `App.jsx`, you will notice this structure
- **A function to fetch the data**. This is the `fetchTeamData` fn that builds a URL and does a simple `GET` request to it.
- **A trigger that fires off the fetch function**. This is the `useEffect`. Since the `currentTeam`(The ID of what team was clicked on) is in the dependency array, fetches are trigger each time a user clicks on a new team.
- **Something to hold the data that is fetched**. This takes the place of a simple `useState` for `teamData

### All of the above is made easier with TanStack Query!

Using the built-in hook `useQuery` from TanStack, which you can learn more about [HERE](https://tanstack.com/query/latest/docs/framework/react/guides/queries)

Essentially what we've done is taken all the commented code out from `App.jsx` and put it into the `useGetTeamLines.js` file to create our own custom hook. *It is important to note that the `useQuery` hook in itself can be used directly in the component. There are plenty of examples of this in the documentation.*

## How to Build Our Custom Hook
This file brings in the `useQuery` hook from TanStack. We will also utilize `useMemo` and `useCallback` from React to help with optimization/unncessary rerenders.

In `useGetTeamLines.js`, we have our URL skeleton structure, our function that sends a simple GET request to a URL passed in and our custom hook `useGetTeamLines` that takes the parameter of `teamName`; the ID we utilize to build our URL and fetch data about that team.

In the custom hook, we build our URL that the fetch request needs to go to. We take this one step further by wrapping this variable in a `useMemo` so this code is only run when a new `teamName` is passed in.

Next, we build our query function by passing in the URL we just built to the `fetchData` function. We again take this one step further by wrapping this in a `useCallback` so that this code is only run when a new URL is passed into it.

Lastly, we utilize this `queryFn` variable by **returning** `useQuery` with that `queryFn` passed in as well as a **key** that we create to help identify each query since this hook will be used to fetch and cache multiple sets of data
