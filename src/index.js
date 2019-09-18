import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Website from "./components/website";
import History from "./components/history";
import MostUsed from "./components/mostUsed";
import axios from "axios";

class App extends React.Component {
  state = {
    searchInput: "",
    changeText: "",
    mostUsed: [],
    history: [],
    historyRedirect: false,
    mostUsedRedirect: false,
    tab: [
      {
        url: ""
      }
    ],
    currentTab: 0
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/api/getHistory`).then(res => {
      let fetchHistory = res.data;
      fetchHistory.forEach(e => {
        e.date = new Date(e.date);
      });
      this.setState({
        history: fetchHistory
      });
    });
    axios.get(`http://localhost:5000/api/getMostUsed`).then(res => {
      this.setState({
        mostUsed: res.data
      });
      console.log(typeof this.state.mostUsed[0].frequency);
    });
  }

  handleSubmit = event => {
    this.setState({
      searchInput: this.state.changeText
    });
    if (this.state.changeText === "https://history") {
      event.preventDefault();
      this.setState({
        historyRedirect: true
      });
      return;
    }

    if (this.state.changeText === "https://mostUsed") {
      event.preventDefault();
      this.setState({
        mostUsedRedirect: true
      });
      return;
    }

    axios.post("http://localhost:5000/api/history", {
      name: this.state.changeText,
      date: new Date()
    });

    this.setState({
      historyRedirect: false,
      mostUsedRedirect: false
    });

    let modifyTab = [...this.state.tab];

    modifyTab[this.state.currentTab].url = this.state.changeText;
    this.setState({
      tab: modifyTab
    });

    let newState = [...this.state.mostUsed];
    let newHistory = [
      { name: this.state.changeText, date: new Date() },
      ...this.state.history
    ];
    let flag = 0;

    newState.forEach(element => {
      if (element.name === this.state.changeText) {
        flag = 1;
        element.frequency = element.frequency + 1;
      }
    });

    if (flag === 0) {
      newState.push({ frequency: 1, name: this.state.changeText });
    }
    newState.sort(function(a, b) {
      return b.frequency - a.frequency;
    });
    this.setState({
      mostUsed: newState,
      history: newHistory
    });

    axios.post("http://localhost:5000/api/mostUsed", newState);

    event.preventDefault();
  };

  handleChange = event => {
    this.setState({
      changeText: event.target.value
    });
  };

  reset = () => {
    this.setState({
      historyRedirect: false,
      mostUsedRedirect: true,
      changeText: "https://mostUsed"
    });
  };

  reset_ = () => {
    this.setState({
      historyRedirect: false,
      mostUsedRedirect: false,
      changeText: this.state.tab[this.state.currentTab].url
    });
  };

  changeSearchBar = () => {
    this.setState({
      changeText: "https://history",
      historyRedirect: true,
      mostUsedRedirect: false
    });
  };

  addTab = () => {
    let newTab = [
      ...this.state.tab,
      {
        url: ""
      }
    ];
    this.setState({
      currentTab: this.state.currentTab + 1,
      tab: newTab,
      changeText: "",
      searchInput: ""
    });
  };

  changeTab = index => {
    this.setState({
      changeText: this.state.tab[index].url,
      searchInput: this.state.tab[index].url,
      currentTab: index
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <div className="tabs">
            {this.state.tab.map((e, i) => {
              return (
                <span
                  key={i}
                  className="urls"
                  onClick={() => this.changeTab(i)}
                >
                  {e.url}
                </span>
              );
            })}
            <button onClick={this.addTab}>+</button>
          </div>
          <div className="navigate">
            <Link className="Link" to="/" onClick={this.reset_}>
              Website
            </Link>
            <Link className="Link" to="/mostUsed" onClick={this.reset}>
              Most Used Websites
            </Link>
            <Link className="Link" to="/history" onClick={this.changeSearchBar}>
              Browser History
            </Link>
          </div>
          <div className="searchBar">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.changeText}
                onChange={event => this.handleChange(event)}
                required
              />
              {this.state.historyRedirect && <Redirect to="/history" />}
              {this.state.mostUsedRedirect && <Redirect to="/mostUsed" />}
            </form>
          </div>
          <Route
            path="/"
            exact
            render={() => <Website searchInput={this.state.searchInput} />}
          />
          <Route
            path="/mostUsed"
            render={() => <MostUsed mostUsed={this.state.mostUsed} />}
          />
          <Route
            path="/history"
            render={() => <History history={this.state.history} />}
          />
        </Fragment>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
