import { useState } from 'react';
import { createStyles, Table, ScrollArea, Button } from '@mantine/core';
import useCustomerStore from './customerStore';

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

interface CustomerTableProps {
  data: { id: number, name: string; email: string }[];
}

export function CustomerTable({ data }: CustomerTableProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const { deleteCustomer, findCustomer } = useCustomerStore((state) => ({ deleteCustomer: state.delete, findCustomer: state.find }));

  const rows = data.map((row) => (
    <tr key={row.name}>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>
        <Button.Group>
          <Button onClick={async () => {
            await deleteCustomer(row.id);
            await findCustomer();
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
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}