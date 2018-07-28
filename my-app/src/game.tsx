import * as React from 'react';
import Board from './Board';
import './index.css';

interface HistoryData{
    squares:('○'|'×'|null)[];
}

interface GameState{
    history: HistoryData[];
    xIsNext:boolean;
    stepNumber:number;
}

class Game extends React.Component<{},GameState>{
    constructor(props:any){
        super(props);
        this.state={
            history:[{
                squares:Array(9).fill(null),
            }],
            xIsNext:true,
            stepNumber:0,
        };
    }

    handleClick(i:number){
        const history=this.state.history.slice(0,this.state.stepNumber+1);
        const current=history[history.length-1];
        let squares=current.squares.slice();
        if(calculateWinner(squares)||squares[i]) {
            return;
        }

        squares[i]=this.state.xIsNext ? '×':'○';
        this.setState({
            history:history.concat([{
                squares,
            }]),
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext,
        });
    }

    jumpTo(step:number){
        this.setState({
            stepNumber:step,
            xIsNext:(step%2===0),
        });
    }

    render(){
        const history=this.state.history;
        const current=history[this.state.stepNumber];
        const winner=calculateWinner(current.squares);
        const moves=history.map((step,move)=>{
            const desc=move ? 'Go to move #'+move:'Go to game start';
            return (
                <li key={move}>
                    <button onClick={()=>this.jumpTo(move)}> 
                        {desc}
                    </button>
                </li> 
            )
        });

        let status;
        if(winner){
            status='Winner: '+winner;
        }else{
            status='Next Player: '+(this.state.xIsNext?'×':'○');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i)=>this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }   
}

function calculateWinner(squares:('○'|'×'|null)[]){
    const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for(let i=0; i<lines.length; i++){
        const[a,b,c]=lines[i];
        if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
            return squares[a];
        }
    }
    return null;
}

export default Game;