import createDeepstream from 'deepstream.io-client-js';
import React, { Component } from 'react';

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
        })

        this.client.on('error', (error, event, topic) => {
            console.log(error, event, topic);
        });

    }
}

export default App;