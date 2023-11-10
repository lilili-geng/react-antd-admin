import React from 'react';
import { LayoutProvider } from './modules/layout'
import { UserProvider } from './modules/user'
import { ThemeProvider } from './modules/theme';

export const Providers = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <ThemeProvider>
      <LayoutProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
};