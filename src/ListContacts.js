import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState( {query: query.trim()})
  }

  clearQuery = () => {
    this.setState({
      query : ''
    })
  }

  render (){
    const {contacts, onDeleteContact} = this.props
    const {query} = this.state

    let showingContacts
    if (query){
      const match = new RegExp(escapeRegExp(query),'i')
      showingContacts = contacts.filter( (contact) => match.test(contact.name))
    }else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>

        <div className='list-contact-top'>
          <input className='search-contacts' type='test' placeholder='Search contacts' value={this.state.query} onChange={(event)=>this.updateQuery(event.target.value)}/>
        </div>
        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total </span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <ol className='contact-list'>
          {showingContacts.map( ele => (
            <li key={ele.name} className='contact-list-item'>
              <div className='contact-avatar' style={{backgroundImage: `url(${ele.avatarURL})`}}/>
              <div className='contact-details'>
                <p>{ele.name}</p>
                <p>{ele.email}</p>
              </div>
              <button onClick={()=>onDeleteContact(ele)} className='contact-remove'>Remove</button>

            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
