import React, { useState } from 'react';
import { FaTrashAlt, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import "react-toggle/style.css";
import ResearcherApplications from './ResearcherApplications';
import ProjectTeam from './ProjectTeam';

const { API_URL_PROD } = require('../../../../config/config');

const EditResearchProjectForm = ({ project, userEmail, fetchProjects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ ...project });
  const [newTimelineItem, setNewTimelineItem] = useState({
    title: '',
    description: '',
    date: ''
  });
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    url: ''
  });
  const [newPaper, setNewPaper] = useState({
    title: '',
    link: '',
    credits: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleBlur = async (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    try {
      const res = await fetch(`${API_URL_PROD}/update_project_field`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: project.id, field: name, value: fieldValue }),
      });

      if (!res.ok) {
        alert('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleAddTimelineItem = () => {
    const updatedTimeline = [...formData.timeline_list, newTimelineItem];
    setFormData({
      ...formData,
      timeline_list: updatedTimeline,
    });
    setNewTimelineItem({ title: '', description: '', date: '' });
    updateField('timeline_list', updatedTimeline);
  };

  const handleRemoveTimelineItem = (index) => {
    const updatedTimeline = formData.timeline_list.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      timeline_list: updatedTimeline,
    });
    updateField('timeline_list', updatedTimeline);
  };

  const handleAddBookmark = () => {
    const updatedBookmarks = [...formData.rtab_bookmarks_list, newBookmark];
    setFormData({
      ...formData,
      rtab_bookmarks_list: updatedBookmarks,
    });
    setNewBookmark({ title: '', url: '' });
    updateField('rtab_bookmarks_list', updatedBookmarks);
  };

  const handleRemoveBookmark = (index) => {
    const updatedBookmarks = formData.rtab_bookmarks_list.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      rtab_bookmarks_list: updatedBookmarks,
    });
    updateField('rtab_bookmarks_list', updatedBookmarks);
  };

  const handleAddPaper = () => {
    const updatedPapers = [...formData.papers_list, newPaper];
    setFormData({
      ...formData,
      papers_list: updatedPapers,
    });
    setNewPaper({ title: '', link: '', credits: '' });
    updateField('papers_list', updatedPapers);
  };

  const handleRemovePaper = (index) => {
    const updatedPapers = formData.papers_list.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      papers_list: updatedPapers,
    });
    updateField('papers_list', updatedPapers);
  };

  const updateField = async (field, value) => {
    try {
      const res = await fetch(`${API_URL_PROD}/update_project_field`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: project.id, field, value: JSON.stringify(value) }),
      });

      if (!res.ok) {
        alert('Failed to update field');
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const handleToggleExpand = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mb-4">
      <div className="p-3 md:p-6 mb-4 bg-white shadow-md rounded-lg">
        <div className="grid grid-cols-3 items-center justify-between mb-4">
          <div className="col-span-3 flex">
            <button
              className="my-auto items-center mr-2"
              onClick={handleToggleExpand}
            >
              {isOpen ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
            </button>
            <h3 className="text-2xl md:text-xl font-semibold">{project.title}</h3>
          </div>
          <p className="col-span-3 mt-2">
            Status: {project.status}
          </p>
        </div>
        {isOpen && (
          <div>
            {project.status === 'declined' && (
              <div>
                <h2 className="text-2xl text-black">{project.title}</h2>
                <p>{project.description}</p>
                <p className="mt-2 text-red-600">Status: {project.status}</p>
              </div>
            )}
            {project.status === 'pending' && (
              <form>
                <div className="py-5 md:py-8 border-b-2 border-t-2 border-grey-500">
                  <label className="text-2xl font-bold">Project Details</label>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 mt-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 mt-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full h-48 px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 mt-2">Proposal Link</label>
                    <input
                      type="text"
                      name="proposal_link"
                      value={formData.proposal_link}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <div className="py-5 md:py-8 border-b-2 border-grey-500">
                  <label className="block text-2xl text-gray-700 font-bold mb-2">Timeline Events List</label>
                  <div className="space-y-2">
                    {formData.timeline_list.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                        <div className="pl-2">
                          <div className="font-bold">{item.title}</div>
                          <div className="text-sm text-gray-600">{item.date}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => handleRemoveTimelineItem(index)}
                        >
                          <FaTrashAlt className="mr-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      name="title"
                      value={newTimelineItem.title}
                      onChange={(e) => setNewTimelineItem({ ...newTimelineItem, title: e.target.value })}
                      placeholder="Event Title"
                      className="w-full px-3 py-2 mb-1 border rounded"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        name="date"
                        value={newTimelineItem.date}
                        onChange={(e) => setNewTimelineItem({ ...newTimelineItem, date: e.target.value })}
                        className="w-full px-3 py-2 mb-2 border rounded"
                      />
                      <input
                        type="text"
                        name="description"
                        value={newTimelineItem.description}
                        onChange={(e) => setNewTimelineItem({ ...newTimelineItem, description: e.target.value })}
                        placeholder="Event Description"
                        className="w-full px-3 py-2 mb-2 border rounded"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-green-500 text-white px-4 py-2 rounded w-full"
                      onClick={handleAddTimelineItem}
                    >
                      Add Event
                    </button>
                  </div>
                </div>
              </form>
            )}
            {project.status === 'accepted' && (
              <>
                <form>
                  <div className="py-5 md:py-8 border-b-2 border-t-2 border-grey-500">
                    <label className="text-2xl font-bold">Public Info</label>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full h-48 px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Project Repository Link</label>
                      <input
                        type="text"
                        name="project_repo_link"
                        value={formData.project_repo_link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Latest Blog Link</label>
                      <input
                        type="text"
                        name="latest_blog_link"
                        value={formData.latest_blog_link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Extra Project Link</label>
                      <input
                        type="text"
                        name="extra_project_link"
                        value={formData.extra_project_link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>

                  <div className="py-5 md:py-8 border-b-2 border-grey-500">
                    <label className="block text-2xl text-gray-700 font-bold mb-2">Timeline Events List</label>
                    <div className="space-y-2">
                      {formData.timeline_list.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                          <div className="pl-2">
                            <div className="font-bold">{item.title}</div>
                            <div className="text-sm text-gray-600">{item.date}</div>
                            <div className="text-sm text-gray-600">{item.description}</div>
                          </div>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleRemoveTimelineItem(index)}
                          >
                            <FaTrashAlt className="mr-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <input
                        type="text"
                        name="title"
                        value={newTimelineItem.title}
                        onChange={(e) => setNewTimelineItem({ ...newTimelineItem, title: e.target.value })}
                        placeholder="Event Title"
                        className="w-full px-3 py-2 mb-1 border rounded"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="date"
                          name="date"
                          value={newTimelineItem.date}
                          onChange={(e) => setNewTimelineItem({ ...newTimelineItem, date: e.target.value })}
                          className="w-full px-3 py-2 mb-2 border rounded"
                        />
                        <input
                          type="text"
                          name="description"
                          value={newTimelineItem.description}
                          onChange={(e) => setNewTimelineItem({ ...newTimelineItem, description: e.target.value })}
                          placeholder="Event Description"
                          className="w-full px-3 py-2 mb-2 border rounded"
                        />
                      </div>
                      <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded w-full"
                        onClick={handleAddTimelineItem}
                      >
                        Add Event
                      </button>
                    </div>
                  </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Published</label>
                      <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <div className="py-5 md:py-8 border-b-2 border-grey-500">
                    <label className="block text-2xl text-gray-700 font-bold mb-2">Papers List</label>
                    <div className="space-y-2">
                      {formData.papers_list.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                          <div className="pl-2">
                            <div className="font-bold">{item.title}</div>
                            <div className="text-sm text-gray-600">{item.link}</div>
                            <div className="text-sm text-gray-600">{item.credits}</div>
                          </div>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleRemovePaper(index)}
                          >
                            <FaTrashAlt className="mr-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <input
                        type="text"
                        name="title"
                        value={newPaper.title}
                        onChange={(e) => setNewPaper({ ...newPaper, title: e.target.value })}
                        placeholder="Paper Title"
                        className="w-full px-3 py-2 mb-1 border rounded"
                      />
                      <input
                        type="text"
                        name="link"
                        value={newPaper.link}
                        onChange={(e) => setNewPaper({ ...newPaper, link: e.target.value })}
                        placeholder="Paper Link"
                        className="w-full px-3 py-2 mb-1 border rounded"
                      />
                      <textarea
                        name="credits"
                        value={newPaper.credits}
                        onChange={(e) => setNewPaper({ ...newPaper, credits: e.target.value })}
                        placeholder="Paper Credits"
                        className="w-full h-24 px-3 py-2 mb-2 border rounded"
                      />
                      <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded w-full"
                        onClick={handleAddPaper}
                      >
                        Add Paper
                      </button>
                    </div>
                  </div>
                </form>

                <div className="py-5 md:py-8 border-b-2 border-grey-500">
                  <label className="text-2xl font-bold">Info for Researchers</label>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 mt-2">RTAB Intro</label>
                    <textarea
                      name="rtab_intro"
                      value={formData.rtab_intro}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full h-48 px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 mt-2">RTAB Bookmarks List</label>
                    <div className="space-y-2">
                      {formData.rtab_bookmarks_list.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                          <div className="pl-2">
                            <div className="font-bold">{item.title}</div>
                            <div className="text-sm text-gray-600">{item.url}</div>
                          </div>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleRemoveBookmark(index)}
                          >
                            <FaTrashAlt className="mr-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <input
                        type="text"
                        name="title"
                        value={newBookmark.title}
                        onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
                        placeholder="Bookmark Title"
                        className="w-full px-3 py-2 mb-1 border rounded"
                      />
                      <input
                        type="text"
                        name="url"
                        value={newBookmark.url}
                        onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                        placeholder="Bookmark URL"
                        className="w-full px-3 py-2 mb-1 border rounded"
                      />
                      <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded w-full"
                        onClick={handleAddBookmark}
                      >
                        Add Bookmark
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 mt-2">Discord Link</label>
                    <input
                      type="text"
                      name="discord_link"
                      value={formData.discord_link}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>

                <ResearcherApplications projectId={project.id} fetchProjects={fetchProjects} userEmail={userEmail} />
                <ProjectTeam projectId={project.id} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditResearchProjectForm;
