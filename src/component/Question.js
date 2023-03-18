import React from "react"

export default function Question(props){
  

  //style when selected

  function ansStyle (index){
    let style = {}
  if (props.mode === 1 && index === props.selected){
      style = {
      backgroundColor:"#D6DBF5",
      border:"#D6DBF5"
      }
    }
  //style on check
  if (props.mode ===2){
    //currect answer
    if (props.currectAnswer === index){
      style = {
        backgroundColor:"#94D7A2",
        border:"#94D7A2"}
      }
      //incorrect answer
      else if (props.selected === index){
        style = {
          backgroundColor:"#F8BCBC",
          border:"#F8BCBC",
          opacity: 0.5
        }
      }//everything else
      else{
        style = {
          opacity:0.5
        }
      }
    }
    return style
    }


  const printAns = props.answers.map((answer,index)=>{
    return(
      <h3
      key={index}
      style = {ansStyle(index)}
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