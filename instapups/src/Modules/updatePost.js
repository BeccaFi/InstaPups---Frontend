function updatePost(id, updatedPost) {
  return fetch(`https://instapups-server.onrender.com/posts/${id}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(updatedPost),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      return data;
    })
    .catch((error) => {
      console.log("An error occurred when editing post", error);
      throw error;
    });
}

export default updatePost;
