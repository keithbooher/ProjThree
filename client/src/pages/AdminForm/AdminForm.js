import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";

import Header from '../../components/Navs/Header';
import { Form, Input, FormBtn, FormGroup, Label } from "../../components/Form";
import {Row, Col} from "../../components/Grid"
import SideBar from "../../components/Sidebar/Sidebar";



class Admin extends Component {
    state = {
        amount: 0,
        products: [],
        user: {},
        borders: ['dotted',
            'dashed',
            'solid',
            'double',
            'groove',
            'ridge',
            'inset' ,
            'outset',
            'none',
            'hidden'],
        borderRadius: [10,20,30,40,50,60,70,80,90],
        borderColor: '',
        backgroundImage:'',
        textColor:'', 
        backGroundColor:'',
    }


    loadCurrentUser = () => {
        fetch("/api/current_user")
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result', result)
            this.setState({
                isLoaded: true,
                user: result
            });
            this.checkUser();

        console.log("AYEEEEEEEE", this.state.user)            

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

    componentDidMount() {
        console.log("COMPONENT MOUNTED")
        this.props.fetchUser();
        this.loadCurrentUser();     
        console.log("user", this.state.user)   

    }

    checkUser() {
        // console.log("test", this.state.user)
        if (this.state.user.admin === true) {
            console.log("admin")
            return true
        } else {
            console.log("nonAdmin")   
            return false         
        }
    }

    changeUserStatus = () => {
        console.log("STATEEEEEEEEE", this.state.user)
        const currentUser = this.state.user._id
        // const boolean = true
        API.changeUser(currentUser)
            .then(console.log("success"))
            .catch(err => console.log(err));
    }

    // Function to handle form input
    handleInputChange = event => {
        let { name, value } = event.target;
        this.setState({[name] : value})
    };

    // Function to handle form submit
    handleFormSubmit = event => {
        event.preventDefault();
        let { category } = this.state;
        let query = { category }
        this.getArticles(query)
    }

    render() {
        return (
            <div>
                <Header />  
                <Row>
                    <Col size="sm-2 offset-'sm-11">
                        <SideBar user={this.state.user}/>
                    </Col>
                </Row>              
                <div className="container">
                    <Form>
                        <FormGroup>
                            <Label htmlFor="category"> What do you sell in your shop? </Label>
                            <Input 
                                onChange={this.handleInputChange}
                                type="filter"
                                name="category"
                                value={this.state.category}
                                placeholder="Catergory of Art"
                            />
                        </FormGroup>
                    </Form>
                    <button onClick={() => this.changeUserStatus()}>Become an Admin</button>


                    <button><a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_DW5XNKTvUAeODU0hK38cYryqiz6QGJFF&scope=read_write">Connect with Stripe</a></button>
                </div>
            </div>
        );
    };
};


export default connect(null, actions) (Admin);