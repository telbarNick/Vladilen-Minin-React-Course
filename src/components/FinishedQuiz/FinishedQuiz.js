import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button.js'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    console.log(props.results)
        const successCount = () => {
            const success= Object.values(props.results);
            let count = 0;
            for (let i = 0; i < success.length; i++) {
                if (success[i] === 'success') {
                    count = count + 1;
                }
            }
            return count
        }

        return (
            <div className={classes.FinishedQuiz}>
                <ul>
                    {
                        props.quiz.map((quizItem, index)=>{
                            const cls = [
                                'fa',
                                props.results[quizItem.id] === 'error'? 'fa-times': 'fa-check',
                                classes[props.results[quizItem.id]]
                            ]
                            return (
                                <li key={index}>
                                    <strong>{index+1}</strong>&nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                                </li>
                            )
                        })
                    }
                </ul>
                <p>Правильно {successCount()} из {props.quiz.length}</p>
                <div>
                    <Button onClick={props.onRetry} type="primary">Повторить</Button>
                    <Link to='/'>
                        <Button type="success">Перейти в список тестов</Button>
                    </Link>
                </div>
            </div>
        )
}

export default FinishedQuiz