import React from 'react';
import NavBar from '../nav-bar/nav_bar.jsx';
import UsersList from '../sidebar/users_list.jsx';
import currentUserStore from '../../stores/current_user_store.js';

class UserHomePage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this._ensureLoggedIn = this._ensureLoggedIn.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    this._ensureLoggedIn();
  }

  componentDidMount () {
    currentUserStore.addChangeListener(this._ensureLoggedIn);
  }

  componentWillUnmount () {
    currentUserStore.removeChangeListener(this._ensureLoggedIn);
  }

  _ensureLoggedIn () {
    if (!currentUserStore.isLoggedIn()) { this.context.router.push('/'); }
  }

  render () {
    return (
        <div className="user-home-page">
          <UsersList />
        </div>
     );
  }
}

export default UserHomePage;
