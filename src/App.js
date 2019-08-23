import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'CRUD simples com ReactJs',
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  fSubmit = (e) => {
    e.preventDefault();

    let datas = this.state.datas;

    let name = this.refs.name.value;
    let address = this.refs.address.value;

    let data = {
      name,
      address
    }

    datas.push(data);

    this.setState({
      datas: datas
    })

    this.refs.myForm.reset();
    this.refs.name.focus();

  }

  fRemove = (i) => {
    let datas = this.state.datas;

    datas.splice(i, 1);

    this.setState({
      datas: datas
    })

  }

  render() {




    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Seu nome.." className="formField" />
          <input type="text" ref="address" placeholder="Seu endereço.." className="formField" />
          <button onClick={(e) => this.fSubmit(e)}>Enviar</button>
        </form>

        {this.state.datas.map((obj, i) => {
          return (
            <li key={i} className="myList">
              #{i + 1} {obj.name}, {obj.address}
              <button onClick={() => this.fRemove(i)}>Remover</button>
              <button onClick={() => this.fEdit(i)}>Editar</button>
            </li>

          )
        })}
      </div>
    )
  }
}
