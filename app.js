const form = document.querySelector('#link-form');
const input = document.querySelector('.main-input');
const linkResults = document.querySelector('.links-shortened-results');

const loader = document.querySelector('#loading');

const displayLoading = () => {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 30000);
}

const hideLoading = () => {
    loader.classList.remove("display");
}

const shortenLink = (e) => {
    e.preventDefault();
    displayLoading();
    const inputValue = input.value;
    const shrtcodeAPI = `https://api.shrtco.de/v2/shorten?url=${inputValue}`;

    const errorText = document.querySelector('.error-text');

    if (!inputValue) {
        errorText.style.display = 'block';
      } else {
        errorText.style.display = 'none';
      }

    fetch(shrtcodeAPI)
        .then((response) => response.json())
        .then((data) => {
            let div = document.createElement('div');
            let shortenedDiv = document.createElement('div');
            let originalIP = document.createElement('p');
            let shortenedIP = document.createElement('p');
            let copyButton = document.createElement('button');

            originalIP.textContent = data.result.original_link;
            shortenedIP.textContent = data.result.short_link;
            copyButton.textContent = 'Copy';

            linkResults.insertAdjacentElement('afterbegin', div);
            div.appendChild(originalIP);
            div.appendChild(shortenedDiv);
            shortenedDiv.appendChild(shortenedIP);
            shortenedDiv.appendChild(copyButton);

            hideLoading();

            function copyLink() {
                let copied = shortenedIP.textContent;
      
                navigator.clipboard.writeText(copied).then(() => {
                  copyButton.textContent = 'Copied!';
                  copyButton.style.background = 'hsl(257, 27%, 26%)';
                });
              }

            form.reset();

            copyButton.addEventListener('click', copyLink);
        });
}

form.addEventListener('submit', shortenLink);