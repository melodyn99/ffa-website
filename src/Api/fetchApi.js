import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class FetchApi extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      hello: null
    };
  }

  componentDidMount() {
    
    fetch('http://52.76.15.224:5000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'slash@guruonline.com.hk',
        password: '123123123'
      })
    })
    .then((res) => res.json())
    .then((responseData) => {
      // 單純只做 log
      this.setState({
        hello: responseData.data.access_token
      });
      console.log(responseData.data.access_token);
    })
    .catch((error) => {
      console.log(error);
    })
    .done();
  }

  render() {
    return (
          <Text>{ this.state.hello }</Text>
    );
  }
}