<template>
  <div>
      <form class = "formstyle" v-on:submit.prevent="send()">
          <div class="input-group mb-3">
              <input type="text" class="form-control inputstyle" v-model="message">
              <div class="input-group-append">
                <button class="btn btn-outline-success" type="submit">Send</button>
              </div>
            </div>            
      </form>
      <button class="btn btn-outline-danger" v-on:click="stop()">Stop</button>
      <button class="btn btn-outline-warning" v-on:click="continuerequest()">Continue</button>
      <p>Message is: {{ message }}</p>
      <ul>
        <li v-for="d in data" :key="d.id">{{d.view}}</li>
      </ul>
  </div>  
</template>

<script>
  function createinterval() {
    this.timer = setInterval(() => {
           this.$http.get('/getData').then(response => {
              if(response.body.data && response.body.data.length){
                let newData = response.body.data.map((dt) => {
                  return {
                    view:dt, 
                    id: this.generatedID++
                  }
                })
                this.data = [].concat(newData.reverse(), this.data);
              }
 // get body data
//  this.someData = response.body;
           console.log(response.body);   
})
        }, 350)
  }
export default {
  name: 'App',
  data: function () {
    return {
      generatedID: 0,
      message: 0,
      data: [],
      timer: null
    }
  },
  methods: {
    send() {
      this.$http.post('/someUrl', {message: this.message})
      this.message = '';
      },
      stop() {
        clearInterval(this.timer)
        this.timer = null;
      },
      continuerequest() {
        if(!this.timer){
          createinterval.call(this);
        }
      }
  },
  mounted(){
   // this.timer = createinterval.call(this);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.inputstyle {
  width: 600px;
  padding: 5px;
  font-size: 16px;
}
.formstyle {
  width: 800px;
}
</style>
