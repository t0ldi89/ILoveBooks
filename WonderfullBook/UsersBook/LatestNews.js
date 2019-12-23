import React, {Component} from 'react';
import { withRouter }  from 'react-router-dom'
import Bar from "./Bar";

class LatestNews extends Component {
    state ={
        id: this.props.match.params.userId,
        books: [],
        data: {}
    };
    componentDidMount() {
        const { id } = this.state;
        fetch(`http://localhost:3000/users/${id}`)
            .then (resp => resp.json())
            .then (userId => this.setState({userId}));

    }
    allPlayers = (
        fetch(`http://localhost:3000/books`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(books => {
                return books
            })
            .then(books => this.setState({books}))
    );
    allBooks = () => {
        const arr =[];
        {this.state.books.forEach((el) =>{
            if(el.idUser == this.state.id){
                arr.push(el)
            }
        })}

        return (arr.length !== 0) ? <p>You have already read <b>{arr.length}</b></p> : <p><b>It's time to start reading something books !!!</b></p>
    };

    lastBook = () =>{
        const arr = [];

        {this.state.books.forEach((el) =>{
            if(el.idUser == this.state.id) {
                arr.push(el.title)
            }
        })}
       arr.reverse();
        return (arr.length !== 0) ? <p>Your last read book is: <b>{arr[0]}</b></p> : null
    };

    getSerializeName = (name) => {
        return name.replace(" ", "").toLowerCase()
    }

    get genreStatistic() {
        const result = {};
        this.state.books.forEach((el) =>{
            if(el.idUser == this.state.id) {
                const key = this.getSerializeName(el.genre);
                result[key] = result[key] ? result[key] + 1 : 1
            }
        });
        return result
    };
    timer = () => {
        const arrD = [];
        const arrM = [];
        const arrY = [];
        let day = ''
        let difference = ''
        this.state.books.forEach(el =>{
            if(el.idUser == this.state.id) {
                arrD.push(el.dataEnd.eDay);
                arrD.sort((a,b) =>{
                    return b-a
                })
                arrM.push(el.dataEnd.eMonth);
                arrM.sort((a,b) =>{
                    return b-a
                })
                arrY.push(el.dataEnd.eYear);
                arrY.sort((a,b) =>{
                    return b-a
                });

                const montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
                       const yr = arrY[0];
                      const m = arrM[0];
                      const d = arrD[0];
                    const today=new Date()
                    const todayy=today.getFullYear();
                    const todaym=today.getMonth();
                    const todayd=today.getDate();
                    let todaystring=montharray[todaym]+" "+todayd+", "+todayy;
                    const paststring=montharray[m-1]+" "+d+", "+yr
                    difference=(Math.round((Date.parse(todaystring)-Date.parse(paststring))/(24*60*60*1000))*1);

            }
        });

        return (arrY.length !== 0 && arrM.length !== 0 && arrD.length !== 0 ) ? <p>It's been gone since you read the last book <b>{difference}</b> days</p> : null
    }

    render() {
        return (
            <div className='allUsers'>
                <h1>Latest News</h1>
                    <div>
                        <span className='words'><p>{this.allBooks()}</p></span>
                        <div className='words'>{this.lastBook()}</div>
                        <div>{this.timer()}</div>
                        <div className='words'>
                            <Bar data={this.genreStatistic}/>
                        </div>
                    </div>
            </div>
        );
    }
}

export default  withRouter(LatestNews);