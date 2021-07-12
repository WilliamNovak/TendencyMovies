let button = new Vue({
    el:'#navbar',
    data: {
        listSearch: [],
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
                    var recebe = this.filter_link + this.api_key + '&query=' + search
                    if (recebe == this.filter_link + this.api_key + '&query=' + undefined){
                        alert('Desculpe, título não encontrado!')
                    } else{
                        this.listSearch = response.data.results
                        alert(recebe)
                    }
                });
        },
    }
});