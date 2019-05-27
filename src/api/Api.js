import React, { Component } from 'react';
import md5 from "md5";

const PUBLIC_KEY = '5310aae645d4f3b700b0db86b16ef8e9' // {YOU KEY HERE}
const PRIVATE_KEY = '6b82b340d94200318d2aa15aff961d991f480a3a'

class Api extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
        };
    }
    
    componentDidMount() {
        const ts = new Date().getTime()
        const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)

        fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
            .then(response => {
                return response.json();
              })
              .then(d => {
                this.setState({ clouds: d });
                // console.log("state", this.state.clouds)
              })
              .catch(error => console.log(error))

        // console.log('componentDidMount');
    }
    
    render() {
        const records = this.state.clouds;
        // console.log(records);
        if (records) {
            return (
                <div className="popup" >
                    <dl>
                        { records.data.results.map((record ,index) =>
                            <div key={index}>
                                <dt>{record.name}</dt><dd>{record.modified}</dd>
                                <div className="sep-0"></div>
                            </div>
                        )}
                    </dl>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Api;
