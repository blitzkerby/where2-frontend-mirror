import config from "./../../../config";

const FetchProfile = async (paramUserId, token) => {
    try {
      const res = await fetch(config.profile.getMyProfile(paramUserId), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
  
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  };

export default FetchProfile