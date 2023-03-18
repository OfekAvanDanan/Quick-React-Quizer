import React from "react"

export default function Question(props){

  let selectedStyle = {
    backgroundColor:"#D6DBF5",
    border:"#D6DBF5"
  }
  const printAns = props.answers.map((answer,index)=>{

    return(
      <h3
      key={index}
      style = {index === props.selected ? selectedStyle : {}}
      onClick = {(e)=>props.selectAnswer(e,props.id,index)}
      >
      {answer}
      </h3>
    )
  })

  return(
    <div>
    <h2>{props.question}</h2>
      <div className="answers">
        {printAns}
      </div>
      <hr/>
    </div>)
}