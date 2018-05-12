const baseURL = "https://api.github.com/repos/atom/atom";

const Responses = {

        template: '#responses-template',

        data: () => ({
            issues: [],
            labels: [],
            searchKey: "",

            query: "/issues?",
            selectedState: "",
            checkedLabels: [],
            selectedSort: "",
            direction: ""
            // since: YYYY-MM-DDTHH:MM:SSZ, lazy to implement this for now :)
        }),

        mounted() {
            this.getResponses('issues', '/issues?');
            this.getResponses('labels', '/labels?');
        },

        methods: {
            getResponses: function(type,queryToFetch) {
                queryToFetch += "per_page=100&";
                axios.get(baseURL + queryToFetch).then( res => {
                    if (res.data == null || res.data.length == 0) {
                      alert("Such filtering combination does not return any valid issue...");
                    }
                    if (type=="issues") {
                      this.issues = res.data;
                    } else if (type=="labels") {
                      this.labels = res.data;
                    }
                }).catch( err => {
                    console.log(err);
                })
            },
            generateQuery: function() {
                if (this.selectedState) {
                  this.query += "state=" + this.selectedState + '&';
                }
                if (this.checkedLabels.length != 0) {
                  this.query += "labels=";
                  var index = 0;
                  for (index = 0; index < this.checkedLabels.length-1; ++index) {
                    this.query += this.checkedLabels[index] +',';
                  }
                  this.query += this.checkedLabels[index] + '&';
                }
                if (this.selectedSort) {
                  this.query += "sort=" + this.selectedSort + '&';
                }
                if (this.direction) {
                  this.query += "direction=asc&";
                }
            },
            initiateQuery: function() {
                this.generateQuery();
                this.issues = this.getResponses('issues',this.query);
                this.query = "/issues?";
            }
        }
};

Vue.component('responses', Responses);

new Vue({
  el: '#app'
});
