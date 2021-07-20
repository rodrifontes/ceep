import React, { Component } from 'react';
import "./estilo.css";

class ListaDeCategorias extends Component {

    constructor(){
        super();
        this.state = {categorias: []};

        this._novasCategorias = this._novasCategorias.bind(this);
    }

    //A inscrição poderia ser colocada no construtor, no entanto 
    //só que nesse momento do construtor meu objeto não está 100% criado ainda. 
    //Fora que se estou me inscrevendo em algum objeto externo, 
    //esse objeto externo tem que estar criado para mim, e não necessariamente ele vai estar criado, vai existir.
    //Ver ciclo de vida do react
    //Esse método é chamado assim que o componente é criado e 
    //está pronto, é dentro desse método que devemos iniciar chamadas para API
    //ou executar código que tem efeito colateral.
    componentDidMount() {
        this.props.categorias.inscrever(this._novasCategorias);
    }

    componentWillMount(){
        this.props.categorias.desinscrever(this._novasCategorias);
      }

    _novasCategorias(categorias){
        this.setState({...this.state, categorias});
    }

    _handleEventoInput(e) {
        if (e.key === "Enter") {
            let valorCategoria = e.target.value;
            this.props.adicionarCategoria(valorCategoria);
        }
    }

    render() {
        return (
            <section className="lista-categorias">
                <ul className="lista-categorias_lista">
                    {this.state.categorias.map((categoria, index) => {
                        return <li key={index} className="lista-categorias_item">{categoria}</li>
                    })}
                </ul>
                <input
                    type="text"
                    className="lista-categorias_input"
                    placeholder="Adicionar Categoria"
                    onKeyUp={this._handleEventoInput.bind(this)}
                />
            </section>
        );
    }

}

export default ListaDeCategorias;