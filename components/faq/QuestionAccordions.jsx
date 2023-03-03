import React, { useState } from 'react'
import { BiPlus, BiMinus } from "react-icons/bi";

const dummy_text=`
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`


const QuestionAccordions = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='question_accordion text-dark'>
      <div className='question_accordion-header text-dark cursor-pointer' onClick={() => setOpen(!open)} >
        <h4>Aliquam erat volutpat lorwm ipsum dolor sit amet?</h4>
      </div>
      <div className='question_accordion-content'>
        <p>
        {
          !open ?dummy_text.slice(0,400)+"(...)":dummy_text
        }
        </p>
      </div>
      <div onClick={() => setOpen(!open)} className='question_accordion-icon cursor-pointer'>{!open ? <BiPlus size={32} /> : <BiMinus size={32} />}</div>
    </div>
  )
}

export default QuestionAccordions