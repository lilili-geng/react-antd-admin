import { LayoutProvider } from './modules/layout';
import { UserProvider } from './modules/user';
export const Providers = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <LayoutProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </LayoutProvider>
  );

};
