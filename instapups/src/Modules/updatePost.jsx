function updatePost(id, updatedPost) {
  return fetch(`http://localhost:5051/posts/update/${id}`, {
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
