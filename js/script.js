const { createApp } = Vue

createApp({
  data() {
      return {
          thingsToDo: [{
                  todo: "lavare i denti",
                  done: false
              },
              {
                  todo: "fare la colazione",
                  done: false
              },
              {
                  todo: "prendere il treno",
                  done: false
              },
              {
                  todo: "andare a lezione",
                  done: false
              },
              {
                  todo: "mangiare la colazione",
                  done: false
              }
          ],
          text: "",
          error: false
      }
  },
  methods: {
      insert() {
          if (this.text.length < 3) {
              this.error = true;
              return
          }
          const newTodo = {
              todo: this.text,
              done: false,
          }
          this.thingsToDo.push(newTodo);
          this.text = "";
      },
      deleteList() {
          this.thingsToDo.splice(this.index, 1)
      },
      checked(index) {
          if (this.thingsToDo[index].done === false) { //Se done è falso
              this.thingsToDo[index].done = true; //Passa a true
          } else {
              this.thingsToDo[index].done = false; //Se era vero, ripassa a false

          }
      }
  }
}).mount('#app')