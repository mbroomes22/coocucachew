import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/users'

export class AllUsers extends React.Component {
  componentDidMount() {
    console.log('USERS COMPONENT')
    this.props.getUsers()
  }

  render() {
    console.log(this.props)

    return (
      <div>
        <main>
          <h1>Users</h1>
        </main>
        <div id="users">
          <tbody>
            {this.props.users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
