import * as React from 'react';

interface SquareProps{
    value:any;
    onClick: ()=> void;
}

function Square(props:SquareProps){
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

interface BoardProps{
    squares:('○'|'×'|null)[];
    onClick:(i:number) => void;
}

class Board extends React.Component<BoardProps,{}>{
    renderSquare(i:number){
        return (
            <Square value={this.props.squares[i]}
            onClick={()=>this.props.onClick(i)}
            />
        );
    }

    render(){
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
