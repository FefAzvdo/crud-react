import React from 'react';
import './App.css';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'CRUD simples com ReactJs',
      act: 0,
      index: '',
      datas: [],
      btnName: 'ENVIAR',
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
    let nascimento = this.refs.nascimento.value;
    let email = this.refs.email.value;

    if (this.state.act === 0) {                             //NOVO
      let data = {
        name,
        address,
        nascimento,
        email,
      }

      datas.push(data);
    }
    else if (this.state.act === 1) {                        //UPDATE

      let index = this.state.index;

      datas[index].name = name;
      datas[index].address = address;
      datas[index].nascimento = nascimento;
      datas[index].email = email;

    }

    this.setState({
      datas: datas,
      act: 0,
      btnName: 'ENVIAR'
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

  fEdit = (i) => {
    this.refs.name.focus();
    let data = this.state.datas[i];

    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.refs.nascimento.value = data.nascimento;
    this.refs.email.value = data.email;

    this.setState({
      act: 1,
      index: i,
      btnName: 'EDITAR'
    })

  }

  render() {




    return (
      <div className="App">
        <h2>{this.state.title}</h2>


        <Form ref="myForm" className="myForm">
          <Container>
            <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label style={{ fontSize: 20 }}>Nome:</Form.Label>
                  <Form.Control type="text" placeholder="Seu nome..." ref="name" />
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                  <Form.Label style={{ fontSize: 20 }}>Endereço:</Form.Label>
                  <Form.Control type="text" placeholder="Seu endereço..." ref="address" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formBasicNascimento">
                  <Form.Label style={{ fontSize: 20 }}>Nascimento:</Form.Label>
                  <Form.Control type="date" ref="nascimento" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label style={{ fontSize: 20 }}>Email:</Form.Label>
                  <Form.Control type="email" placeholder="Seu email..." ref="email" />
                </Form.Group>
              </Col>
            </Row>
          </Container>

          <Button variant="primary" type="submit" size="lg" block onClick={(e) => this.fSubmit(e)} className="myButton">
            {this.state.btnName}
          </Button>
        </Form>



        <Table striped bordered hover dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Nascimento</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.datas.map((obj, i) => {
              return (

                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{obj.name}</td>
                  <td>{obj.address}</td>
                  <td>{obj.nascimento}</td>
                  <td>{obj.email}</td>
                  <td style={{ justifyContent: 'space-around', alignItems: 'center', display: 'flex' }}>
                    <Button on onClick={() => this.fRemove(i)} className="myListButton">Remover</Button >
                    <Button onClick={() => this.fEdit(i)} className="myListButton">Editar</Button>
                  </td>
                </tr>

              )
            })}
          </tbody>
        </Table>




      </div>
    )
  }
}


