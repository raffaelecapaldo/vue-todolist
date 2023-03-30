const {
    createApp
} = Vue

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
                    todo: "pranzare",
                    done: false
                }
            ],
            text: "",
            error: false,
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
            this.error = false;
            setTimeout(this.todoColor) //Usato setTimeout per rallentare di un minimo l'esecuzione, altriimenti
            //l'ultimo li sarebbe rimasto bianco
            this.saveList();//Da qui in poi per ogni modifica all'array, salvalo nel localstorage


        },
        deleteList(index) {
            this.thingsToDo.splice(index, 1)
            this.saveList();

        },
        checked(index) {
            if (this.thingsToDo[index].done === false) { //Se done è falso
                this.thingsToDo[index].done = true; //Passa a true
            } else {
                this.thingsToDo[index].done = false; //Se era vero, ripassa a false

            }
            this.saveList();
        },
        randomHex() {
            //Si ringrazia: https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-11.php
            let n = (Math.random() * 0xfffff * 1000000).toString(16); //Genera un numero casuale tra 0 e 1 con Math.random, moltiplicalo per il max valore esadecimale possibile e a sua volta moltiplicalo per un
            //numero abbastanza grande da permettere di avere un'ampia scelta di colori abbastanza unici nella propria pagina, converti poi il numero in una stringa base 16 (esadecimale)
            return '#' + n.slice(0, 6); //Ritorna # (simbolo per scrivere un hex in css), + la stringa precedente di max lunghezza 6 (quindi taglia la stringa da indice 0 per lunghezza 6)

        },
        todoColor() {
            for (li of this.$refs.todolist) {
                if (!li.style.background) {

                    li.style.background = this.randomHex()
                }
            }
        },
        saveList() {//Converti in stringa e salva in localstorage come item things
            localStorage.setItem('things', JSON.stringify(this.thingsToDo));
        }

    },
    created() {//Quando viene creata l'app, se esiste una stringa things nel locastorage, recuperala e assegnala all'array di oggetti principale
        //non a mounted altrimenti viene scritto l'array dichiarato in data (troppo tardi)
        if (localStorage.getItem('things') === null) {
        }
        else {
            this.thingsToDo = JSON.parse(localStorage.getItem('things'));//Riprendi da stringa e ottieni array di oggetti
        }
    },
    mounted() {
        this.todoColor();
    }
}).mount('#app')