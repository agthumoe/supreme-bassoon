import { AppShell } from "@mantine/core";
import { Sidebar } from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <AppShell
      padding="md"
      navbar={<Sidebar />}
      // header={<Header height={60} p="xs">Welcome to Supreme Bassoon</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {children}
    </AppShell>
  );
}