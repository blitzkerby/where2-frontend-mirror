import config from "./../config";

export const fetchPublicProfile = async (userId) => {
    try {
      const res = await fetch(`${config.profile.getPublicProfile}/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching public profile:', error);
      throw error;
    }
  };

  const getAuthData = () => {
  const authData = localStorage.getItem('authData');
  if (!authData) {
    throw new Error('No authentication data found');
  }
  try {
    const parsedAuthData = JSON.parse(authData);
    if (!parsedAuthData.token || !parsedAuthData.id) {
      throw new Error('Invalid authentication data structure');
    }
    return {
      token: parsedAuthData.token,
      userId: parsedAuthData.id
    };
  } catch (error) {
    console.error('Error parsing auth data:', error);
    throw new Error('Invalid authentication data');
  }
};

export const fetchProfile = async () => {
    try {
      const { token, userId } = getAuthData();
      const res = await fetch(config.profile.getMyProfile(userId), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
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