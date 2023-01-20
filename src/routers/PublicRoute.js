import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PublicRoute = ({
  isAuthenticated,
  component: Compoent,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      !isAuthenticated ? (
        <div>
          <Compoent {...props} />
        </div>
      ) : (
        <Redirect to='/dashboard' />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PublicRoute);
