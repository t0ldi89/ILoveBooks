import React, {Component} from 'react';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import MainBook from "./MainBook";
import UsersBook from "../UsersBook/UsersBook";
import AddNewReadBook from "../UsersBook/AddNewReadBook";
import Statistic from "../UsersBook/Statistic";

class Main extends Component {
    render() {
        return(
            <HashRouter>
                <main>
                    <Switch>
                        <Route exact path='/' component={MainBook} />
                        <Route path ='/user/:userId' component={UsersBook} />
                        <Route path='/user/:userId/books' component={AddNewReadBook}/>
                        <Route path='/user/:userId/books/read' component={Statistic}/>
                    </Switch>
                </main>
            </HashRouter>
        );
    }
}

export default Main;