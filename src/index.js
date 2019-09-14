import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import Form from './components/froms';
import {Provider} from 'react-redux';
import reducer from './components';
import { createStore } from 'redux'

import './styles.css';
const App = () =>{
    return (
        <Fragment>
            <div className = "tabs">
                Hello
            </div>
            <div className = "searchBar">
                World
                <Form />
            </div>
            <div className = "website">
            <iframe className = "iframe" title="myFrame" src="https://www.oola.com/"></iframe>
            </div>

        </Fragment>
    )
}

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}><App/>
    </Provider>,
    document.querySelector('#root')
);
