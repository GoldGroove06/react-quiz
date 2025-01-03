import { useEffect, useReducer } from "react";
import Header from "./components/Header"
import Main from "./components/Main";
import Loader from "./components/Loader"
import Error from "./components/Error"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress"
import FinishScreen  from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

const initialState = {
  questions:[],
  //loading, error, ready, active, finished
  status: "loading",
  index:0,
  answer:null,
  points: 0,
  highscore: 0,
  secondsRemaining:null,
}

const SECS_PER_QUESTION = 30

function reducer(state, action) {
  switch(action.type){
    case "dataReceived":
      return {...state, questions: action.payload, status: "ready",}
    
    case "dataFailed":
      return {...state, status: "error"}

    case "start" :
      return {...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION}

    case "newAnswer":
      const question = state.questions.at(state.index)
      return {...state, answer:action.payload,
        points:
          action.payload === question.correctOption ? state.points + question.points : state.points,
      }
    case "nextQuestion":
      return {...state, index:state.index + 1, answer:null}
    
    case "finish":
      return {...state, status: "finished", highscore : state.points > state.highscore ? state.points : state.highscore }

    case "restart":
      return {...initialState, questions:state.questions, status:"ready"}
    
    case "tick":
      return {...state, secondsRemaining : state.secondsRemaining - 1,
        status : state.secondsRemaining === 0 ? "finished" : state.status
      }

    default:
      throw new Error("action unkonwn")
  }
}
 

function App() {
  const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    async function fetchData() {
      const res = await fetch("https://react-quiz-one-ashy.vercel.app/api/questions")
      const data = await res.json()
      
      dispatch({type: "dataReceived", payload: JSON.parse(data)})
       
    }
    fetchData()
   
   }, [])
   
   let numQuestions = 0;
  let maxPossiblePoints = 0;

  if (status === "ready") {
    numQuestions = questions.length;
    
  }
  return (
    <div className="App">
        <Header/>
        <Main>
          {status === "loading" && <Loader/>}
          {status === "error" && <Error/>}
          {status === "ready" && <StartScreen numQuestions ={numQuestions} dispatch = {dispatch}/>}
          {status === "active" && (
            <>
            <Progress numQuestion={numQuestions} index={index} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
           <Question question={questions[index]} dispatch = {dispatch} answer={answer}/>
           <Footer>

           <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
           <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}></NextButton> 

           </Footer>
           </>
          )}
          {status === "finished" && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch}/>}
          
        </Main>
    </div>
  );
}

export default App;
