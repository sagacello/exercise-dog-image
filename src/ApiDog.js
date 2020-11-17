import React from "react";

class ApiDog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cachorroinicial: "",
      carregar:true
    };
    this.fetchDog = this.fetchDog.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem('caminhoCachorro', this.state.cachorroinicial.message.split("/")[4])
    // dessa forma aparece so o nome do cachorro
    // componentDidUpdate - dispara uma ou mais ações após o componente ser atualizado;
    console.log('depois')
  }

  componentDidMount() {
    this.fetchDog();
    console.log('antes')

    // ele roda o construtor e renderiza primeiro antes de chamar o objeto do fetch
    // então na primeira requisição vem undefined
  }

  fetchDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(resposta => resposta.json())
      .then(resultado => this.setState({ cachorroinicial: resultado }));
      // cada vez que eu aperto o botao um novo cachorro é atualizado dentro de cachorroinicial
  }

  render() {
    const carregando = <span>Carregando .........</span>
    if (this.state.cachorroinicial === "") return carregando  
    return (
      <div>
        <p>Doguinhos</p>
        <div>
          <img src={this.state.cachorroinicial.message} />
        </div>
          <button onClick={this.fetchDog}>Novo cachorro</button>

      </div>
    );
  }
}

export default ApiDog;