const baseURL = "https://api.github.com/repos/atom/atom";


const Responses = {

        template: '#responses-template',

        data: () => ({
            responses: [],
            searchKey : "",

            query: "/issues?",
            state: "",
            labels: "",
            sort: "",
            direction: ""
            // since: YYYY-MM-DDTHH:MM:SSZ, lazy to implement this :)
        }),

        mounted() {
            this.getResponses('/issues');
        },

        methods: {
            getResponses(queryToFetch) {
                axios.get(baseURL + queryToFetch).then( res => {
                    this.responses = res.data
                    console.log(this.responses); // For debugging purposes only
                }).catch( err => {
                    console.log(err);
                })
            },
            generateQuery: function() {
                if (this.state) {
                  this.query += "state=" + this.state + '&';
                }
                if (this.labels) {
                  this.query += "labels=" + this.labels + '&';
                }
                if (this.sort) {
                  this.query += "sort=" + this.sort + '&';
                }
                if (this.direction) {
                  this.query += "direction=" + this.direction + '&';
                }
                console.log("generateQuery is called..." + this.query);
            },
            initiateQuery: function() {
                this.generateQuery();
                this.getResponses(this.query);
                this.query = "/issues?";
            }
        },

        computed: {
            filteredResponses() {
                return this.responses.filter( res => {
                    return res.title.includes(this.searchKey);
                })
            }
        }
};

Vue.component('responses', Responses);

new Vue({
  el: '#app'
});
