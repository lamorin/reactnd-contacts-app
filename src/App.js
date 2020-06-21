import React, { Component } from "react";
import ListContacts from "./ListContacts";
import { getAll, remove } from "./utils/ContactsAPI";

class App extends Component {
  state = { contacts: [] };

  componentDidMount() {
    getAll().then((contacts) => this.setState({ contacts: contacts }));
  }

  removeHandler = (contact) => {
    remove(contact).then(() =>
      getAll().then((contacts) => this.setState({ contacts: contacts }))
    );
  };

  render() {
    return (
      <div>
        <ListContacts
          contacts={this.state.contacts}
          remove={this.removeHandler}
        />
      </div>
    );
  }
}

export default App;
