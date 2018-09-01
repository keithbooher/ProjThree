import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";
import {Row, Col} from "../../components/Grid"
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import SideBar from "../../components/Sidebar/Sidebar";

class Artists extends Component {
    state = {
        amount: 0,
        products: [],
        user: {},
        users: [],
        
    }

    componentDidMount() {
        this.props.fetchUser();
        this.loadUsers();        
        this.loadCurrentUser();     
    }


    loadUsers = () => {
        console.log('test')
        API.getUser()
            .then(res => this.setState({ users: res.body }))
            .then(console.log(this.state.users))
            .catch(err => console.log(err));
    };

    loadCurrentUser = () => {
        fetch("/api/current_user")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    user: result
                });

                console.log('result', result)
                let currentUser=this.state.user
                API.createUser(currentUser)
                .then( console.log("success"))
                .catch(err => console.log(err));                         
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
    };



    render() {
        return (
            <div>
                {this.state.user.admin ? <AdminHeader amount={this.state.amount}/> : <Header key="1" amount={this.state.amount}/>}
                <Row>
                    <Col size="sm-2 offset-'sm-11">
                        <SideBar user={this.state.user}/>
                    </Col>
                </Row> 
                <div className="container">
                 
                </div>
            </div>
        );
    };
};


export default connect(null, actions) (Artists);