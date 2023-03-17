<template>
    <div class="notfound">
      
      <p class="notfound__message">Page not found.</p>
      <img class="pageImg" alt="Error404" src="../assets/404-error-3702359-3119148.webp">
      <router-link class="notfound__button" to="/">Go to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style scoped>
  .notfound {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .notfound__message {
    font-size: 24px;
    margin-bottom: 12px;
    color:#27285C;
  }
  
  .notfound__button {
    padding: 10px 20px;
    font-size: 24px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: #27285C;
    cursor: pointer;
  }
  
  .notfound__button:hover {
    background-color: #0b7dda;
  }
  
  .notfound__button:active {
    transform: translateY(2px);
  }
  .pageImg{
    height: 200px;
    length: 400px;
    border-radius:none;

  }
  </style>
  