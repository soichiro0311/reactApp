import * as React from 'react';
import './Sample.css';

// 計算結果を保持するstate
interface CalcResult {
  operation: ("+" | "-" | "*" | "/" | ""),
  arg1: (string | ""),
  arg2: (string | ""),
  answer: (number | "")
}

// 計算機の入力パネルのprops
interface PanelProps {
  value: any;
  onClick: () => void;
}

// 計算結果を保持するprops
interface AnswerProps {
  value: (number | "");
}

// 入力パネルデータを表示する関数
function Panel(props: PanelProps) {
  return (
    <button className="panel" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// 計算結果を表示する関数
function Answer(props: AnswerProps) {
  return (
    <div>
      {props.value}
    </div>
  )
}

// 入力パネルから計算を行い結果を返すコンポーネント
class Calculator extends React.Component<AnswerProps, CalcResult> {
  constructor(props: any) {
    super(props);
    this.state = {
      operation: "",
      arg1: "",
      arg2: "",
      answer: ""
    }
  }

  // 入力パネルを表示する関数を呼び出して、与えた引数をパネルに表示する
  renderPanel(i: (number | string)) {
    return (
      <Panel value={i}
        onClick={() => this.setData(i)}
      />
    );
  }

  // stateに設定された値から計算を行う
  calc() {
    let answer: (number | "") = "";
    if (this.state.arg1 != "" && this.state.arg2 != "") {
      // 小数計算だと誤差が生まれる
      let arg1 = parseFloat(this.state.arg1);
      let arg2 = parseFloat(this.state.arg2);
      switch (this.state.operation) {
        case '+': answer = arg1 + arg2;
          break;
        case '-': answer = arg1 - arg2;
          break;
        case '*': answer = arg1 * arg2;
          break;
        case '/': answer = arg1 / arg2;
          break;
        default: answer = ""
      }
    }
    this.setState({
      answer: answer
    })
  }

  // クリックされた入力パネルの値をstateに設定する
  setData(i: (number | string)) {
    if (i === '+' || i === '-' || i === '*' || i === '/') {
      this.setState({ operation: i });
    } else if (this.state.operation === "") {
      this.setState({ arg1: this.state.arg1 + i });
    } else {
      this.setState({ arg2: this.state.arg2 + i });
    }
  }

  // stateに設定された値を初期化する
  clear() {
    this.setState({
      operation: "",
      arg1: "",
      arg2: "",
      answer: ""
    })
  }

  // 表示する
  render() {
    let status = this.state.arg1 + ' ' + this.state.operation + ' ' + this.state.arg2;
    return (
      <div>
        <div>
          {status}
        </div>
        <div className="board-row">
          {this.renderPanel(1)}
          {this.renderPanel(2)}
          {this.renderPanel(3)}
          {this.renderPanel('+')}
        </div>
        <div className="board-row">
          {this.renderPanel(4)}
          {this.renderPanel(5)}
          {this.renderPanel(6)}
          {this.renderPanel('-')}
        </div>
        <div className="board-row">
          {this.renderPanel(7)}
          {this.renderPanel(8)}
          {this.renderPanel(9)}
          {this.renderPanel('*')}
        </div>
        <div className="board-row">
          {this.renderPanel(0)}
          {this.renderPanel('.')}
          {this.renderPanel('/')}
        </div>
        <button onClick={() => this.clear()}>
          初期化する
        </button>
        <button onClick={() => this.calc()}>
          計算する
        </button>
        <div className="answer">
          <Answer value={this.state.answer} />
        </div>
      </div>
    );
  }
}

export default Calculator;
