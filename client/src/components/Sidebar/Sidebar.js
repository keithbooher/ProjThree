import React, { Component } from 'react';
import List from "../List/List";
import UnorderedList from "../List/UnorderedList";
import "./Sidebar.css";
class Sidebar extends Component {

    render(){
        return(
            <div class = "sideBar">
                <h5 className="sidebarTitle">Explore the Gutter</h5>
                <UnorderedList>
                    <List/>
                    <List/>
                    <List/>
                </UnorderedList>
            </div>
        );
    }
}


export default Sidebar;