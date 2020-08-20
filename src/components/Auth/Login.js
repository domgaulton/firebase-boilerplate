import React, { Component } from 'react';
import { ContextUserConsumer } from "../../context/ContextFirebaseUserProvider";
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFormShowing: true,
      resetPassword: false,
      email: '',
      password: '',
    };
  }

  toggleLoginCreateUser = () => {
    this.setState({
      loginFormShowing: !this.state.loginFormShowing
    })
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  resetPassword = e => {
    this.setState({
      resetPassword: !this.state.resetPassword
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.resetPassword) {
      this.props.resetPassword(this.state.email);
      this.setState({
        email: '',
        password: '',
        resetPassword: false,
      })
    } else {
      this.props.loginUser(this.state.email, this.state.password);
      this.setState({
        email: '',
        password: '',
      })
    }
  }


  render(){
    return this.state.loginFormShowing ? (
      <div className="container">
        <h1>{!this.state.resetPassword ? 'Login' : 'Reset Password'}</h1>
         <form
          onSubmit={e => this.handleSubmit(e)}
          className="auth-form"
        >
          <input
            className="auth-form__item auth-form__item--text-input"
            type='email'
            placeholder='Email'
            name="email"
            value={this.state.email}
            onChange={e => this.handleInputChange(e)}
          />
          {!this.state.resetPassword ? (
            <input
              className="auth-form__item auth-form__item--text-input"
              type='password'
              placeholder='Password'
              name="password"
              value={this.state.password}
              onChange={e => this.handleInputChange(e)}
            />
          ) : null }
          <input
            className="auth-form__item auth-form__item--submit"
            type='submit'
            value={!this.state.resetPassword ? 'Login' : 'Reset Password'}
            disabled={this.state.email === ''}
          />
        </form>
        <p onClick={this.toggleLoginCreateUser}>No login? Register here</p>
        <p onClick={this.resetPassword}>{this.state.resetPassword ? 'Back to Login' : 'Forgot Password - Reset Here'}</p>
      </div>
    ) : (
      <Redirect push to="/register" />
    );
  }
}

const LoginUpdate = (props) => (
  <ContextUserConsumer>
    {({ userLoggedIn, userId, setUserData, loginUser, createAuthUser, resetPassword }) => (
      <Login
        // remember to spread the existing props otherwise you lose any new ones e.g. 'something' that don't come from the provider
        {...props}
        userLoggedIn={userLoggedIn}
        userId={userId}
        setUserData={setUserData}
        loginUser={loginUser}
        createAuthUser={createAuthUser}
        resetPassword={resetPassword}
      />
    )}
  </ContextUserConsumer>
);

export default withRouter(LoginUpdate);