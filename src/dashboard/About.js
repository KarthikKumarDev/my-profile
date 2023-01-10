import './About.scss';

const About = () => {
  return (
    <div className='about-wrapper'>
      <div>App Version: 0.5</div>
      <div>
      Git Repository: <a href='https://github.com/KarthikKumarDev/my-profile' target="_blank" rel="noopener noreferrer"> My Profile Repo </a>
      </div>
      <div>
      CI/CD Pipeline: <a href='https://app.travis-ci.com/github/KarthikKumarDev/my-profile' target="_blank" rel="noopener noreferrer"> Travis Build </a>
      </div>
    </div>
  );
};

export default About;
