import React from 'react'
import PropTypes from 'prop-types'

function ListContacts (props) {
  return (
    <ol className='contact-list'>
    {props.contacts.map( ele => (
      <li key={ele.name} className='contact-list-item'>
        <div className='contact-avatar' style={{backgroundImage: `url(${ele.avatarURL})`}}/>
        <div className='contact-details'>
          <p>{ele.name}</p>
          <p>{ele.email}</p>
        </div>
        <button onClick={()=>props.onDeleteContact(ele)} className='contact-remove'>Remove</button>

      </li>
    ))}
  </ol>
  )
}

ListContacts.PropTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts
