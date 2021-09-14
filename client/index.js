var app = new Vue({
  el: "#app",
  data: {
    message: [],
    state: true
  },
  methods: {
    fetchData: function () {
      fetch("http://localhost:3000")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          app.message = data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    removeData: function (id) {
        this.message.splice(id, 1);
    },
    changeState: function () {
        this.state = !this.state;
    },
    addTicket: function (e) {
      console.log(e)
      let form =   new FormData(e.target)
      let user = form.get("user")
      let text = form.get("message")
      let priority = form.get("priority")
      // if its empy return 
      if (user == "" || text == "" || priority == "") return
      fetch("http://localhost:3000/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: user,
          message: text,
          priority: priority
        })
      }).then(res=>res.json())
        .then(data=>{
          console.log(data)
          this.fetchData();
          this.state = true;
        }
      )
        

    }
  },
  created: function () {
    this.fetchData();
  },
});
