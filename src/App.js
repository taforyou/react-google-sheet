import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import config from "./config";
import { load } from "./spreadsheet";

class App extends Component {
  state = {
    stocks: [],
    isLoading: true
  };

  componentDidMount() {
    // 1. Load the JavaScript client library.
    window.gapi.load("client", this.initClient);
  }

  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        // 3. Initialize and make the API request.
        load(this.onLoad);
      });
  };

  onLoad = (data, error) => {
    if (data) {
      // console.log(data.stocks[0].name);
      // console.log(data);
      this.setState({ isLoading: false });
      this.setState({ stocks: data.stocks });
      //console.log(data);
      //console.log(this.state.stocks);
      //console.log(this.state.stocks.stocks[0].name);
    } else {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
            {!this.state.isLoading &&
              this.state.stocks.map(stock => (
                <p style={{ color: "green" }}>{stock.name}</p>
              ))}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
