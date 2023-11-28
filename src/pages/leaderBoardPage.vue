<template>
  <FloatingHeader />
  <div class="leaderboard-container">
    <div class="leaderboard-title">Leaderboard</div>
    <div class="podium">
      <!-- Podium Images -->
      <div class="podium-image podium-silver" v-if="topThree[1]">
        <div class="podium-text">{{ topThree[1].name }}</div>
        <div class="filled-square-silver" :style="{ backgroundColor: 'silver' }">
          <div class="podium-text">{{ topThree[1].rating }}</div>
        </div>
      </div>
      <div class="podium-image podium-gold" v-if="topThree[0]">
        <div class="podium-text">{{ topThree[0].name }}</div>
        <div class="filled-square-gold" :style="{ backgroundColor: 'gold' }">
          <div class="podium-text">{{ topThree[0].rating }}</div>
        </div>
      </div>
      <div class="podium-image podium-bronze" v-if="topThree[2]">
        <div class="podium-text">{{ topThree[2].name }}</div>
        <div class="filled-square-bronze" :style="{ backgroundColor: '#cd7f32' }">
          <div class="podium-text">{{ topThree[2].rating }}</div>
        </div>
      </div>
    </div>
    <div class="leaderboard-rows">
      <!-- Leaderboard Rows for remaining players -->
      <div v-for="(row, index) in remainingPlayers" :key="row.rank" class="leaderboard-row" :data-rank="index + 4">
        <div class="name-column">
          <div class="row-text">{{ row.name }}</div>
        </div>
        <div class="rating-column">
          <div class="row-text">{{ row.rating }}</div>
        </div>
      </div>
    </div>
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
      topThree: [],
      remainingPlayers: [],
    };
  },
  mounted() {
    // Fetch leaderboard data from your API
    this.$api.get("/leaderboard/full")
      .then((response) => {
        if (response.status === 200) {
          // Process the response data
          const sortedData = response.data.sort((a, b) => a.rank - b.rank);

          // Separate the top three players
          this.topThree = sortedData.slice(0, 3).map((item) => ({
            rank: item.rank,
            name: item.name,
            rating: item.rating
          }));

          // Fill the remainingPlayers array with all players except the top three
          this.remainingPlayers = sortedData.slice(3).map((item) => ({
            rank: item.rank,
            name: item.name,
            rating: item.rating
          }));
        }
      })
      .catch((err) => {
        console.error("Error fetching leaderboard data:", err);
      });
  },
};
</script>

<style scoped>

  .body{
    background-color: #fbea04; /* Background color for the main container */
  }
  .leaderboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #fbea04; /* Background color for the main container */

  }
  
  .leaderboard-title {
    background-color: #34312f; /* Button background color on hover */
    color: #fff;
    border-radius: 30px; /* Rounded border */
    font-size: 24px;
    padding: 10px;
    width: 70%;
    margin: 20px 0;
    font-size: 50px; /* Adjust the font size as needed */
    font-weight: bold;
    font-family: Antipasto;
  }
  
  .leaderboard-rows {
    display: flex;
    flex-direction: column;
  }

  .leaderboard-row {
    display: flex;
    align-items: center;
    margin: 5px;
  }

  .row-text {
    color: #34312f;
    font-size: 30px; /* Adjust the font size as needed */
    font-weight: bold;
    font-family: Prottotype;
    text-shadow: 5px 5px 3px #ead705 ;
  }

  /* Add the following styles to number the remaining players starting from 4 */
  .leaderboard-row::before {
    content: attr(data-rank); /* Use the 'data-rank' attribute as the content */
    color: #34312f;
    font-size: 30px; /* Adjust the font size as needed */
    font-weight: bold;
    font-family: Prottotype;
    text-shadow: 5px 5px 3px #ead705 ;
    margin: 10px;
  }
    /* Add these styles to create two columns */
  .name-column {
    flex: 1; /* Use flex to distribute available space */
    text-align: left; /* Align text to the left within the column */
  }

  .rating-column {
    flex: 1; /* Use flex to distribute available space */
    text-align: right; /* Align text to the right within the column */
  }


    
  .podium {
    display: flex;
    justify-content: space-between;
    align-items: flex-end; /* Align items at the bottom */

  }
  
  .podium-image {
    text-align: center;
  }
  
  .podium-text {
    color: #34312f;
    font-size: 30px; /* Adjust the font size as needed */
    font-weight: bold;
    font-family: Prottotype;
  }

  @font-face {
    font-family: Antipasto;
    src: url('../../public/fonts/antipasto/AntipastoPro-Bold_trial.ttf');
  } 
  @font-face {
    font-family: Prottotype;
    src: url('../../public/fonts/prototype/Prototype.ttf');
  }
  .filled-square-gold {
    width: 120px;  
    height: 100px; 
    border-radius: 10px; 
    margin-left: 10px;
    margin-right: 10px;
  }
  .filled-square-silver {
    width: 120px;  
    height: 80px; 
    border-radius: 10px;  
  }
  .filled-square-bronze {
    width: 120px;  
    height: 60px; 
    border-radius: 10px;  
  }


</style>  