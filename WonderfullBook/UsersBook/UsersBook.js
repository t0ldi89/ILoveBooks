import React, {Component} from 'react';
import AddUserForm from "../MainBook/AddUserForm";
import AllUsers from "../MainBook/AllUsers";
import LatestNews from "./LatestNews";
import AddNewReadBook from "./AddNewReadBook";
import Statistic from "./Statistic";

class UsersBook extends Component {
    state = {
            id: this.props.match.params.userId,
        user: {},
        page: {
            addBook: false,
            stat: false
        }
    };

    componentDidMount() {
        const { id } = this.state;
        fetch(`http://localhost:3000/users/${id}`)
            .then (resp => resp.json())
            .then (user => this.setState({user}))
    }
    handleOnAddBook = () => {
        this.setState({
            page: {
                addBook: true,
                stat: false
            }
        })
    }

    handleBackClick = () => {
        this.props.history.push(`/`)
    };
    handleOnStat = () => {
        this.setState({
            page: {
                addBook: false,
                stat: true
            }
        })
    };

    render() {
        const {user, page} = this.state;
        let pages;
        if(page.addBook){
            pages = <AddNewReadBook />
        } else if (page.stat){
            pages = <Statistic />
        }else {
            pages  = <LatestNews />
        }
        return (
            <>
                <div id="wrapper">
                    <div id="container">
                        <section className="open-book">
                            <div className='pageOne'>
                                <article>
                                    <h1 className="userTitle">
                                        <p>Welcome
                                            <span>{user.name} {user.surname}
                                            </span>
                                        </p>
                                    </h1>
                                </article>
                                <div className='mainAddUser'>
                                    <div className='userButtons'>
                                    <div className='borderAddUSer'>
                                        <div className='addUser' onClick={this.handleOnAddBook}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <span>
                                        <p>Add book</p>
                                            <i className="fas fa-book-medical"></i>
                                        </span>
                                        </div>
                                        <div className='addUserSquere'></div>
                                    </div>
                                    <div className='borderAddUSer'>
                                        <div className='addUser' onClick={this.handleOnStat}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <span>
                                        <p>Achievements</p>
                                          <i className="fas fa-trophy"></i>
                                        </span>
                                        </div>
                                        <div className='addUserSquere'></div>
                                    </div>
                                    </div>
                                    <div className='borderAddUSer'>
                                        <div className='addUser' onClick={this.handleBackClick}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <span>
                                        <p>Back</p>
                                          <i className="fas fa-undo"></i>
                                        </span>
                                        </div>
                                        <div className='addUserSquere'></div>
                                    </div>

                                </div>
                            </div>
                            <div className='pageTwo'>
                                {pages}
                            </div>
                        </section>
                    </div>
                </div>
            </>
        );
    }
}

export default UsersBook;