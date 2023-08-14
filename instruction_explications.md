          ------------------------ Todo List App Full Stack ------------------------

- Technologies : 
frontend : HTML,  javascript , React, Typescript ,
backend : Firebase , 
dependencies : react-redux - redux-toolkit

- How to start project :
1 : install the dependencies with the "npm install" command
2 : change the folder address with "cd list-app"
3 : use the command "npm run dev "
4 : open local server link "http://localhost:(server number)/"


        ----------------------------- project structure  -------------------------------:

  list-app/src/main.tsx:
- In the main of the application we wrap the application with the redux-toolkit provider, to be able to manage the redux state, globally in the application

  list-app/src/app :
  
In the app folder consists of 2 files which are:
hooks : these hooks are customized we are already typing both the state and the dispatcher correctly when using typescript
store : instantiate the reducers , importing the reducer slices independently

  list-app/src/firebase : 
instantiate the database configuration, and export the constants to be able to call this


  list-app/src/app/todosSlices.ts : 

In this file we compose the reducer, which we previously typed in order to receive the correct state, and the payolad that it receives, so we can know and receive what we want correctly,
therefore it is composed of:
initial state: which receives the state of the tasks,
reducing functions : which are the functions that are executed to change the state and make it reactive , inside the slice folder we manage the asynchronous functions from which we interact with the data arrived from the state , and we push them both to the state , and we modify our database , this so that the user can notice the changes on the user 's side , and at the same time mutate the document from the database

function structure:

const function name = (received value) => async (dispatch : state function to call) : Promise<> (promise return type) =>





