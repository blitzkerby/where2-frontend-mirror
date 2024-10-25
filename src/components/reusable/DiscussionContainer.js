import React, { useState } from 'react'
import CreateDiscussion from './../community/CreateDiscussion'
import DiscussionList from './../community/DiscussionList'

const DiscussionContainer = () => {
    const [isCreatingDiscussion, setIsCreatingDiscussion] = useState(false);
    const toggleDiscussionView = () => {
        setIsCreatingDiscussion((prev) =>!prev);
    };

    return (
        <>
          {isCreatingDiscussion ? (
            <CreateDiscussion showForm={true} />
          ) : (
            <DiscussionList 
              isCreatingDiscussion={isCreatingDiscussion}
              toggleDiscussionView={toggleDiscussionView}
            />
          )}
        </>
      );
    };
    
export default DiscussionContainer;