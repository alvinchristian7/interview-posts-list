import { useState } from "react";
import { useGetPostsQuery } from "../../services/posts";
import { NavLink } from "react-router";
import { useDebounce } from "use-debounce";

const PostList = () => {
  const { data, error, isLoading, isSuccess } = useGetPostsQuery();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTitleDebounced] = useDebounce(searchTitle, 300);

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const filteredPosts =
    data?.filter((post) =>
      post.title.toLowerCase().includes(searchTitleDebounced.toLowerCase())
    ) ?? [];

  return (
    <div style={{ padding: 20 }}>
      <h4>Post List</h4>
      <input
        type="text"
        placeholder="Search..."
        value={searchTitle}
        onChange={handleSearchTitleChange}
        style={{ minWidth: 300, marginBottom: 20 }}
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {isSuccess &&
        (filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div style={{ border: "1px solid black", padding: 10 }} key={post.id}>
              <div>No. {post.id}</div>
              <p>{post.title}</p>
              <NavLink to={`/posts/${post.id}`} style={{ textAlign: "end" }}>
                View Detail
              </NavLink>
            </div>
          ))
        ) : (
          <div>No result</div>
        ))}
    </div>
  );
};

export default PostList;
