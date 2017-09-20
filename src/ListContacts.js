import React, { Component } from 'react'

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
        <button className='contact-remove'>Remove</button>

      </li>
    ))}
  </ol>
  )
}


export default ListContacts
