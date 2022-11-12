import './About.scss';

const About = () => {
  return (
    <div className='about-wrapper'>
      <div>App Version: 0.3</div>
      <div>
      Git Repository: <a href='https://github.com/KarthikKumarDev/my-profile' target="_blank"> My Profile Repo </a>
      </div>
      <div>
      CI/CD Pipeline: <a href='https://app.travis-ci.com/github/KarthikKumarDev/my-profile' target="_blank"> Travis Build </a>
      </div>
    </div>
  );
};

export default About;
