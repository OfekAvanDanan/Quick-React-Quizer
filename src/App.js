import React from "react"
import "./App.css"
//import { ReactSVG } from 'react-svg'
import Question from "./component/Question.js"
//import { nanoid } from 'nanoid'


export default function App() {

   const [questionsData, setQuestionsData] = React.useState([])
   const [questions, setQuestions] = React.useState([])
   const [quiz, setQuiz] = React.useState(Math.random())
   const[mode,setMode] = React.useState(0) // 0->start 1->play 2->view answers
   const[score,setScore] = React.useState(0)
  
    
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
        currectAnswer:currectAnswers[index],
        selectedAnswer:-1,
        answers:[ans[0],ans[1],ans[2],ans[3]],
      }
    }))
  },[questionsData])


    function selectAnswer (e,q,a){
     if (mode ===1) {
      //console.log(q,a)
      setQuestions(oldquestions => (oldquestions.map((quesion,index)=>(
        index === q ? {
          ...quesion,
          selectedAnswer:a
        }:quesion
      ))
      ))}
    }

    function printAllQuestions () {
      const allQuestions = questions.map((quesion,index)=>{
        
        return(
        <Question
        key = {index}
        id = {index}
        question = {quesion.question}
        answers = {quesion.answers}
        currectAnswer = {quesion.currectAnswer}
        selected = {quesion.selectedAnswer}
        selectAnswer = {selectAnswer}
        mode = {mode}
          />)
      })
      return(
        <div>
          {allQuestions}
        </div>
      )
    }
  
    function startQuiz() {
      setMode(1)
    }
    function checkQuiz(){
      setMode(2)
      setScore(()=>{
        let counter = 0
        for(let i = 0 ; i < questions.length ; i++){
          const quesion = questions[i]
          if(quesion.currectAnswer === quesion.selectedAnswer){
            counter+=1
            console.log("44")
          }
        }
        return counter
      })
    }
        


    function NewQuiz () {
      setMode(1)
      setScore(0)
      setQuiz(Math.random())
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
       <footer>
       <button 
         id="center-btn" 
         onClick={checkQuiz}>
          Check Answers
          </button> 
          </footer>:
          <footer>
            <h2>you got {score} answers right!</h2>
          <button 
            id="center-btn" 
            onClick={NewQuiz}>
            NewQuiz
            </button> 
            </footer>
          
          }
       
       </div>)
       }
    </div>
  )
}


