import React, { Component } from "react";
import { connect } from "react-redux";

import List from "../List/List";
import UnorderedList from "../List/UnorderedList";
import "./Sidebar.css";
// import Anchor from "../Anchor/Anchor";
import AdminList from "../List/AdminList";
import { Link } from "react-router-dom";

class SidebarMobile extends Component {


    state = {
        user: {}
    };

    componentDidMount() {
        this.loadCurrentUser();
    }

    loggedIn = () => {
        if (!this.props.auth) {
            // console.log("not logged in")
            return false;
        } else {
            // console.log("logged in")
            return true;
        }
    };

    adminStatus = () => {
        if (this.loggedIn() === true) {
            if (this.props.auth.admin === false || null) {
                // console.log("not an admin")
                return false;
            } else {
                // console.log("you are an admin")
                return true;
            }
        } else {
            return false;
        }
    };

    loadCurrentUser = () => {
        this.setState({
            isLoaded: true,
            user: this.props.auth
        });
    };

    render() {
        return (
            <div className="sideBarMobile" id={this.props.id}>
                <h5 className="sideBarTitle">Explore the Gutter</h5>
                <UnorderedList>
                    <List>
                        <Link to="/new" className="sideBarLink">
                            New Art
            </Link>
                    </List>
                    <List>
                        <Link to="/artists" className="sideBarLink">
                            View All Artists
            </Link>
                    </List>
                    <List>
                        <Link to="/mostvisited" className="sideBarLink">
                            View Popular Artists
            </Link>
                    </List>
                    {this.loggedIn() ?
                        <List>
                            <Link to="/following" className="sideBarLink">
                                Artists You Follow
            </Link>
                        </List> : " "}

                    {this.loggedIn() ?
                        !this.adminStatus() ?
                            <List className="sideBarLink">
                                <Link to="/adminform">
                                    Become Vendor
                        </Link>
                            </List> : " " : " "}


                    {this.adminStatus() ? <AdminList /> : ""}
                    {/* <List className="sideBarLink">
            <Link to="/faq">FAQ</Link>
          </List>
          <List className="sideBarLink">
            <Link to="/contactUs">Contact Us</Link>
          </List> */}
                </UnorderedList>
            </div>
        );
    }
}

// Telling this component if we are logged in or not and what to show occordingly
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(SidebarMobile);
