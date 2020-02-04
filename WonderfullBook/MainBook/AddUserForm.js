import React, {Component} from 'react';

class AddUserForm extends Component {
   constructor(props){
       super(props);
       this.state = {
           name: '',
           surname: '',
           visibility: this.props.visible
       };
   }
    handleOnChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })

    };
    handleOnAdd = ()=>{
        const newUserAdd = {
            name: this.state.name,
            surname: this.state.surname
        };
        fetch(`http://localhost:3000/users`,{
            method: "POST",
            body: JSON.stringify(newUserAdd),
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => {
                this.props.changeVisitibity()
    });
};

    render() {
        const {visible} = this.props;
        return this.props.visible ? (
            <form onSubmit={this.handleOnAdd} className='addUserForm'>
                <div>
                    <p>Name</p>
                    <input name='name' type='text' value={this.state.name} onChange={this.handleOnChange}/>
                </div>
                <div>
                    <p>Surname</p>
                    <input name='surname' type='text' value={this.state.surname} onChange={this.handleOnChange}/>
                </div>
                <input className='addButton' type="submit" value='Add' />
            </form>
        ) : null
    }
}

export default AddUserForm;