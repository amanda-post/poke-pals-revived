import CharacterCreationForm from '~/app/(appRoutes)/creation/components/CharacterCreationForm';

const CharacterCreation: React.FC = () => {
  return (
    <div className='flex min-h-screen flex-col items-center p-24'>
      <h1>Create Your Profile!</h1>
      <CharacterCreationForm />
    </div>
  );
};

export default CharacterCreation;
