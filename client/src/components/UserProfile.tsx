import User from '../assets/User';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <div className="user-profile-avatar">
        <User />
      </div>
      
      <div className="user-profile-info">
        <div className="user-profile-name">Jon Doe</div>
        <div className="user-profile-role">Admin account</div>
      </div>
    </div>
  );
};

export default UserProfile; 