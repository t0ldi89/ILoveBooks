import React, {Component} from 'react';
import AddUserForm from "./AddUserForm";
import AllUsers from "./AllUsers";



class MainBook extends Component {
    state = {
        visibility: false
    }


    handleOnClick = () =>{
this.setState(prevState => ({
    visibility: !prevState.visibility
}))
    };

    render() {
        return (
            <>
            <div id="wrapper">
                <div id="container">
                    <section className="open-book">
                        <div className='pageOne'>
                        <article>
                            <h1 className="chapter-title">
                            <p className='hearthBeat'>I
                                <i className="fas fa-heart"></i>
                                BOOKS</p>
                            </h1>
                        </article>
                            <div className='mainAddUser'>
                                <div className='borderAddUSer'>
                                    <div className='addUser' onClick={this.handleOnClick}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <span>
                                        <p>Add user</p>
                                            <i className="fas fa-user-plus"></i>
                                        </span>
                                    </div>
                                    <div className='addUserSquere'></div>
                                </div>
                                <div>
                                </div>
                            <AddUserForm changeVisitibity={this.handleOnClick} visible={this.state.visibility}/>
                            </div>
                    </div>
                        <div className='pageTwo'>
                            <AllUsers />
                        </div>
                    </section>
                </div>
            </div>
</>
        );
    }
}

export default MainBook;


