import React from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.js';
import Loader from '../../components/UI/Loader/Loader'
import axios from '../../axios/axios-quiz'

class Quiz extends React.Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    }

   async componentDidMount() {
       try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;

            this.setState({
                quiz,
                loading: false
            })
       } catch(e) {
            console.log(e)
       }
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
                        this.state.loading
                        ? <Loader />
                        : this.state.isFinished
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