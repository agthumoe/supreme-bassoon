import { MantineProvider } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../features/auth/Login';
import UserList from '../features/users/UserList';
import UserCreate from '../features/users/UserCreate';
import CustomerList from '../features/customers/CustomerList';
import CustomerCreate from '../features/customers/CustomerCreate';
import ProviderCreate from '../features/providers/ProviderCreate';
import ProviderList from '../features/providers/ProviderList';
import MailList from '../features/mails/MailList';
import MailCreate from '../features/mails/MailCreate';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserCreate />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/new" element={<CustomerCreate />} />
        <Route path="/providers" element={<ProviderList />} />
        <Route path="/providers/new" element={<ProviderCreate />} />
        <Route path="/mails" element={<MailList />} />
        <Route path="/mails/new" element={<MailCreate />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
