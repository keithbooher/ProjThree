import React, { Component } from 'react';

import List from "../List/List";
import Anchor from "../Anchor/Anchor"


class AdminList extends Component {
    render(){
        return(
            <div>
                <List>
                    <Anchor 
                        text="Customize Your Page"
                        href="/customize"
                    />                   
                </List>
                <List>
                    <Anchor 
                        text="Post New Art"
                        href="/post"
                    />                   
                </List>
                <List>
                    <Anchor 
                        text="Delete Products"
                        href="/delete"
                    />                   
                </List> 
            </div>
        )
    }
}

export default (AdminList);
