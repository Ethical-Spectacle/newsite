import ProfileInfo from './ProfileInfo/ProfileInfo';
import Badges from './Badges/Badges';
import MiniEvents from './MiniEvents/MiniEvents';
import Opportunities from './Opportunities/Opportunities';
import Certificates from './Certificates/Certificates';

function MyAccount({ userEmail }) {
  return (
    <div className="outside-container">
      <div className='boxed-container flex-col md:flex-row md:space-x-28'>

        <div className="flex-1 space-y-5">
          <ProfileInfo userEmail={userEmail} />
          <Certificates userEmail={userEmail} />
          <Badges userEmail={userEmail}/>
        </div>

        <div className="flex-1">
          <MiniEvents />
          <Opportunities />
        </div>

      </div>
    </div>
  );
}

export default MyAccount;