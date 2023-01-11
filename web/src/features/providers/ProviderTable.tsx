import { useState } from 'react';
import { createStyles, Table, ScrollArea, Button } from '@mantine/core';
import useProviderStore from './providerStore';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
        }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface ProviderTableProps {
  data: { id: number, name: string; host: string; port: number; secure: boolean; username: string; searchIndex: number }[];
}

export function ProviderTable({ data }: ProviderTableProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const { deleteProvider, findProvider } = useProviderStore((state) => ({ deleteProvider: state.delete, findProvider: state.find }));

  const rows = data.map((row) => (
    <tr key={row.name}>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.host}</td>
      <td>{row.port}</td>
      <td>{row.secure}</td>
      <td>{row.username}</td>
      <td>{row.searchIndex}</td>
      <td>
        <Button.Group>
          <Button onClick={async () => {
            await deleteProvider(row.id);
            await findProvider();
          }}>Delete</Button>
          <Button>Edit</Button>
        </Button.Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea sx={{ height: 500 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Host</th>
            <th>Port</th>
            <th>Secure</th>
            <th>Username</th>
            <th>Search Index</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}