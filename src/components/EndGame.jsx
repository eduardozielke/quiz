import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import AnalyzeAnswers from './AnalyzeAnswers'

function EndGame() {
    const [analyze, setAnalyze] = useState(false)
    const right_answers = useSelector(state => state.right_answers)
    const history = useSelector(state => state.history)
    const dispatch = useDispatch()

    const handleAnalyze = () => {
        setAnalyze(true)
        setTimeout(()=>{
            window.scrollBy(0, window.innerHeight - 20);
        }, 100)
    }

    const renderResult = (right_answers) => {
        if(right_answers < 6) {
            return (
            <div className='resultNumber'>
                <span className='emoji'>&#128517;</span>
                <h1>You got {right_answers} out of 10 questions correct!</h1>
                <p className='red-color'>Keep trying and you'll make it</p>
            </div>
            )
        } else if(right_answers < 8) {
            return (
            <div className='resultNumber'>
                <span className='emoji'>&#128512;</span>
                <h1>You got {right_answers} out of 10 questions correct!</h1>
                <p className='blue-color'>You are good with it!</p>
            </div>)
        } else {
            return (
            <div className='resultNumber'>
                <span className='emoji'>&#128513;</span>
                <h1>You got {right_answers} out of 10 questions correct!</h1>
                <p className='green-color'>You're rocking this!</p>
            </div>)
        }
    }

    const playAgain = () => {
        dispatch({type:'PLAY_AGAIN'})
    }

    const renderHistory = (array) => {
        return array.map((item, index) => 
            <>
                <h1 key={index} className='shadow p-3 mb-5 bg-white rounded question' 
                dangerouslySetInnerHTML={{__html: item.question}} />    
                <div className='quizAnswers'>
                    {item.answers.map((answer, index) => {
                        return (
                            <AnalyzeAnswers 
                            key={index} 
                            answer={answer} 
                            correct_answer={item.correct_answer} 
                            choosed={item.choosed}/>
                        )
                        }
                    )}
                </div>
            </>
        )
    }

  return (
      <div className='endGameWrapper'>

        <div className='result'>
            {renderResult(right_answers)}
            <div className='resultButtons'>
                <button className='btn btn-lg btn-success border border-dark'
                onClick={playAgain}>Play Again</button>
                <button className='btn btn-lg btn-primary border border-dark'
                onClick={handleAnalyze}>Analyze Answers</button>
            </div>
        </div>

        {analyze && (
            <div id='historyWrapper'>
                {(renderHistory(history))}
                <div className='playAgainAnalyze'>
                    <button className='btn btn-lg btn-success border border-dark'
                    onClick={playAgain}>Play Again</button>
                </div>
            </div>
        )}

      </div> 
  )
}

export default EndGame