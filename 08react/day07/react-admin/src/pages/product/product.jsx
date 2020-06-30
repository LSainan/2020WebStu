import React, { Component } from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'


import ProductHome from './home'
import ProducAddUpdate from './add-update'
import ProductDetail from './detail'


export default class Product extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/product' component={ProductHome}></Route>
                <Route path='/product/addUpdate' component={ProducAddUpdate}></Route>
                <Route path='/product/detail' component={ProductDetail}></Route>
                <Redirect to='/product'></Redirect>
            </Switch>

        )
    }
}