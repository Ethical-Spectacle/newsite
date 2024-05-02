
function Opportunities() {
  return (
    <div className="bg-slate-900 text-white p-4 md:p-5 md:space-y-5">
      <div>
        <h2>Opportunities</h2>
        <p className='text-white text-xl'>Get involved and join our organization's leadership</p>
      </div>

      <div className="opportunities-grid">
        <div className="opportunity-card">
          <h3>Apply to be a researcher</h3>
          <p>Join a research project or start one of your own</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScSCOT3qqiel1Pf4ejg8nESlWMi4rajNwS-9xtC7fGTDwG0Gw/viewform" target="_blank" rel="noopener noreferrer">Apply Now</a>
        </div>
        <div className="opportunity-card">
          <h3>Guest write for our blog</h3>
          <p>Contribute to our community's knowledge base</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdRVO8jWOb8bF6ZDlL2ZtXl8eupC37fRA-vCZmhM9CI36p_Rg/viewform" target="_blank" rel="noopener noreferrer">Write for Us</a>
        </div>
        <div className="opportunity-card">
          <h3>Host an event</h3>
          <p>Organize an event that brings other passionate members together</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdc4rY7c3oE-Xj02-v_WqRFt3sl7wnlHFYPbELvnMy0mCfITQ/viewform" target="_blank" rel="noopener noreferrer">Host an Event</a>
        </div>
        <div className="opportunity-card">
          <h3>Volunteer at an event</h3>
          <p>Take a larger role in running our community</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSehaKgizEyYAltXo3uJsLHOZJXxeatxVWL1oMpuFZ1aHTxuLw/viewform" target="_blank" rel="noopener noreferrer">Volunteer</a>
        </div>
      </div>
    </div>
  );
}

export default Opportunities;
