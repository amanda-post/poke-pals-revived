import FriendRequests from '~/app/(appRoutes)/friends/components/FriendRequests';
import Friends from '~/app/(appRoutes)/friends/components/Friends';
import { Column, Row } from '~/components/Flex';

const FriendsPage = () => {
  return (
    <>
      <div className='flex min-h-screen flex-col items-center p-18 w-full'>
        <h1>Friends</h1>
        <Row>
          <Column>
            <Friends />
          </Column>

          <Column>
            <FriendRequests />
          </Column>
        </Row>
      </div>
    </>
  );
};

export default FriendsPage;
