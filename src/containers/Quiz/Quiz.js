import React from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.js';

class Quiz extends React.Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: "Какого цвета небо?",
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4}
                ]
            },
            {
                question: "В каком году основали Санкт-Петербург?",
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    }

    componentDidMount() {
        console.log(this.props)
    }

    onAnswerClickHandler = (answerID) => {

        // Cheking if answerState not null, create an array of keys in object answerState
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
        // Here if our object answerState by key [key] is equal 'success', we return the function.
        // This was made to prevent a bug of double clicking.
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        // Checking did we click on the correct answer.
        if (question.rightAnswerId === answerID) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
        // Adding an object in answerState by answerID key, to add a className 'success' to our AnswerItem.
            this.setState({
                answerState:{[answerID]:'success'},
                results
            })

            const timeout = window.setTimeout(() => {
        // Checking if our quiz has finished or not.
        // If not, then we increment our activeQuestion by 1. 
        // Making answerState: null to delete a className 'success' in next question.
                if (this.quizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

               window.clearTimeout(timeout) 
            }, 1000)
        // If answer is incorrect, adding an 'error' className to make answerItem red.
        } else {
            results[question.id] = "error";
            this.setState({
                answerState:{[answerID]:'error'},
                results
            })
        }
    }
// Function to check if our quiz is not finished.
    quizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWraper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                        ?<FinishedQuiz 
                            results = {this.state.results}
                            quiz = {this.state.quiz}
                            onRetry = {this.retryHandler}
                        />
                        :<ActiveQuiz 
                            answers={this.state.quiz[this.state.activeQuestion].answers} 
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength = {this.state.quiz.length}
                            answerNumber = {this.state.activeQuestion + 1}
                            state = {this.state.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz 