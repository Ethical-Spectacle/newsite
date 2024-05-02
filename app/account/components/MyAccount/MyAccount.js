import ProfileInfo from './ProfileInfo';
import Badges from './Badges';
import MiniEvents from './MiniEvents';
import Opportunities from './Opportunities';
import Certificates from './Certificates';
import './MyAccount.css';

function MyAccount({ userEmail }) {
  return (
    <div className="outside-container">
      <div className='boxed-container flex-col space-y-10 md:space-y-0 md:flex-row md:space-x-28'>

        <div className="flex-1 space-y-5">
          <ProfileInfo userEmail={userEmail} />
          <Certificates userEmail={userEmail} />
          <Badges userEmail={userEmail}/>
        </div>

        <div className="flex-1 space-y-5">
          <MiniEvents />
          <Opportunities />
        </div>

      </div>
    </div>
  );
}

export default MyAccount;