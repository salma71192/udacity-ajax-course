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

          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        searchedForText = 'hippos';
        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 2f8dd55983a8084e313a47fbbdee8bb04204c717818973b423e09ac7786083b4');
        unsplashRequest.send();
    });
})();
