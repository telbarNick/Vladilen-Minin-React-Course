import React from 'react';
import Layout from './hoc/Layout/Layout.js'
import {Route, Switch} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz.js';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Auth from './containers/Auth/Auth';

class App extends React.Component {

  render() {
    return (
      <Layout>
        <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/quiz-creator' component={QuizCreator} />
            <Route path='/quiz/:id' component={Quiz} />
            <Route path='/' component={QuizList} />
        </Switch>
      </Layout>
    )
  }

}

export default App
