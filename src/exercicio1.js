import React , { Component } from 'react';
import './App.css';

// os estados se atualizam 

class Counter extends Component {
    constructor() {
      super();
      this.state = {
        counter: 0
      };
      console.log("construtor");
    }
  
    componentDidMount() {
      console.log("componentDidMount");
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      console.log("shouldComponentUpdate");
      return true;
    }
  
    componentDidUpdate(prevProps, prevState) {
      console.log("componentDidUpdate");
    }
  
    render() {
      console.log("render");
      return (
        <div className="App">
          <p>Contador</p>
          <button
            onClick={() => this.setState((state) => ({ counter: state.counter + 1 }))}
          >
            Soma
          </button>
          <p>{this.state.counter}</p>
        </div>
      );
    }
  }

  export default Counter;
