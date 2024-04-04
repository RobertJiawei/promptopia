"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Image from "next/image";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-2 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, [isReset]);

  const filterPrompts = (text) => {
    const regex = new RegExp(text, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    setTimeout(() => {
      const result = filterPrompts(e.target.value);
      setSearchedPosts(result);
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const handleTagClick = (tag) => {
    setPosts(() => posts.filter((item) => item.tag == tag));
  };

  const handleReset = () => {
    setSearchText("");
    setIsReset((prev) => !prev);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          onKeyDown={handleKeyDown}
        />
      </form>
      <Image
        src="/assets/images/images.png"
        width={40}
        height={40}
        className="rounded-full mt-4 cursor-pointer hover:shadow-xl"
        alt="reset button"
        onClick={handleReset}
      />
      {searchText.length !== 0 ? (
        searchedPosts.length ? (
          <PromptCardList
            data={searchedPosts}
            handleTagClick={handleTagClick}
          />
        ) : (
          <p className="mt-10 text-center">
            No prompt match you search
            <br />
            Start a new search
          </p>
        )
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};
export default Feed;
