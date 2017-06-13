import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
        apiKey: "AIzaSyBTyR3W0szZdO2cSMilGJggK0y7ua-bc_4",
        authDomain: "auth-ec379.firebaseapp.com",
        databaseURL: "https://auth-ec379.firebaseio.com",
        projectId: "auth-ec379",
        storageBucket: "auth-ec379.appspot.com",
        messagingSenderId: "496150278357"
      })

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      })
  }

  renderContent() {
      switch (this.state.loggedIn) {
        case true:
          return (
            <Card>
              <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
              </CardSection>
            </Card>
          )
        case false:
          return <LoginForm />
        default:
          return <Spinner size="large" />
      }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    )
  }
}

export default App;
