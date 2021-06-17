 import * as React from 'react';
 import * as ReactDOM from 'react-dom';
 import './index.css';
 import { ThemeProvider } from './contexts/theme';
 import Nav from './components/Nav';
 import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 import Loading from './components/Loading';

 const Popular = React.lazy(() => import('./components/Popular'))
 const Battle = React.lazy(() => import('./components/Battle'))
 const Results = React.lazy(() => import('./components/Results'))

 // Component has 3 diff things
 // 1. state
 // 2. lifecycle (data from API, event handling, etc.)
 // 3. UI

class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
          this.setState(({ theme }) => ({
            theme: theme === 'light' ? 'dark' : 'light'
          }))
    }
}
    render () {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />

                            <React.Suspense fallback={<Loading />} >
                                <Switch>
                                    <Route exact path='/' component={Popular} />
                                    <Route exact path='/battle' component={Battle} />
                                    <Route path='/battle/results' component={Results} />
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
          </Router>
        )
    }
}

ReactDOM.render(
     // 2 arguments (1st is a react element, 2nd is where to render the element to)
     <App />,
     document.getElementById('app')
 )