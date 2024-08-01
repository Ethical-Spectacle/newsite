import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown, FaTrashAlt } from 'react-icons/fa';

const { API_URL_PROD } = require('../../../../config/config');

const AddResearchProjectForm = ({ userEmail, onProjectAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    timeline_list: [],
    proposal_link: ''
  });
  const [timelineItem, setTimelineItem] = useState({
    title: '',
    description: '',
    date: ''
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimelineChange = (e) => {
    const { name, value } = e.target;
    setTimelineItem({ ...timelineItem, [name]: value });
  };

  const handleAddTimelineItem = () => {
    if (timelineItem.title && timelineItem.description && timelineItem.date) {
      setFormData({
        ...formData,
        timeline_list: [...formData.timeline_list, timelineItem]
      });
      setTimelineItem({
        title: '',
        description: '',
        date: ''
      });
    }
  };

  const handleDeleteTimelineItem = (index) => {
    const updatedTimelineList = formData.timeline_list.filter((_, i) => i !== index);
    setFormData({ ...formData, timeline_list: updatedTimelineList });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL_PROD}/submit_research_project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, email: userEmail }),
      });

      if (res.ok) {
        alert('Research project submitted successfully');
        setFormData({
          title: '',
          desc: '',
          timeline_list: [],
          proposal_link: ''
        });
        setIsOpen(false);
        onProjectAdded(); // Notify the parent component
      } else {
        alert('Failed to submit research project');
      }
    } catch (error) {
      console.error('Error submitting research project:', error);
    }
  };

  return (
    <div className="w-full p-4 my-5 md:mb-8 shadow-md rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold mb-2">Add New Research Project</h3>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
        </button>
      </div>
      {isOpen && (
        <div className="p-4 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="md:mb-5">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="md:mb-5">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded h-48"
                required
              />
            </div>

            <div className="md:mb-5">
              <label className="block text-gray-700">Proposal Link</label>
              <input
                type="text"
                name="proposal_link"
                value={formData.proposal_link}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="md:mb-5">
              <label className="block text-gray-700">Timeline</label>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <input
                  type="text"
                  name="title"
                  value={timelineItem.title}
                  onChange={handleTimelineChange}
                  className="w-full px-3 py-2 border rounded mb-2 md:mb-0"
                  placeholder="Timeline Item Title"
                />
                <textarea
                  name="description"
                  value={timelineItem.description}
                  onChange={handleTimelineChange}
                  className="w-full px-3 py-2 border rounded mb-2 md:mb-0"
                  placeholder="Timeline Item Description"
                />
                <input
                  type="date"
                  name="date"
                  value={timelineItem.date}
                  onChange={handleTimelineChange}
                  className="w-full px-3 py-2 border rounded mb-2 md:mb-0"
                />
                <button
                  type="button"
                  onClick={handleAddTimelineItem}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {formData.timeline_list.map((item, index) => (
                  <div key={index} className="p-2 border rounded bg-gray-100 flex justify-between items-center">
                    <div>
                      <strong>{item.title}:</strong> {item.description} <em>({item.date})</em>
                    </div>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => handleDeleteTimelineItem(index)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit Research Project
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddResearchProjectForm;
