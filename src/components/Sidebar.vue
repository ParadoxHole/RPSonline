<template>
  <div class="floating-header">
    <q-list padding>
      <router-link to="" class="icons">
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="home" size="4em" />
          </q-item-section>
        </q-item>
      </router-link>

      <router-link to="/play" class="icons">
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="play_arrow" size="4em" />
          </q-item-section>
        </q-item>
      </router-link>

      <router-link to="/leaderboard" class="icons">
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="leaderboard" size="4em" />
          </q-item-section>
        </q-item>
      </router-link>

      <router-link to="/login" class="icons">
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="login" size="4em" />
          </q-item-section>
        </q-item>
      </router-link>

      <router-link to="/profile" class="icons">
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="person" size="4em" />
          </q-item-section>
        </q-item>
      </router-link>

      <router-link to="/about" class="icons">
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="info" size="4em" />
          </q-item-section>
        </q-item>
      </router-link>
    </q-list>
  </div>
</template>
  
<style scoped>
  .floating-header {
    position: fixed;
    top: 0;
    left: 1%; /* Adjust the left spacing as needed */
    width: 90px; /* Adjust the width as a percentage of the viewport width */
    height: 450px; /* Adjust the height as a percentage of the viewport height */
    background-color: #34312f; /* Dark grey background */
    color: #fff;
    border-radius: 50px; /* Rounded corners */
    z-index: 1000;
    margin-top: 5%; /* Adjust the top margin as a percentage of the viewport height */
  }

  .icons{
    color: #fff;
    text-decoration: none;
  }

  </style>
  
  <script>
  export default {
    name: 'FloatingHeader',
    data() {
      return {
        menuItems: [
          { icon: 'home', alt: 'Home', label: 'Home' },
          { icon: 'play_arrow', alt: 'Play', label: 'Play' },
          { icon: 'leaderboard', alt: 'Leaderboard', label: 'Leaderboard' },
          { icon: 'login', alt: 'Login', label: 'Login' },
          { icon: 'person', alt: 'Profile', label: 'Profile' },
          { icon: 'info', alt: 'About', label: 'About' },
        ],
      };
    },
  };
  </script>
  