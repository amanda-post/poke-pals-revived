import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '~/components/DataTable';

export type Message = {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  sentAt: string;
};

export const columns: ColumnDef<Message>[] = [
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

const Messages = () => {
  return (
    <>
      <div className='flex min-h-screen flex-col items-center p-24'>
        <h1>Messages</h1>
        <p>This is the Messages page</p>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Messages;
