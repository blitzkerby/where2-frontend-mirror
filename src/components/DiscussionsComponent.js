import React, { useState } from "react";
import CreateDiscussionComponent from "./community/CreateDiscussionComponent";
import DiscussionList from "./community/DiscussionList";
import SubpageHeroSection from "./reusable/SubHeroSectionComponent";
import useAuth from "./../hooks/useAuth";

const DiscussionsComponent = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { isLoggedIn, role, userId } = useAuth();
  const allowedRoles = ["admin", "developer"];

  const handleDiscussionCreated = (newDiscussion) => {
    setShowCreateForm(false);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <SubpageHeroSection h1Text={"W2COMMUNITY"} subH1Text={"Dive into Anything"} pText={"W2COMMUNITY is home to thousands of communities, students, researchers, endless interactions, and genuine human interactions. Whether you are a student, researcher, or an individual, W2COMMUNITY has something for you. Feel free to start a disucssion and share your thoughts with the world."}/>
      <div className="w-full mx-auto px-4 sm:px-3 lg:px-4 py-4 h-full">
        {showCreateForm && isLoggedIn && allowedRoles.includes(role) ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <CreateDiscussionComponent
              onDiscussionCreated={handleDiscussionCreated}
            />
          </div>
        ) : (
          <div className="flex w-full flex-col lg:flex-row gap-4 h-full">
            <div className="lg:w-full">
              <div className="bg-white shadow-md rounded-lg py-8 sm:p-3 min-h-[600px]">
                <DiscussionList
                  onNewDiscussionClick={() => setShowCreateForm(true)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionsComponent;
