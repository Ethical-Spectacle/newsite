import ProfileInfo from './ProfileInfo';
import Badges from './Badges';
import MiniEvents from './MiniEvents';
import Tasks from './Tasks';
import Certificates from './Certificates';
import Levels from './Levels';
import CreativeCollectives from './CreativeCollectives';

function MyAccount({ userEmail }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className='flex flex-col md:flex-row'>

        <div className="md:flex-1">
          <ProfileInfo userEmail={userEmail} />
          <Levels userEmail={userEmail} />
          <Tasks userEmail={userEmail} />
          <CreativeCollectives userEmail={userEmail}/>
        </div>

        <div className="md:flex-1">
          <div className="border border-black border-3">
            <MiniEvents />
          </div>
          <Badges userEmail={userEmail}/>
          <Certificates userEmail={userEmail} />
        </div>

      </div>
    </div>
  );
}

export default MyAccount;
