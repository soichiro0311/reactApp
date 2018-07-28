import * as React from 'react';
import { Route, BrowserRouter,Link } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import './index.css';
import MoneyBook from './MoneyBook';
import Game from './game';
import registerServiceWorker from './registerServiceWorker';


class Index extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <p>
            <Link to="/game">Game</Link>&nbsp;
            <Link to="/money">MoneyBook</Link>&nbsp;
          </p>
          <Route exact path='/game' component={Game} />
          <Route exact path='/money' component={MoneyBook} />
        </div>
      </BrowserRouter>
    )
  }
}

registerServiceWorker();

ReactDOM.render(
  <Index />,
  document.getElementById('root') as HTMLElement
);