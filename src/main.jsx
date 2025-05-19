import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { store } from "./store";
import { Provider } from "react-redux";

const PostDetail = React.lazy(() => import("./pages/posts/PostDetail.jsx"));
const PostList = React.lazy(() => import("./pages/posts/PostList.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<PostList />} />
          <Route path="posts">
            <Route path=":id" element={<PostDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
