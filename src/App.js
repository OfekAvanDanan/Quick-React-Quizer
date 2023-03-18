import React from "react"
import "./App.css"
//import { ReactSVG } from 'react-svg'
import Question from "./component/Question.js"
import { nanoid } from 'nanoid'


export default function App() {

   const [questions, setQuestions] = React.useState([])
   const [quiz, setQuiz] = React.useState(0)
   const[mode,setmode] = React.useState(0) // 0->start 1->play 2->view answers
   const [currectAnswers,setCurrectAnswers] = React.useState([])
  
    
    //get questions
   React.useEffect(function() {
        fetch(`https://the-trivia-api.com/api/questions/`)
            .then(res => res.json())
            .then(data => setQuestions(data))

        setCurrectAnswers(()=>{
          let arr = []
          for (let i = 0 ; i < 10 ; i++){
            arr.push(Math.floor(Math.random()*4))
          }
          return arr
        })
        
    }, [quiz])

   //generat Questions
   function generatQuestion (questionData,currectAnswerNum,questionKey){
      const answers = []
      let inCounter = 0
      
      for(let i = 0 ; i < 4 ; i++){
        if(i === currectAnswerNum){
          answers.push({
            ans:questionData.correctAnswer,
            questionKey:questionKey,
            key:i,
            currectAnswer:true,
            selected:false})
        }
        else
        {
          answers.push({
            ans:questionData.incorrectAnswers[inCounter],
            questionKey:questionKey,
            key:i,
            currectAnswer:false,
            selected:false})
            inCounter++
        }
      }
      return {
        question:questionData.question,
        key:{questionKey},
        answers:answers,
        currectAnswerNum:currectAnswerNum,
      }
    }



      function startQuiz () {
        setmode(1)
      }
      


      function printAllQuestions (arr){
        return arr.map((question,index) => (
         <Question
            questionData={generatQuestion(question,currectAnswers[index],index)}
            key={[index]}
            mode={mode}
            selectAns={selectAns}
            />
          ))}

      function selectAns (event,q,a){
        console.log(q,a,questions[q])
        setQuestions(oldQ => (oldQ.map(q =>(
          q === oldQ.key ?
          {
            ...q,
            answers:q.answers.map(ans => (
              ans.key === a ?
              {...a,
              selected:true}
              :
              a
            ))
          }
          :
          q)))

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


