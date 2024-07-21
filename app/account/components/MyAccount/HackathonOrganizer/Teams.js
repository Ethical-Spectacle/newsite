import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaGlobe, FaGithub, FaLinkedin } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const { API_URL_PROD } = require('../../../../config/config');

const ItemTypes = {
  MEMBER: 'member',
  APPLICANT: 'applicant',
};

const skillIcons = {
  graphic_design: '🎨',
  frontend: '📱',
  backend: '🖥️',
  ai_ml_engineer: '🤖',
  management: '🕶',
};

const renderSkills = (member) => (
  <div className="flex space-x-1 rounded-lg">
    {Object.keys(skillIcons).map(skill => (
      member[skill] ? (
        <Tippy key={skill} content={skill.replace('_', ' ')}>
          <span className="text-2xl justify-end">{skillIcons[skill]}</span>
        </Tippy>
      ) : null
    ))}
  </div>
);

const Member = ({ member, index, moveMember }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.MEMBER,
    item: { member, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.25 : 1 }}
      className="p-2 mb-2 bg-white rounded shadow-sm"
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            src={`data:image/jpeg;base64,${member.profile_pic_low_quality_base64}`}
            alt={`${member.fname} ${member.lname}`}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <div className="font-bold">{`${member.fname} ${member.lname}`}</div>
            <div className="flex space-x-2 ml-auto">
              {member.website && <a href={member.website} className="text-lg text-gray-500 hover:text-pink-400"><FaGlobe /></a>}
              {member.github && <a href={member.github} className="text-lg text-gray-500 hover:text-gray-700"><FaGithub /></a>}
              {member.linkedin && <a href={member.linkedin} className="text-lg text-gray-500 hover:text-gray-700"><FaLinkedin /></a>}
            </div>
          </div>
        </div>
        {renderSkills(member)}
      </div>
    </div>
  );
};

const Applicant = ({ applicant, index, assignToTeam }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.APPLICANT,
    item: { applicant, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="p-2 mb-2 bg-white rounded shadow-sm"
    >
      <div className="flex items-center">
        <img
          src={`data:image/jpeg;base64,${applicant.profile_pic_low_quality_base64}`}
          alt={`${applicant.fname} ${applicant.lname}`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <div className="font-bold">{`${applicant.fname} ${applicant.lname}`}</div>
        </div>
        <div className="flex space-x-2 ml-auto">
          {applicant.website && <a href={applicant.website} className="text-xl text-gray-500 hover:text-pink-400"><FaGlobe /></a>}
          {applicant.github && <a href={applicant.github} className="text-xl text-gray-500 hover:text-gray-700"><FaGithub /></a>}
          {applicant.linkedin && <a href={applicant.linkedin} className="text-xl text-gray-500 hover:text-gray-700"><FaLinkedin /></a>}
        </div>
      </div>
      {renderSkills(applicant)}
    </div>
  );
};

const UnassignedApplicants = ({ applicants, assignToTeam }) => {
  return (
    <div className="m-4 p-4 bg-gray-100 rounded shadow-md w-80">
      <h3 className="text-lg font-bold mb-2">Unassigned Applicants</h3>
      {applicants.map((applicant, index) => (
        <Applicant key={applicant.user_id} applicant={applicant} index={index} assignToTeam={assignToTeam} />
      ))}
    </div>
  );
};

const Team = ({ team, moveMember, deleteTeam }) => {
  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.MEMBER, ItemTypes.APPLICANT],
    drop: (item, monitor) => {
      const draggedMember = item.member || item.applicant;
      const targetTeamId = team.team_id;
      moveMember(draggedMember, targetTeamId);
    },
  }));

  return (
    <div
      ref={drop}
      className="m-4 p-4 bg-gray-100 rounded shadow-md w-80 relative"
    >
      <button
        onClick={() => deleteTeam(team.team_id)}
        className="absolute top-2 right-2 bg-red-500 text-white p-1 px-3 mr-2 rounded"
      >
        Delete
      </button>
      <h3 className="text-lg font-bold mb-2">{team.team_name}</h3>
      {team.members.map((member, index) => (
        <Member key={member.user_id} member={member} index={index} moveMember={moveMember} />
      ))}
    </div>
  );
};

const Teams = ({ userEmail, hackathonId, applications, fetchApplications }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/get_teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hackathon_id: hackathonId }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [hackathonId]);

  const moveMember = async (member, targetTeamId) => {
    const applicationId = member.application_id;
    const currentTeamId = member.team_id;

    try {
      const response = await fetch(`${API_URL_PROD}/update_applicant_team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ application_id: applicationId, team_id: targetTeamId }),
      });
      if (!response.ok) {
        throw new Error('Failed to update applicant team');
      }

      // Refresh the teams and applications after a successful update
      fetchTeams();
      fetchApplications();
    } catch (error) {
      setError(error.message);
    }
  };

  const createNewTeam = async () => {
    if (!newTeamName) return;

    try {
      const response = await fetch(`${API_URL_PROD}/new_team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hackathon_id: hackathonId, team_name: newTeamName }),
      });
      if (!response.ok) {
        throw new Error('Failed to create team');
      }

      // Clear the input and refresh teams
      setNewTeamName('');
      fetchTeams();
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTeam = async (teamId) => {
    try {
      const response = await fetch(`${API_URL_PROD}/delete_team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_id: teamId }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete team');
      }

      // Refresh the teams after a successful deletion
      fetchTeams();
    } catch (error) {
      setError(error.message);
    }
  };

  // Filter unassigned applicants
  const unassignedApplicants = applications.filter(applicant => !applicant.team_id && applicant.status === 'accepted');

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="pb-2 md:pb-5 border-b-2 border-gray-300">
    <h2 className="pt-4 pb-1 text-3xl">Teams:</h2>
    <div className="flex flex-wrap justify-center">
      <UnassignedApplicants applicants={unassignedApplicants} assignToTeam={moveMember} />
      <div className="m-4 p-4 bg-gray-100 rounded shadow-md w-80">
        <h3 className="text-lg font-bold mb-2">Create New Team</h3>
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Team Name"
          className="p-2 mb-2 border rounded w-full"
        />
        <button onClick={createNewTeam} className="bg-blue-500 text-white p-2 rounded w-full">
          Create
        </button>
      </div>
      {teams.map((team) => (
        <Team key={team.team_id} team={team} moveMember={moveMember} deleteTeam={deleteTeam} />
      ))}
    </div>
    </div>
  );
};

export default Teams;
