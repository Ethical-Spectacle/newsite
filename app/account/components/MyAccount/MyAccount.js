import ProfileInfo from './ProfileInfo/ProfileInfo';
import Badges from './Badges/Badges';
import MiniEvents from './MiniEvents/MiniEvents';
import Opportunities from './Opportunities/Opportunities';
import Certificates from './Certificates/Certificates';
import './MyAccount.css';

function MyAccount({ userEmail }) {
  return (
    <div className="my-account-container">
      <div className="user-details">
        <ProfileInfo userEmail={userEmail} />
        <Certificates userEmail={userEmail} />
        <Badges userEmail={userEmail}/>
      </div>
      <div className='events'>
        <MiniEvents />
        <Opportunities />
      </div>
    </div>
  );
}

export default MyAccount;