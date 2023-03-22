let script = new Vue({
    el:'#movies',
    data: {
        listMovies: [],
        listDetails: [],
        listSearch: [],
        path_image: 'https://image.tmdb.org/t/p/w220_and_h330_face',
        api_key: '?api_key=949ea06d80d3fbf73eb29a7f3d0d5e0a&language=pt-br',
        trending_link: 'https://api.themoviedb.org/3/trending/movie/week',
        movie_link: 'https://api.themoviedb.org/3/movie/',
        filter_link: 'https://api.themoviedb.org/3/search/movie',
    },

    mounted() {
        this.getMovies(),
        this.getMovie(),
        this.getSearch();
    },
    
    methods: {
        getMovies: function() {
            axios
                .get(this.trending_link + this.api_key)
                .then(response => {
                    this.listMovies = response.data.results
                    this.listMovies.sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1)
                });
        },
        getMovie: function(id) {
            var detail_movie_modal = new bootstrap.Modal(document.getElementById('detail_movie_modal'), {
                keyboard: false
            })
            detail_movie_modal.show()
            const data = document.querySelector("#date")
            axios
                .get(this.movie_link + id + this.api_key)
                .then(response => {
                    this.listDetails = response.data;
                    const date = new Date(this.listDetails.release_date)
                    const formatDate = Intl.DateTimeFormat("pt-br", {day:'numeric', month:'short', year:'numeric'})
                    data.innerHTML = formatDate.format(date);
                });
        },
    },
});
let script2 = new Vue({
    el:'#busca',
    data: {
        listSearch:[],
        path_image: 'https://image.tmdb.org/t/p/w220_and_h330_face',
        api_key: '?api_key=949ea06d80d3fbf73eb29a7f3d0d5e0a&language=pt-br',
        trending_link: 'https://api.themoviedb.org/3/trending/movie/week',
        movie_link: 'https://api.themoviedb.org/3/movie/',
        filter_link: 'https://api.themoviedb.org/3/search/movie',
    },
    mounted() {
    },
    methods: {
        getSearch: function(search) {
            axios
                .get(this.filter_link + this.api_key + '&query=' + search)
                .then(response => {
                    this.listSearch = response.data.results
                    this.listSearch.sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1)
                    script.listMovies = this.listSearch
                });
        }
    },
})
