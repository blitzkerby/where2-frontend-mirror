import React, { useState, useEffect } from "react";
import { 
  Facebook, Twitter, Instagram, ImageIcon, Globe, Send,
  Share2, Bookmark, Eye, MessageCircle, Heart,Clock
} from "lucide-react";
import {convertToHTML} from "../utility/markdownConverter/markdownConverter"
import DiscussionContainer from "./../components/reusable/DiscussionContainer";

const setLikeCount = []

const DetailLayout = ({ 
  image, 
  description, 
  title, 
  websiteLink, 
  facebookLink, 
  instagramLink, 
  twitterLink, 
  telegramLink,
  author = "John Doe",
  date = "March 2024",
}) => {
  const [imageError, setImageError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialMediaLinks = [
    { 
      icon: Globe, 
      link: websiteLink, 
      label: "Website",
      bgGradient: "from-gray-600 to-gray-700"
    },
    { 
      icon: Instagram, 
      link: instagramLink, 
      label: "Instagram",
      bgGradient: "from-purple-600 to-pink-600"
    },
    { 
      icon: Send, 
      link: telegramLink, 
      label: "Telegram",
      bgGradient: "from-blue-400 to-blue-600"
    },
    { 
      icon: Twitter, 
      link: twitterLink, 
      label: "Twitter",
      bgGradient: "from-sky-400 to-sky-600"
    },
    { 
      icon: Facebook, 
      link: facebookLink, 
      label: "Facebook",
      bgGradient: "from-blue-600 to-blue-800"
    }
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };



  const ShareButton = () => (
    <button 
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300"
      onClick={() => navigator.clipboard.writeText(window.location.href)}
    >
      <Share2 className="w-4 h-4" />
      <span>Share</span>
    </button>
  );

  return (
    <div className={`max-w-6xl mx-auto px-4 py-16 transition-opacity duration-1000 text-justify ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="relative mb-12 group ">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-xl bg-gray-100 cursor-zoom-in"
             onClick={() => setIsImageZoomed(!isImageZoomed)}>
          <div className="aspect-video">
            {imageError || !image ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <ImageIcon className="w-16 h-16 text-gray-400" />
              </div>
            ) : (
              <img
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500
                  ${isImageZoomed ? 'scale-110' : 'scale-100'}
                  group-hover:brightness-105`}
                src={image}
                alt={title}
                onError={() => setImageError(true)}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Author and Stats Bar */}
      <div className="flex justify-between items-center mb-8 px-4 ">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
            {author[0]}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{author}</h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{title}</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {convertToHTML(description)}
          </div>

          {/* Interaction Bar */}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Social Media Cards */}
          <div className="grid grid-cols-2 gap-4 mx-5">
            {socialMediaLinks.map(({ icon: Icon, link, label, bgGradient }) => 
              link && (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-br ${bgGradient} p-4 rounded-xl text-white 
                    transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                    flex flex-col items-center justify-center gap-2 group`}
                >
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              )
            )}
          </div>

          {/* Links Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-300 mx-5">
            <h3 className="text-xl font-semibold text-gray-900 pb-4 border-b border-gray-200">
              Relevant Links
            </h3>
            <div className="space-y-3">
              {socialMediaLinks.map(({ link, label }) => 
                link && (
                  <a
                    key={label}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 truncate hover:bg-gray-50 p-2 rounded-lg"
                  >
                    {label}
                  </a>
                )
              )}
            </div>
          </div>
      <div className="h-fit w-full">
        <DiscussionContainer />
      </div>

    </div>
      </div>

      {/* Discussion Section */}
    </div>
  );
};

export default DetailLayout;