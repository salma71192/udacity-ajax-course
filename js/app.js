(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 2f8dd55983a8084e313a47fbbdee8bb04204c717818973b423e09ac7786083b4'
            }
        }).then(function(response) {
            return response.json();
        }).then(addImage);

        function addImage(images) {
          const firstImage = images.results[0];

          responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                  <img src="${firstImage.urls.small}" alt="${searchedForText}">
                  <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
              </figure>`
          );
        }
    });
})();
