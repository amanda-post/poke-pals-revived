import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '~/components/ui/DataTable';

export type Message = {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  sentAt: string;
};

const columns: ColumnDef<Message>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];

const data = [
  {
    id: '1',
    content: 'Hello World',
    senderId: '1',
    recipientId: '2',
    sentAt: '2021-10-10',
  },
  {
    id: '2',
    content: 'Hello World',
    senderId: '1',
    recipientId: '2',
    sentAt: '2021-10-10',
  },
];

const MessagesTable: React.FC = () => {
  return <DataTable columns={columns} data={data} />;
};

export default MessagesTable;
