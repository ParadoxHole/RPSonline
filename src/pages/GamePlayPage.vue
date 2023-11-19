<template>
  <FloatingHeader />
    <div v-if="GameState== 'Found'" class="main-container">
      <h6>{{ this.storeLogUser.username }}</h6>
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
          <button v-if="this.selectedImage !== -1" class="button" @click="MakeMove">Confirm</button>
          <button v-if="this.selectedImage == -1" class="button" @click="MakeMove">Random</button>
        </div>
      </div>
    </div>
    <div v-if="GameState== 'Default'" class="default-container">
      <button class="button" @click="SearchPlayer">Search For Other Player</button>
    </div>
    <div v-if="GameState=='Searching'" class="searching">
      <h1>Waiting for another player...</h1>
      <q-linear-progress dark rounded indeterminate color=#2e2c2c class="q-mt-sm" />
      <q-space />
    </div>
    <div v-if="GameState== 'Result'" class="searching">
      <h2>you - {{ P1Score }} || {{ P2Score }} - him </h2>
      <h2>{{ result }}</h2>
    </div>
    <div v-if="GameState== 'Waiting'" class="default-container">
      <h1>Waiting for the other player choice</h1>
    </div>
    <div v-if="GameState== 'winMatch'" class="searching">
      <h1>You won the match</h1>
      <button class="button" @click="GameState='Default'">Play Again</button>
      <button class="button" @click="Home">Back to Main Menu</button>
    </div>
    <div v-if="GameState== 'loseMatch'" class="searching">
      <h1>You lost the match</h1>
      <button class="button" @click="GameState='Default'">Play Again</button>
      <button class="button" @click="Home">Back to Main Menu</button>
    </div>
</template>
  
<script>
  import FloatingHeader from "../components/Sidebar.vue";
  import { useLoginUserStore } from "../stores/loginUserStore";

  
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
        GameState: 'winMatch', // Default, Searching, Found, Result, Waiting, winMatch, loseMatch
        timer:20,
        P1Score: 0,
        P1Choice: null,
        P2Score: 0,
        P2Choice: null,
        result: null,
        storeLogUser: useLoginUserStore(),
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

      SearchPlayer() {
        // Initial check
        this.createMatch();

        const intervalId = setInterval(() => {
          this.checkPlayer();
        }, 1000);
        this.intervalId = intervalId;
      },

      createMatch() {
        this.$api
          .post("/match/join/" + this.storeLogUser.userid)
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
      checkPlayer(){
        this.$api
          .get("/match/checkPlayer/" + this.storeLogUser.userid)
          .then((response) => {
            console.log(response.data.data);
            if (response.data.data == false) {
              this.GameState = "Searching";
              console.log("Still searching");
            } else {
              this.GameState = "Found";
              clearInterval(this.intervalId); // Stop the interval
              console.log("Found");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },

      // Add this lifecycle hook to clear the interval when the component is destroyed
      beforeDestroy() {
        clearInterval(this.intervalId);
      },

      MakeMove(){
        if (this.selectedImage == -1) {
          //choose random image
          let randomImage = Math.floor(Math.random() * 3);
          this.selectedImage = randomImage;
          alert("You didn't choose a sign, so we chose " + this.imageNames[randomImage] + " for you")
        }
        const data = {
            playerId: this.storeLogUser.userid,
            move: this.imageNames[this.selectedImage]
        };

        console.log(data);  // Log the data to ensure it's correct

        this.$api
            .put("/match/move", data)
            .then((response) => {
                console.log(response);
                if (response.data.data == "Both players have not made a move yet.") {
                    this.GameState = "Waiting";
                    const intervalOPChoice = setInterval(() => {
                      this.$api.put("/match/move", data)
                      .then((response) => {
                          console.log(response);
                          if (response.data.data != "Both players have not made a move yet.") {
                            this.moveResult(response);
                            clearInterval(intervalOPChoice);
                          }});
                    }, 1000);
                } else {
                  this.moveResult(response);
                }
            })
            .catch((err) => {
                console.log(err);
            });
      },
      moveResult(response) {
      if (response.data.data.playerOneId || response.data.data.playerTwoId) {
        // The match is not fully finished
        if (this.storeLogUser.userid == response.data.data.playerOneId) {
          this.P1Score = response.data.data.PlayerOneScore;
          this.P2Score = response.data.data.PlayerTwoScore;
          this.P1Choice = response.data.data.PlayerOneChoice;
          this.P2Choice = response.data.data.PlayerTwoChoice;
          if (response.data.data.output == "P1Win") {
            this.result = "You Win";
          } else if (response.data.data.output == "P2Win") {
            this.result = "You Lose";
          } else {
            this.result = "Draw";
          }
        } else {
          this.P1Score = response.data.data.PlayerTwoScore;
          this.P2Score = response.data.data.PlayerOneScore;
          this.P1Choice = response.data.data.PlayerTwoChoice;
          this.P2Choice = response.data.data.PlayerOneChoice;
          if (response.data.data.output == "P2Win") {
            this.result = "You Win";
          } else if (response.data.data.output == "P1Win") {
            this.result = "You Lose";
          } else {
            this.result = "Draw";
          }
        }
        setTimeout(() => {
          this.GameState = "Found";
        }, 5000);
        this.GameState = "Result";
        this.selectedImage = -1;
      } else {
        // The match is fully finished
        if (response.data.data == this.storeLogUser.userid) {
          this.GameState = "winMatch";
        } else {
          this.GameState = "loseMatch";
        }
      }
    },
    Home(){
      this.$router.push("/");
    },
    },
  };
  </script>

  <style scoped>

  .default-container,
  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fbea04; /* Background color for the main container */
  }

  .searching {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fbea04;
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

  .button {
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
  .button:hover {
    background-color: rgb(32, 32, 32) /* Button background color on hover */
    
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
  
