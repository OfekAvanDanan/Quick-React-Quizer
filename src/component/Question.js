import React from "react"

export default function Question(props){

  let selectedStyle = {
    backgroundColor:"#D6DBF5",
    border:"#D6DBF5"
  }
  const printAns = props.questionData.answers.map(answer=>{
    return(
      <h3
      key={answer.key}
      onClick={(e) =>props.selectAns(e,answer.questionKey,answer.key)}
      style={answer.selected ? selectedStyle : {} }
      >
      {answer.ans}
      </h3>
    )
  })

  return(
    <div>
    <h2>{props.questionData.question}</h2>
      <div className="answers">
          {printAns}
      </div>
      <hr/>
    </div>)
}