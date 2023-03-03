import React from 'react'
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi"
const QuestionAnswer = ({ number, setActive, active }) => {
    return (
        <div className='question_dropdown mt-3'>
            <div className='question_dropdown-header text-dark cursor-pointer d-flex align-items-center justify-content-between' onClick={() => setActive(number)} >
                <div className='d-flex align-items-center gap-3'>
                    <span className='counter'>{number}</span>
                    <h3>Aliquam erat volutpat lorwm ipsum dolor sit amet?</h3>
                </div>
                {active ? <BiUpArrowAlt size={32} /> : <BiDownArrowAlt size={32} />}
            </div>
            <div className='question_dropdown-content mt-4'>
                {active ? <p>
                    {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                </p> : null}
            </div>
        </div>
    )
}

export default QuestionAnswer