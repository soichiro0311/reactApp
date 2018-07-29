import * as React from 'react';
import { Route, BrowserRouter,Link } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import './index.css';
import MoneyBook from './MoneyBook';
import Game from './game';
import registerServiceWorker from './registerServiceWorker';
import Calculator from './Calculator';


class Index extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/money">MoneyBook</Link></li>
            <li><Link to="/calc">Calculator</Link></li>
          </ul>
          <Route exact path='/game' component={Game} />
          <Route exact path='/money' component={MoneyBook} />
          <Route exact path='/calc' component={Calculator} />
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