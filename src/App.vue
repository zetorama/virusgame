<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view id="content"></router-view>
    <p>wtf?</p>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5rem;
}
#content {
  min-height: 600px;
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
