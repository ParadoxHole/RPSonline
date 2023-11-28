<template>
  <FloatingHeader />
  <div class="profile-container">
    <div class="profile-title">My Profile</div>
    <div class="profile-content">
      <div class="profile-info">
        <div class="profile-details">
          <div class="profile-name">{{ user.fullname }}</div>
          <div class="profile-rating">{{ user.rating }}</div>
        </div>
      </div>
      <div class="rank-info">
        <div class="profile-rank">{{ user.rank }}</div>
        <div class="profile-rank-description">{{ user.rankDescription }}</div>
      </div>
      <div class="profile-stats">
        <div class="stat-item">
          <div class="stat-label">Wins</div>
          <div class="stat-value">{{ user.wins }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Losses</div>
          <div class="stat-value">{{ user.losses }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Draws</div>
          <div class="stat-value">{{ user.draws }}</div>
        </div>
      </div>
    </div>
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
      user: {
        fullname: "",
        rating: 0,
        rank: "",
        rankDescription: "",
        wins: 0,
        losses: 0,
        draws: 0,
      },
      storeLogUser: useLoginUserStore(),
    };
  },
  created() {
    this.waitForUserId();
  },
  methods: {
    waitForUserId() {
      setTimeout(() => {
          this.fetchUserData();
        }, 2000); // Adjust the delay (in milliseconds) as needed
    },
    fetchUserData() {
      const headers = {
        "x-access-token": this.storeLogUser.accessToken,
        };
      this.$api.get("/auth/get/"  + this.storeLogUser.userid, { headers })
        .then((response) => {
          if (response.status === 200) {
            // Update user data 
            this.user = {
              fullname: response.data.user.fullname,
              rating: response.data.user.rating,
              rank: response.data.user.rank,
              rankDescription: response.data.user.rankDesc,
              wins: response.data.matchStats.matches_won,
              losses: response.data.matchStats.matches_lost,
              draws: response.data.matchStats.draws,
            };
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
  },
};
</script>

<style scoped>
    .profile-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background-color: #fbea04; /* Background color for the main container */
      padding: 20px;
    }
  
    .profile-title {
      background-color: #34312f;
      color: #fff;
      border-radius: 30px;
      font-size: 24px;
      padding: 10px;
      width: 70%;
      margin-bottom: 20px;
      font-size: 50px;
      font-weight: bold;
      font-family: Antipasto;
    }
  
    .profile-content {
      display: flex;
      justify-content: space-around;
      width: 100%;
    }
  
    .profile-info {
      display: flex;
      align-items: center;
    }
  
    .profile-details {
      text-align: left;
    }
  
    .profile-name {
      font-size: 30px;
      font-weight: bold;
      font-family: Prottotype;
      color: #34312f;
      text-shadow: 5px 5px 3px #ead705;
    }
  
    .profile-rating {
      font-size: 24px;
      font-family: Prottotype;
      color: #34312f;
      text-shadow: 5px 5px 3px #ead705;

    }

    .rank-info{
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 400px;
    }
    .profile-rank{
      font-size: 50px;
      font-family: Prottotype;
      color: #34312f;
      text-shadow: 5px 5px 3px #ead705;

    }
    .profile-rank-description{
      font-size: 24px;
      font-family: Prottotype;
      color: #34312f;
      text-shadow: 5px 5px 3px #ead705;

    }
  
    .profile-stats {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  
    .stat-item {
      margin: 10px;
    }
  
    .stat-label {
      font-size: 18px;
      font-family: Prottotype;
      color: #34312f;
      text-shadow: 5px 5px 3px #ead705;
    }
  
    .stat-value {
      font-size: 24px;
      font-family: Prottotype;
      color: #34312f;
      text-shadow: 5px 5px 3px #ead705;
    }
    @font-face {
    font-family: Antipasto;
    src: url('../../public/fonts/antipasto/AntipastoPro-Bold_trial.ttf');
    } 
    @font-face {
      font-family: Prottotype;
      src: url('../../public/fonts/prototype/Prototype.ttf');
    }
  </style>
  