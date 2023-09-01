import FriendRequests from '~/app/(appRoutes)/friends/components/FriendRequests';

const Friends = () => {
  return (
    <>
      <div className='flex min-h-screen flex-col items-center p-24'>
        <h1>Friends</h1>
        <FriendRequests />
      </div>
    </>
  );
};

export default Friends;
