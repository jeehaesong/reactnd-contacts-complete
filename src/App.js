import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact  from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  //add state inside of App components.
  // this way, react know the changes of this array.
  state ={
    // screen: 'list', //list, create
    contacts : []
  }

  componentDidMount() {
    // ContactsAPI.getAll().then( (contacts) => {
    //   this.setState( {contacts})
    // } ) // same as the below
    ContactsAPI.getAll().then( (contacts) => {
      this.setState( {contacts})
    })
  }

  removeContact = (contact) => {
    this.setState( (state)=>({
      contacts: state.contacts.filter((c)=> c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }

  CreateContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat( [contact])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={ ()=>(
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts = {this.state.contacts}
            onNavigate={ ()=>{ this.setState({screen: 'create'})
          }}
          />
      )}/>
    <Route path="/create" render = { ( { history } )=> (
        <CreateContact onCreateContact={(contact)=>{this.CreateContact(contact)
        history.push('/')
        }}/>
      )}/>
      </div>
    )
  }
}

export default App;
