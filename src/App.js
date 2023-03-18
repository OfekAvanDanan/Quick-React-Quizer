import React from "react"
import "./App.css"
//import { ReactSVG } from 'react-svg'
import Question from "./component/Question.js"
//import { nanoid } from 'nanoid'


export default function App() {

   const [questionsData, setQuestionsData] = React.useState([])
   const [questions, setQuestions] = React.useState([])
   const [quiz, setQuiz] = React.useState(Math.random())
   const[mode,setmode] = React.useState(0) // 0->start 1->play 2->view answers
  
    
    //get questions
   React.useEffect(function() {
        fetch(`https://the-trivia-api.com/api/questions/`)
            .then(res => res.json())
            .then(data => setQuestionsData(data))
    }, [quiz])



  //genarate answers
  React.useEffect(function(){
    //currect answers arr  
    let currectAnswers = []
    for (let i = 0 ; i < 10 ; i++){
      currectAnswers.push(Math.floor(Math.random()*4))
    }
    setQuestions(questionsData.map((question,index)=>{
    //generating answers
      
    const ans = []
    let ansCount = 0;
    for (let i = 0 ; i < 4 ; i++){
      if (i===currectAnswers[index]) ans.push(question.correctAnswer)
      else {
        ans.push(question.incorrectAnswers[ansCount])
        ansCount++
      }
      }
      return{
        question:question.question,
        currectAnswers:currectAnswers[index],
        selectedAnswer:-1,
        answers:[ans[0],ans[1],ans[2],ans[3]],
      }
    }))
  },[questionsData])

    function startQuiz (){
      setmode(1)
      setQuiz(Math.random())
    }

    function selectAnswer (e,q,a){
      console.log(q,a)
      setQuestions(oldquestions => (oldquestions.map((quesion,index)=>(
        index === q ? {
          ...quesion,
          selectedAnswer:a
        }:quesion
      ))
      ))
    }

    function printAllQuestions () {
      const allQuestions = questions.map((quesion,index)=>{
        return(
        <Question
        key = {index}
        id = {index}
        question = {quesion.question}
        answers = {quesion.answers}
        selected = {quesion.selectedAnswer}
        selectAnswer = {selectAnswer}
          />)
      })
      return(
        <div>
          {allQuestions}
        </div>
      )
    }
  
  return (
    <div className="main">
      {mode===0 ? //starting screen
      (<div className="openingText">
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={startQuiz}>Start Quiz!</button>
      </div>)
       ://question screen
       (<div className="questions">
       {printAllQuestions(questions)}
       {mode===1 ?
       <button id="center-btn">Check Answers</button> :
       <div>
       </div>
      }
       </div>)
       }
    </div>
  )
}


