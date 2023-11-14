<template>
    <div v-if="GameState== 'Found'" class="main-container">
      <FloatingHeader />
      <div class="image-container">
        <div class="pyramid">
          <div class="top-image" @click="selectImage(0)" @mouseover="playGif(0)" @mouseleave="resetImage(0)">
            <img v-if="showGif[0]" ref="image0" src="../../public/RPS-Paper.gif" alt="Top Image" />
            <img v-else ref="image0" src="../../public/PaperHandDefault.png" alt="Top Image" />
          </div>
          <div class="bottom-images">
            <div @mouseover="playGif(1)" @mouseleave="resetImage(1)" @click="selectImage(1)">
              <img v-if="showGif[1]" ref="image1" src="../../public/RPS-Scissors.gif" alt="Bottom Image 1" />
              <img v-else ref="image1" src="../../public/ScissorsHandDefault.png" alt="Bottom Image 1" />
            </div>
            <div @mouseover="playGif(2)" @mouseleave="resetImage(2)" @click="selectImage(2)">
              <img v-if="showGif[2]" ref="image2" src="../../public/RPS-Rock.gif" alt="Bottom Image 2" />
              <img v-else ref="image2" src="../../public/RockHandDefault.png" alt="Bottom Image 2" />
            </div>
          </div>
          <h2>Score : {{ P1Score }} || {{ P2Score }}</h2>
        </div>
      </div>
      <div class="content-container">
        <div class="content">
          
          <h1>Your opponent is choosing...</h1>
          <h1 v-if="this.selectedImage !== -1">You chose: {{ imageNames[this.selectedImage] }}</h1>
          <h1 v-if="this.selectedImage == -1">Choose a sign or let the chance chose</h1>
          <h2 v-if="timer > 0" class="timer">Time Remaining : {{ timer }}</h2>
          <h1 v-else class="timer">Time's up!</h1>
          <button class="confirm-button" @click="MakeMove">Confirm</button>
        </div>
      </div>
    </div>
    <div v-if="GameState== 'Default'" class="default-container">
      <button class="search-button" @click="SearchPlayer">Search For Other Player</button>
    </div>
    <div v-if="GameState== 'Searching'" class="searching">
      <h1>Waiting for another player...</h1>
    </div>
    <div v-if="GameState== 'Result'" class="default-container">
      <h2>{{ P1Score }} || {{ P2Score }}</h2>
      <h2>{{ P1Choice }} || {{ P2Choice }}</h2>
    </div>
</template>
  
<script>
  import FloatingHeader from "../components/Sidebar.vue";
  
  export default {
    components: {
      FloatingHeader,
    },
    data() {
      return {
        gifImage: "@/../../public/RPS-Paper.gif",
        defaultImage: "@/../../public/default-avatar.png",
        showGif: [false, false, false],
        selectedImage: -1, // Initialize with -1 to indicate no selection
        imageNames: ["Paper", "Scissors", "Rock"], // Names of the images
        GameState: 'Found',
        timer:20,
        P1Score: 0,
        P1Choice: null,
        P2Score: 0,
        P2Choice: null,
      };
    },
    methods: {
      playGif(index) {
        this.showGif[index] = true;
      },
      resetImage(index) {
        this.showGif[index] = false;
      },
      selectImage(index) {
        // Reset the selected image if the same image is clicked again
        if (this.selectedImage === index) {
          this.selectedImage = -1;
        } else {
          this.selectedImage = index; // Set the selected image
        }
      },

      SearchPlayer(){
        this.$api
            .post("/match/join/" + 2)//userId
            .then((response) => {
              if (response.data.data.waiting) {
                this.GameState = "Searching";
              } else {
                this.GameState = "Found";
              }
        })
            .catch((err) => {
            console.log(err);
        });
      },
      MakeMove(){
        if (this.selectedImage == -1) {
          //choose random image
          let randomImage = Math.floor(Math.random() * 3);
          this.selectedImage = randomImage;
          alert("You didn't choose a sign in time, so we chose " + this.imageNames[randomImage] + " for you")
        }
        const data = {
            playerId: "1",  // userId
            move: this.imageNames[this.selectedImage]
        };

        console.log(data);  // Log the data to ensure it's correct

        this.$api
            .put("/match/move", data)
            .then((response) => {
                console.log(response);
                this.P1Score = response.data.data.PlayerOneScore;
                this.P2Score = response.data.data.PlayerTwoScore;
                this.P1Choice = response.data.data.PlayerOneChoice;
                this.P2Choice = response.data.data.PlayerTwoChoice;
                this.GameState = "Result";
            })
            .catch((err) => {
                console.log(err);
            });
      },
      StartTimer(){
        setInterval(() => {
          if (this.timer > 0) {
            this.timer--;
          }
          if (this.timer == 0) {
            this.MakeMove();
          }
        }, 1000);
      }
    },
  };
  </script>

  <style scoped>

  .default-container,
  .searching,
  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fbea04; /* Background color for the main container */
  }
  
  .image-container {
    padding-left: 100px;
    flex: 0.7; /* Takes 50% of the available space, adjust as needed */
  }
  
  .image-container img {
    max-width: auto;
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
  @font-face {
    font-family: GoodTimes;
    src: url('../../public/fonts/prototype/Prototype.ttf');
  }
  h1 {
    font-size: 40px; /* Adjust the font size as needed */
    font-weight: bold;
    font-family: Prottotype;
    padding: 0px 0px 0px 0px;
    color: #ffffff;
    text-shadow: 5px 5px 3px #ead705 ;
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: #2e2c2c;
  }

  h2 {
    font-size: 50px; /* Adjust the font size as needed */
    font-weight: bold;
    margin-bottom: 10px;
    color: #ffffff;
    font-family: GoodTimes;
    text-shadow: 5px 5px 3px #ead705 ;
  }
  
  .confirm-button {
    font-size: 50px; /* Adjust the font size as needed */
    font-weight: bold;
    font-family: Prottotype;
    width:100%;
    padding: 10px 20px;
    background-color: #34312f; /* Button background color */
    color: #fff; /* Button text color */
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .search-button {
    font-size: 50px; /* Adjust the font size as needed */
    font-weight: bold;
    font-family: Prottotype;
    width:60%;
    padding: 10px 20px;
    background-color: #34312f; /* Button background color */
    color: #fff; /* Button text color */
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .confirm-button:hover {
    background-color: rgb(15, 15, 15) /* Button background color on hover */
    
  }

  .pyramid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .top-image img,
  .bottom-images div img {
    width: 300px;
    height: 100%;
    border-radius: 50%;
    transition: transform 0.3s ease-in-out;
    outline: #2e2c2c;
  }
  .selected {
    outline: 2px solid black; /* Add an outline when selected */
    border-radius: 50%;
  }
  .bottom-images {
    display: flex;
    justify-content: center;
  }
  </style>
  
