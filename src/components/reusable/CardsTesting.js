import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Globe, Mail, Twitter, Facebook, Instagram, ThumbsUp } from 'lucide-react';
import ButtonComponent from './Button';
import { Link } from 'react-router-dom';
const JobListingCard = ({ jobData }) => {
  const [liked, setLiked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleLike = () => setLiked(!liked);

  const socialIcons = [
    { Icon: Globe, color: 'text-blue-500' },
    { Icon: Mail, color: 'text-red-500' },
    { Icon: Twitter, color: 'text-blue-400' },
    { Icon: Facebook, color: 'text-blue-600' },
    { Icon: Instagram, color: 'text-pink-500' },
  ];


  return (
    <section className='max-w-[800px] mx-auto'>
    <h1>
        Your Content
    </h1>
    <div className=" bg-white rounded-xl shadow-md overflow-hidden">
      <div className={`${isMobile ? 'flex-col' : 'flex'}`}>
        <div className={`${isMobile ? 'w-full' : 'w-1/3'}`}>
          <img src={jobData.logo} alt={jobData.company} className="w-full h-full object-fill" />
        </div>
        <div className={`${isMobile ? 'w-full' : 'w-2/3'} p-4`}>
          <h1 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{jobData.company}</h1>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">{jobData.position}</p>

          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{jobData.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{jobData.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{jobData.location}</span>
            </div>
            <div className="text-sm text-gray-700">
              <strong>Salary:</strong> {jobData.salary}
            </div>
            <p className="mt-2 text-gray-500">{jobData.description}</p>
        </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-2">
              {socialIcons.map(({ Icon, color }, index) => (
                <a key={index} href={`https://example.com/${index}`} target="_blank" rel="noopener noreferrer" className={`${color} hover:opacity-80`}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleLike}
                className={`p-1 rounded-full ${liked ? 'bg-blue-100' : 'bg-gray-100'} hover:bg-blue-200 transition-colors`}
              >
                <ThumbsUp className={`h-5 w-5 ${liked ? 'text-blue-500' : 'text-gray-500'}`} />
              </button>
              <ButtonComponent className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                View
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className='py-3 grid grid-cols-2 gap-1 max-w-[320px]'>
      <Link to="/admin/edit-content">
        <ButtonComponent variant='success'>Edit Content</ButtonComponent>
      </Link>
      <Link to="/admin/edit-content">
        <ButtonComponent variant='danger'>Delete Content</ButtonComponent>
      </Link>
      </div>
    </section>
    
  );
};

export default JobListingCard;