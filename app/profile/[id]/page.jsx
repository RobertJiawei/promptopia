"use client";

import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
      setUserName(data[0].creator.username);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
