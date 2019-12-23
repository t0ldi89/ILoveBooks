import React, {Component} from 'react';
import { withRouter }  from 'react-router-dom'
class AllUsers extends Component {

    state = {
        users: [],
    };
    allPlayers = (
        fetch(`http://localhost:3000/users`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(users => {
                return users
            })
            .then(users => this.setState({users}))
    );

    handleDelete =(id) =>{
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                const index = this.state.users.findIndex(user => user.id === id);
                this.setState(prevState => ({
                    users: [
                        ...prevState.users.slice(0, index),
                        ...prevState.users.slice(index + 1)
                    ]
                }))
            })
    };

    handleOnLog = (id) => (e) =>{
            this.props.history.push(`/user/${id}`)
    }
    render() {
        return(
            <div className='allUsers'>
            <h1>Users</h1>
                <div className='allUsersMain'>
                {this.state.users.map((el, index) =>{
                    return (
                        <div className='allUsersStyle' key={el.id} >
                            <div onClick={this.handleOnLog(el.id)}>Name: {el.name}</div>
                            <div>Surname: {el.surname}</div>
                            <span className='allUsersBnt'>
                            <input type="submit" value='Delete' onClick={(e) =>this.handleDelete(el.id)}/>
                            </span>
                        </div>
                    )
                })}
                </div>
    </div>

        )
    }
}

export default withRouter(AllUsers);