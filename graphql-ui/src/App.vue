<template>
  <div id="app">
    <h3>Example 1</h3>
     {{ this.projects }}
    <div>
      Data: {{ projects }}
    </div>
    <button @click="getProject">Get Project </button>
    <hr> 
  </div>
</template>
<script>
// import axios from 'axios'
import service from "/home/wohlig/Documents/htdocs/graphql/node-react-graphql/graphql-ui/src/service/apiservice.js";

export default {
  name: 'app',
  data () {
    return {
      example1: '',
      projects:"",
      selected:{}
    }
  },
  methods: {
    getProject(){
      this.selected={
       query: `{ 
          projects { 
     
    name,
    
          } 
        }`
      }
service.getProject(this.selected,data => {
        this.$toaster.success("We found out bus for you");
        this.projects=data.data.projects

      })
    }
  }
}
</script>