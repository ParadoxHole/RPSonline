<template>
    <div class="main-container">
    <FloatingHeader />
      <div class="image-container">
        <img src="../../public/rock-paper-scissor-game-using-python.webp" alt="Image Description" />
      </div>
      <div class="content-container">
        <div class="content">
          <h1>PLAY THE SIMPLEST GAME WHERE THE DUMBEST PLAYER CAN WIN AGAINST THE SMARTEST</h1>
          <button class="play-button" @click="play">Play Now</button>
        </div>
      </div>
    </div>
  </template>
  
<script>
import FloatingHeader  from "../components/Sidebar.vue";

export default {
  components: {
      FloatingHeader ,
  },
  methods: {
    play() {
      this.$router.push("/play");
    },
  },
};
</script>

  <style scoped>
  .main-container {

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
      background-color: #fbea04; /* Background color for the main container */
  }
  
  .image-container {
    padding-left: 150px;
    flex: 0.7; /* Takes 50% of the available space, adjust as needed */
  }
  
  .image-container img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  .content-container {
    flex: 1; /* Takes 50% of the available space, adjust as needed */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .content {
    text-align: center;
  }
  @font-face {
    font-family: Prottotype;
    src: url('../../public/fonts/antipasto/AntipastoPro-Bold_trial.ttf');
  } 
  h1 {
    font-size: 50px; /* Adjust the font size as needed */
    font-weight: bold;
    font-family: Prottotype;
    margin-bottom: 10px;
    color: #ffffff;
    text-shadow: 5px 5px 3px #ead705;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #2e2c2c;
  }
  
  .play-button {
    font-size: 50px; /* Adjust the font size as needed */
    font-weight: bold;
    font-family: Prottotype;
    width: 60%;
    padding: 10px 20px;
    background-color: #34312f; /* Button background color */
    color: #fff; /* Button text color */
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .play-button:hover {
    background-color: rgb(15, 15, 15) /* Button background color on hover */
    
  }
  </style>
  
