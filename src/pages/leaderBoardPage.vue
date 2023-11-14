<template>
  <FloatingHeader />
  <div class="leaderboard-container">
    <div class="leaderboard-title">Leaderboard</div>
    <div class="podium">
      <!-- Podium Images -->
      <div class="podium-image podium-silver" v-if="topThree[1]">
        <div class="podium-text">{{ topThree[1].name }}</div>
        <img :src="topThree[1].avatar" alt="Silver" />
      </div>
      <div class="podium-image podium-gold" v-if="topThree[0]">
        <div class="podium-text">{{ topThree[0].name }}</div>
        <img :src="topThree[0].avatar" alt="Gold" />
      </div>
      <div class="podium-image podium-bronze" v-if="topThree[2]">
        <div class="podium-text">{{ topThree[2].name }}</div>
        <img :src="topThree[2].avatar" alt="Bronze" />
      </div>
    </div>
    <div class="leaderboard-rows">
      <!-- Leaderboard Rows for remaining players -->
      <div v-for="row in remainingPlayers" :key="row.rank" class="leaderboard-row">
        <img class="row-image" :src="row.avatar" alt="Avatar" />
        <div class="row-text">{{ row.name }}</div>
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
            avatar: `/file/display/${item.img}`,
          }));

          // Fill the remainingPlayers array with all players except the top three
          this.remainingPlayers = sortedData.slice(3).map((item) => ({
            rank: item.rank,
            name: item.name,
            avatar: `/file/display/${item.img}`,
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
    font-family: Prottotype;
  }
  
  .leaderboard-rows {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .leaderboard-row {
    display: flex;
    align-items: center;
    margin: 5px;
  }
  
  .row-image {
    width: 50px;
    height: 50px;
    border-radius: 50%; /* Rounded border for the avatar image */
    margin-right: 10px;
  }
  
  .row-text {
    font-size: 18px;
  }
  
  .podium {
    display: flex;
    justify-content: space-between;
  }
  
  .podium-image {
    text-align: center;
  }
  
  .podium-text {
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .podium-bronze img {
    width: 80px;
    height: 80px;
    border: 3px solid #cd7f32; /* Bronze color */
  }
  
  .podium-silver img {
    width: 100px;
    height: 100px;
    border: 3px solid #c0c0c0; /* Silver color */
  }
  
  .podium-gold img {
    width: 120px;
    height: 120px;
    border: 3px solid #ffd700; /* Gold color */
  }
  @font-face {
    font-family: Prottotype;
    src: url('../../public/fonts/antipasto/AntipastoPro-Bold_trial.ttf');
  } 
</style>  