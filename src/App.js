import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";

class App extends Component {
  state = {
    contacts: [],
    screen: "list",
  };
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({
        contacts,
      }));
    });
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id;
      }),
    }));

    ContactsAPI.remove(contact);
  };

  createContact = (contact) => {
    ContactsAPI.create(contact).then((contact) =>
      this.setState((currentState) => {
        return { contacts: currentState.contacts.concat([contact]) };
      })
    );
  };

  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        ></Route>

        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact);
                history.push("/");
              }}
            ></CreateContact>
          )}
        ></Route>
      </div>
    );
  }
}

export default App;
