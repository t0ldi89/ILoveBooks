import React, {Component} from 'react';
import { withRouter }  from 'react-router-dom'

class AddNewReadBook extends Component {
    state = {
        userId: '',
        stars: {
            first: 'black',
            second: 'black',
            third: 'black',
            fourt: 'black',
            five: 'black'
        },
        rank: 0,
        title: '',
        author: '',
        dataStart: {
            sDay: '',
            sMonth: '',
            sYear: ''
        },
        dataEnd: {
            eDay: '',
            eMonth: '',
            eYear: ''
        },
        genre: '',
        pages: '',
        descript: '',
        id: this.props.match.params.userId,
    };

    componentDidMount() {
        const { id } = this.state;
        fetch(`http://localhost:3000/users/${id}`)
            .then (resp => resp.json())
            .then (userId => this.setState({userId}))
    }

    handleClick2 = ()=>{
        this.setState({
            stars: {
                first: 'yellow',
                second: 'yellow',
                third: 'black',
                fourt: 'black',
                five: 'black'
            },
            rank:2
        })
    };handleClick3 = ()=>{
        this.setState({
            stars: {
                first: 'yellow',
                second: 'yellow',
                third: 'yellow',
                fourt: 'black',
                five: 'black'
            },
            rank:3
        })
    };handleClick4 = ()=>{
        this.setState({
            stars: {
                first: 'yellow',
                second: 'yellow',
                third: 'yellow',
                fourt: 'yellow',
                five: 'black'
            },
            rank:4
        })
    };
    handleClick5 = ()=>{
        this.setState({
            stars: {
                first: 'yellow',
                second: 'yellow',
                third: 'yellow',
                fourt: 'yellow',
                five: 'yellow'
            },
            rank:5
        })

    };
    handleClick1 = () =>{
        this.setState({
            stars: {
                first: 'yellow',
                second: 'black',
                third: 'black',
                fourt: 'black',
                five: 'black'
            },
            rank: 1
        })
    };
   handleOnChange =(e)=>{
       this.setState({
           [e.target.name]: e.target.value
       });
   };

    handleOnAddBook = (e)=>{
        const newBookAdd = {
                title: this.state.title,
                author: this.state.author,
            dataStart: {
                sDay: this.state.sDay,
                sMonth: this.state.sMonth,
                sYear: this.state.sYear
                },
                dataEnd: {
                    eDay: this.state.eDay,
                    eMonth: this.state.eMonth,
                    eYear: this.state.eYear
                },
                genre: this.state.genre,
                page: this.state.pages,
                rank: this.state.rank,
                descript: this.state.descript,
                idUser: this.state.userId.id
    }

        fetch(`http://localhost:3000/books`, {
            method: "POST",
            body: JSON.stringify(newBookAdd),
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json"
            },
        })
            .then(resp => resp.json())
    };

    render() {
        const {stars} = this.state;
        return (
            <div className='addNewBookStyle'>
                <form className='addNewBookForm'>
                    <div>
                        <p>Title</p>
                        <input className='title' name='title' value={this.state.title} onChange={this.handleOnChange}/>
                    </div>
                    <div>
                        <p>Author</p>
                        <input className='author' name='author' value={this.state.author} onChange={this.handleOnChange}/>
                    </div>
                    <div>
                        <p>Date of start of reading</p>
                        <input  className='date' name='sDay' placeholder='day' value={this.state.sDay} onChange={this.handleOnChange}/>
                        <input  className='date' name='sMonth' placeholder='month' value={this.state.sMonth} onChange={this.handleOnChange}/>
                        <input  className='date' name='sYear' placeholder='year' value={this.state.sYear} onChange={this.handleOnChange}/>
                    </div>
                    <div>
                        <p>Date of reading</p>
                        <input  className='date' placeholder='day' name='eDay' value={this.state.eDay} onChange={this.handleOnChange}/>
                        <input  className='date' placeholder='month' name='eMonth' value={this.state.eMonth} onChange={this.handleOnChange}/>
                        <input  className='date' placeholder='year' name='eYear' value={this.state.eYear} onChange={this.handleOnChange}/>
                    </div>
                    <div>
                        For the genre of the book
                        <select name='genre' onChange={this.handleOnChange} value={this.state.genre}>
                            <option></option>
                            <option>Thriller</option>
                            <option>Horror</option>
                            <option>Fantastic</option>
                            <option>Fantasy</option>
                            <option>Science Fiction</option>
                            <option>Sensational</option>
                        </select>
                    </div>
                    <div>
                        <p>Number of pages</p>
                        <input className='date' name='pages' onChange={this.handleOnChange} value={this.state.pages}/>
                    </div>
                    <div className='textareaAddBook'>
                        <p>Short description</p>
                        <textarea name='descript' onChange={this.handleOnChange} value={this.state.descript}/>
                    </div>
                    <div >Your rate
                        <i  style={{color:stars.first}} className="fas fa-star" onClick={this.handleClick1}></i>
                        <i style={{color:stars.second}} className="fas fa-star" onClick={this.handleClick2}></i>
                        <i style={{color:stars.third}} className="fas fa-star" onClick={this.handleClick3} ></i>
                        <i style={{color:stars.fourt}} className="fas fa-star" onClick={this.handleClick4} ></i>
                        <i style={{color:stars.five}} className="fas fa-star" onClick={this.handleClick5} ></i>
                    </div>
                    <span >
                    <input  className='addBookBnt' type='submit' value='Add book' onClick={this.handleOnAddBook}/>
                    </span>
                </form>
            </div>
        );
    }
}

export default  withRouter(AddNewReadBook);