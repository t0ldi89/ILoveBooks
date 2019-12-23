import React, {Component} from 'react';

class BooksStats extends Component {
    constructor(props){
        super(props);
        this.state = {
            days: '',
            books: []
        }
    }

    allBooks = (
        fetch(`http://localhost:3000/books`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(books => {
                return books
            })
            .then(books => this.setState({books}))
    );

    howManyDays = () =>{
        const {startD,startM,startY,endD,endM,endY, pages} = this.props;
        const days = parseInt(endD) - parseInt(startD);
        const months = Math.floor(parseInt(endM) - parseInt(startM))* 31;
        const year = Math.floor(parseInt(endY) - parseInt(startY)) * 365;
        const result = days + months + year;
        const howManypages = Math.floor(pages/result);

           return (
               <>
               You read this book in: {result} days.
                   You have read  {howManypages} pages a day
                   </>
           )
    };

    render() {
        const {startD,startM,startY,endD,endM,endY,pages,rank,genre,descript} = this.props;
        return (
            <>
                <p>You started reading: {startD}.{startM}.{startY}</p>
                <p>You finished reading: {endD}.{endM}.{endY}</p>
                <p>{this.howManyDays()}</p>
                <p>This books have {pages} pages.</p>
                <p>Your opinion: {rank}</p>
                <p>Your notes: {descript}</p>
           </>
        );
    }
}

export default BooksStats;