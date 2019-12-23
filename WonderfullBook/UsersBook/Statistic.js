import React, {Component} from 'react';
import { withRouter }  from 'react-router-dom'
import BooksStats from "./BooksStats";

class Statistic extends Component {
    constructor(props){
        super(props);

        this.state = {
            readBooks: [],
            userId: '',
            id: this.props.match.params.userId,
            myBook: [],
            isToggleOn: true,
            transClass: ''
        };
        this.handleOnMore = this.handleOnMore.bind(this);
    }


    componentDidMount() {
        const { id } = this.state;
        fetch(`http://localhost:3000/users/${id}`)
            .then (resp => resp.json())
            .then (userId => this.setState({userId}))
    }

    allBooks = (
        fetch(`http://localhost:3000/books`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(books => {
                return books
            })
            .then(readBooks => this.setState({readBooks}))
    );

    handleOnMore = (index) => {
        let click = this.state.readBooks;
        click[index].isActive = !click[index].isActive
        this.setState( {
            readBooks: click,
            transClass:'transClass'
        });
    };
    handleDelete =(id) =>{
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                const index = this.state.readBooks.findIndex(book => book.id === id);
                this.setState(prevState => ({
                    readBooks: [
                        ...prevState.readBooks.slice(0, index),
                        ...prevState.readBooks.slice(index + 1)
                    ]
                }))
            })
    };

    render() {
        const userBooks = this.state.id;
        const visib = this.state.visible;
        return (
        <div className='allUsers'>
            <h1>Your reading books</h1>
            <div className='allUsersBook'>
                {this.state.readBooks.map((el, index) => {
                    if(userBooks == el.idUser){
                        return (
                            <ul key={el.id} >
                                <li>
                                    <div>
                                        <p>Title: {el.title} </p>
                                        <p>Author: {el.author}</p>
                                        {el.isActive
                                            ?
                                            <BooksStats startD={el.dataStart.sDay}
                                                        startM={el.dataStart.sMonth}
                                                        startY={el.dataStart.sYear}
                                                        endD={el.dataEnd.eDay}
                                                        endM={el.dataEnd.eMonth}
                                                        endY={el.dataEnd.eYear}
                                                        pages={el.page}
                                                        rank={el.rank}
                                                        genre={el.genre}
                                                        descript={el.descript} />
                                            :  null}
                                        <input className='deleteBtn' type='submit' value='Delete this book' onClick={(e) =>this.handleDelete(el.id)}/>
                                    </div>
                                    <div className='tooltip'>
                                        <i className="fas fa-info-circle" onClick={(e) => this.handleOnMore(index)}></i>
                                        <span className="tooltiptext">More info</span>
                                    </div>
                                </li>
                            </ul>
                        )
                    }
                })
                    }
                </div>
        </div>
        )
    }
}

export default  withRouter(Statistic);