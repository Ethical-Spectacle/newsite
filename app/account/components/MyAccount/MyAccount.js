import ProfileInfo from './ProfileInfo';
import Badges from './Badges';
import MiniEvents from './MiniEvents';
import Opportunities from './Opportunities';
import Certificates from './Certificates';
import Levels from './Levels';

function MyAccount({ userEmail }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className='flex flex-col md:flex-row'>

        <div className="md:flex-1">
          <ProfileInfo userEmail={userEmail} />
          <Levels userEmail={userEmail} />
          <Badges userEmail={userEmail}/>
          <Certificates userEmail={userEmail} />
        </div>

        <div className="md:flex-1">
          <div className="border border-black border-3">
            <MiniEvents />
          </div>
          <Opportunities />
        </div>

      </div>
    </div>
  );
}

export default MyAccount;
