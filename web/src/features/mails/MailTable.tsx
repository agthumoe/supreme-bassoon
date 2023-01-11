import { useState } from 'react';
import { createStyles, Table, ScrollArea } from '@mantine/core';

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

interface MailTableProps {
  data: { id: number, status: string; mailUuid: string; retriedCount: number; fromName: string; fromEmail: string; toName: string; toEmail: string; subject: string }[];
}

export function MailTable({ data }: MailTableProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.status}</td>
      <td>{row.mailUuid}</td>
      <td>{row.retriedCount}</td>
      <td>{row.fromName}</td>
      <td>{row.fromEmail}</td>
      <td>{row.toName}</td>
      <td>{row.toEmail}</td>
      <td>{row.subject}</td>
    </tr>
  ));

  return (
    <ScrollArea sx={{ height: 500 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Mail Uuid</th>
            <th>Retried count</th>
            <th>From Name</th>
            <th>From Email</th>
            <th>To Name</th>
            <th>To Email</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}