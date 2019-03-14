import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';

class App extends Component {

  constructor(props){
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     
    this.state = {
      name: '',
      number: ''
    }
  }

  handleChange1(e){
    this.setState({
      name: e.target.value
    })
  }

  handleChange2(e){
    this.setState({
      number: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let contact = {
      name: this.state.name,
      number: this.state.number
    }
    this.setState({
      name: '',
      number:''
    });
    this.props.createContact(contact);
  }

  listView(data, index){
    return (
      <div className="row">
        <div className="col-md-6">
          <li key={index} className="list-group-item clearfix">
            {data.name}
          </li>
        </div>
        <div className="col-md-4">
          <li key={index} className="list-group-item clearfix">
            {data.number}
          </li>
        </div>
        <div className="col-md-2">
          <button onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
            Remove
          </button>
        </div>
    </div> 
    )
  }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index);
  }

  render() {

    return(
      <div className="container">
        <h1><center>Welcome to upPhoneBook</center></h1>
        <hr />
        <div>
          {/* <h3>Name</h3> */}
          <form onSubmit={this.handleSubmit}>
            <input type="text" required onChange={this.handleChange1} className="form-control" value={this.state.name} placeholder="Name"/><br />
            <input type="number"  required onChange={this.handleChange2} className="form-control" value={this.state.number} placeholder="Contact Number"/><br />
            <input type="submit" className="btn btn-success" value="ADD"/>
          </form>
          <hr />
        { <ul className="list-group">
          {this.props.contacts.map((contact, i) => this.listView(contact, i))}
        </ul> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index =>dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
