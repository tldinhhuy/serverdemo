<template>
  <div>
<div class="container-fluid">
 <div class="row bkheader">
  <div class="col-xs-3 col-sm-2">
   <img src="./assets/LogoBK.png" class="w100" alt="">
   <p class="text-center text-white">Ho Chi Minh University of Technology</p>
  </div>
  <div class="col-xs-9 col-sm-10 flex-center">
   <h1 class="text-white">WEB-APLLICATION DEMO PELAB</h1>
  </div>
 </div>
 <div class="row">
  <div class="col-sm-4">
 <table>     
            <tr>
                    <td style="width: 50%"><b>Học vị</b></td>  
                    <td><b>Họ và tên</b></td> 
            </tr>
            <tr>
                <td>1. PGS. TS</td>
                <td>Lê Minh Phương</td>
            </tr>                 
            <tr>
                <td>2. Th.S</td>
                <td>Nguyễn Minh Huy</td>
            </tr>

	     <tr> 
		<td> 3. Th.S  </td>
		<td>Nguyễn Hoài Phong </td>
	    </tr>

	<tr>
		<td> 4.    </td>
		<td>Tạ Lê Đình Huy</td>
  </tr>
  
  <tr>
    <td> 5.    </td>
    <td>Bùi Đức An</td>
  </tr>




        </table>
   <!-- Имена -->

   
  </div>
  <div class="col-sm-8">
   <!-- старый код -->
<form class = "formstyle" v-on:submit.prevent="send()">
    <p>Cài đặt thời gian lấy mẫu (s)</p>
          <div class="input-group mb-3">
              <input type="text" class="form-control inputstyle" v-model="message">
              <div class="input-group-append">
                <button class="btn btn-outline-success" type="submit">Send</button>
              </div>
            </div>            
      </form>
      <!-- <button class="btn btn-outline-danger" v-on:click="stop()">Stop</button>
      <button class="btn btn-outline-warning" v-on:click="continuerequest()">Show</button> -->
   <!-- ul>li заменяем на: -->

   <table class="table table-striped" style="table-layout: fixed;overflow: hidden;">
     <thead>
       <tr>
         <th scope="col">Thiết bị:</th>
         <th scope="col">Độ dẫn điện (uS)</th>
         <th scope="col">Độ mặn (‰)</th>
       </tr>
     </thead>
      <tbody>
       <tr v-for="d in data" :key="d.id">
         <td>Thiết bị 1</td>
         <td v-if="d.resp" class="text-center"  colspan="2">{{d.resp}}</td>
         <td v-if="!d.resp">{{d.c}}</td>
         <td v-if="!d.resp">{{d.s}}</td>
       </tr>
     </tbody>
   </table>

<table class="table table-striped" style="table-layout: fixed;overflow: hidden;">
      <thead>
        <tr>
          <th>Thiết bị 2</th>
          <th> 0 </th>
          <th> 0 </th>
        </tr>
      </thead>
       <tbody>
        <tr>
         
        </tr>
      </tbody>
    </table>
  </div>
 </div>
</div>


  </div>  
</template>

<script>
  function createinterval() {
    this.timer = setInterval(() => {
           this.$http.get('/getData').then(response => {
              if(response.body.data && response.body.data.length){
                let newData = response.body.data.map((dt) => {
		return Object.assign(dt , {id: this.generatedID++})
               
                })
    this.data = [].concat(newData.reverse(), this.data);
		this.data = this.data.splice(0, 1);
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
   createinterval.call(this);
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
.w100 {
 width: 100%;
}
.flex-center {
display: flex;
align-items: center;
justify-content: center;
}
.bkheader {
background-color: #0795df;
margin-bottom: 15px;
}
</style>
