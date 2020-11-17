import React, { Component } from 'react';

class DadJoke extends Component {
  constructor() {
    super();
    this.saveJoke = this.saveJoke.bind(this);
    this.renderJokeElement = this.renderJokeElement.bind(this);

    this.State = {
      jokeOjb: undefined,
      loading: true,
      storedJokes: []
    };
  }

  async fetchJoke() {
      this.setState(
          { loading: true}, // primiero parametro
          async () => {  // callback de retorna que retorna o que eu quiser depois do primeiro parametro
    // é como se fosse o then , o primeiro parametro é uma atualizaçao de estado e o segundo é a logica
    // entao acontece o loading primero depois a logica da funcao
    const requestHeaders = { headers: { Accept: 'application/json' } };
    // isso está na documentação do aplicativo
    const requestReturn = await fetch(
      'https://icanhazdadjoke.com/',
      requestHeaders
    );
    const requestJson = await requestReturn.json();
    this.setState({
      loading: false,
      jokeOjb: requestJson
    });
    })
  }

  componentDidMount() {
    this.fetchJoke();
    // ele roda o construtor e renderiza primeiro antes de chamar o objeto fetch
    // então na primeira requisição vem undefined
    // (jokeOjb ? jokeOjb.joke :loadingElement) se jokeObj nao for undefined retorna jokeOjb.joke
  }

  saveJoke() {
    this.setState(({ storedJokes, jokeOjb }) => ({
      storedJokes: [...storedJokes, jokeOjb],
    }));

    this.fetchJoke()
  }

  /*
  this.state(({ storageJokes, jokeObj }) => ({
      storageJokes: storageJokes.push(jokeObj) dessa forma da problema no react
      é a mesma logica , sem spread (...) fica juntando arrays e objtos em camadas
      diferentes  exemplo ['a','b', ['c'] ]
  }))

  */
  renderJokeElement() {
    return (
      <div>
        <p>{this.state.jokeOjb.joke}</p>
        <button  onClick={this.saveJoke}>
          Salvar Piada
        </button>
      </div>
    );
  }

  render() {
    const carregando = <span> Loading ............</span>;
    return (
      <div>
          <span>{this.storedJokes.map((jokeObj) => (<p key={jokeObj.id}>{jokeObj.joke}</p>))}</span>
        <p>{this.loading ? carregando : this.renderJokeElement()}</p>
      </div>
    );
  }
}

export default DadJoke;
