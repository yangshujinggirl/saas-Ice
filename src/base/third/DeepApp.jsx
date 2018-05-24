import createDeepstream from 'deepstream.io-client-js';
import React, { Component } from 'react';
import { Notice, Feedback } from "@icedesign/base";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // Connect to deepstream
        this.ds = createDeepstream('ws://deepstream-staging.pingchang666.com');
        // Login
        this.client = this.ds.login();

        this.client.event.subscribe('publish-alert', data => {
            console.log('publish-alert', data);
            
            this.setHtml(data);

        })

        this.client.on('error', (error, event, topic) => {
            console.log(error, event, topic);
        });
    }

    setHtml(data){
    	const container = document.createElement('div');
    	container.innerText = data.message;
    	container.className = 'pch-notice';
    	document.body.appendChild(container);

    	setTimeout(() => {
    		document.body.removeChild(container);
    	}, data.delay || 30000);

    }

    render() {
        return (
        	<div className="">
            <Notice title="title" type="warning">
                Content Content Content Content
            </Notice>
            </div>
        )

    }
}

export default App;
