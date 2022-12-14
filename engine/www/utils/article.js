// usage: client side of the wiki
// not meant to be edited by the wiki admin, see README.md

// elements

let title = document.querySelector('#title');
let articleBody = document.querySelector('#articleBody');
let textEditor = document.querySelector('#textEditor');
let editor = document.querySelector('#editor');

let editButton = document.querySelector('#editButton');
let saveButton = document.querySelector('#saveButton');
let rawButton = document.querySelector('#rawButton');

// janky way of getting article title from url, should probably fix

const articleTitle = window.location.pathname.split('/')[2];
const articleTitleSpaces = articleTitle.replace(/_/g, ' ');

title.textContent = articleTitleSpaces;
document.title = articleTitleSpaces;

(async () => {
  let res = await fetch('/engine/get', {
    method: 'POST',
    body: JSON.stringify({ name: articleTitle }),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (res.ok) {
    let data = await res.json();
    articleBody.innerHTML = data;
  }
})();

editButton.addEventListener('click', async () => {
  editor.style = 'display:block;';
  articleBody.style = 'display:none;';

  let res = await fetch('/engine/raw', {
    method: 'POST',
    body: JSON.stringify({ name: articleTitle }),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (res.ok) {
    let data = await res.json();
    textEditor.value = data;
  }
});

saveButton.addEventListener('click', async () => {
  let res = await fetch('/engine/modify', {
    method: 'POST',
    body: JSON.stringify({
      name: articleTitle,
      content: textEditor.value,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (res.ok) {
    window.location.reload();
  }
});

rawButton.addEventListener('click', () => {
  window.location.href = `/engine/raw/${articleTitle}`;
});
