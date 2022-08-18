import React from 'react';
import PropTypes from 'prop-types';

export type UserDataProps = {
  email: string;
  name: string;
  imageUrl: string;
  googleId: string;
};

export const UserDataContext = React.createContext<Partial<UserDataProps>>({});

export const UserDataProvider = (props: {
  children: React.ReactNode;
  UserDataProps: any;
}) => {
  return (
    <UserDataContext.Provider value={props.UserDataProps}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export const UserDataConsumer = UserDataContext.Consumer;
export default UserDataContext;

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
