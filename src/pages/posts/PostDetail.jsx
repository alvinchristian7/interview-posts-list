import { useGetPostsQuery } from "../../services/posts";
import { useParams } from "react-router";

function PostDetail() {
  let { id } = useParams();
  const { postData, isLoading, error } = useGetPostsQuery(undefined, {
    selectFromResult: ({ data, ...restResponse }) => ({
      postData: data?.find((post) => post.id === parseInt(id)) ?? {},
      ...restResponse,
    }),
  });

  return (
    <div style={{ padding: 40 }}>
      <h5>PostDetail</h5>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      <div style={{ border: "1px solid black", padding: 10 }}>
        <div>No. {postData.id}</div>
        <div>UserId: {postData.userId}</div>
        <div>Title: {postData.title}</div>
        <div>Body: {postData.body}</div>
      </div>
    </div>
  );
}

export default PostDetail;
