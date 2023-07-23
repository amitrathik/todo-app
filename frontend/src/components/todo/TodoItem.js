import React from 'react'
import {partial} from '../../lib/utils.js'

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)
  return (
    <li>
      <input type="checkbox"
        onChange={handleToggle}
        checked={props.isComplete}
      />
      {props.name}
      <span className="remove-item"><a href="#" onClick={handleRemove}>X</a></span>
    </li>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id : React.PropTypes.number.isRequired
}
