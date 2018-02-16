(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;


        function addImage(){
          let htmlContent = '';
          const data = JSON.parse(this.responseText);

          if(data && data.results && data.results[0]) {
            const firstImage = data.results[0];
            htmlContent = `
              <figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}" />
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
              </figure>
            `;
          } else {
            htmlContent = `<div class="erorr-no-image">No images found</div>`
          }

          responseContainer.insertAdjacentHTML = ('afterbegin', htmlContent);
        }

        searchedForText = 'hippos';
        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 2f8dd55983a8084e313a47fbbdee8bb04204c717818973b423e09ac7786083b4');
        unsplashRequest.send();


        function addArticles () {
          let htmlContent = '';
          const data = JSON.parse(this.responseText);

          if(data && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map((article) => {
              `<li class="article">
                <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
              </li>`
            }).join('') + '</ul>';
          } else {
            htmlContent = `<div class="erorr-no-article">No articles available</div>`
          }

          responseContainer.insertAdjacentHTML = ('beforeend', htmlContent);
        }

        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=3c357a84a71c4ed5b19da32e9dd29d35`);
        articleRequest.send();

    });
})();
