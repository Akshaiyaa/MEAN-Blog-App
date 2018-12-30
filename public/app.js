(function() {
  angular
    .module("BlogApp", [])
    .controller("BlogController", BlogController);

  function BlogController($scope, $http) {
      $scope.createPost = createPost; //event handlers
      $scope.deletePost = deletePost;
      $scope.editPost = editPost;
      $scope.updatePost = updatePost;

      function init() {
        getAllPosts();
      }
      init();

      function updatePost(post){ //post object contains the new post
        console.log(post);// Only for double checking. Need not add it here.
        $http
          .put("/api/blogpost/"+post._id, post)// modify the blogpost whose id is blogpostid; the second value is the modified value which we are sending.
          .success(getAllPosts);
      }

      function editPost(postId) { //Populates the post.title and post.body with the selected blog details
        $http
          .get("/api/blogpost/"+postId)//recieves the req to be updated
          .success(function(post){// render post backto client for editing.
            $scope.post = post;
          });
      }

      function deletePost(postId) {
        $http
          .delete("/api/blogpost/"+postId)
          .success(getAllPosts);
      }

      function getAllPosts() {
        $http
          .get("/api/blogpost/")
          .success(function(posts) {
             $scope.posts = posts;
          });
      }

      function createPost(post) {
        console.log(post);
        $http
        .post("/api/blogpost", post)
        .success(getAllPosts);
      }
  }
})();
