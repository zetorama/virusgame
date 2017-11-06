<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <span id="logo">√1Ⓡи$</span>
    <h1>Virus: The Game</h1>
    <router-view id="content"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html {
  font-size: 10px;
}
ol, ul, dl, p, form {
  font-size: 1.3rem;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5rem;
}
#logo {
  font-size: 4.5rem;
  font-weight: bold;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;
  color: darkgreen;
}
#logo + h1 {
  margin-top: -1rem;
  font-weight: normal;
}
#content {
  min-height: 600px;
  margin-bottom: 50px;
}

button {
  padding: 5px 10px;
  border: 2px solid darkgreen;
  background: white;
  color: darkgreen;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background: #333;
  color: #fff;
}

</style>
