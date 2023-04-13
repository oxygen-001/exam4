let globalImages;
let step = 3;
let page = 1;

function getAllBooks() {
  fetch("https://exam1-2a2f0-default-rtdb.firebaseio.com/cards.json", {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) throw new Error("something wrong");
      return res.json();
    })
    .then((res) => {
      values = Object.keys(res || {}).map((item) => {
        return {
          ...res[item],
          id: item,
        };
      });
      console.log(values);
      renderPageinationElements(values.length);
      renderBookElements(choppedBookItems(values));
    })
    .catch((err) => {})
    .finally(() => {
      renderBookElements();
    });
}

function renderBookElements() {
  let result = choppedBookItems(values.map((item) => {
    let result = `
    <div class="AdminCard">
    <div class="forRelative">
        <img class="test_img" src="${item.imgUrl} " alt="photo">
        <p class="brandText">${item.brand}</p>
    </div>

    <h4 class="selectName">${item.name1}</h4>
        <p class="selectType">${item.type}</p>
        <div class="price">
            <p class="price_text">$${item.price}</p>
            <img src="./img/f.svg" alt="photo">
        </div>
</div>`;

    return result;
  }));

  document.querySelector(".forSelectCards").innerHTML = result;
  console.log(result);
}

getAllBooks();

function renderPageinationElements(length) {
  let result = "";
  let pageNumbers = Math.ceil(length / step);

  for (let i = 0; i < pageNumbers; i++) {
    result += ` <li class="page-item"><button class="page-link" href="#">${i+1}</button></li>`;

    
  }

  document.querySelector(".pagination").innerHTML = result;
  document.querySelectorAll(".page-link").forEach((item) => {
    item.addEventListener("click", (e) => {
      page = +e.target.innerHTML;
      getAllBooks();
    });
  });
}

function choppedBookItems(books) {
  let start = page * step - step;
  let end = start + step;

  return books.slice(start, end);
}




document.querySelector('.logInButton').addEventListener('click',()=>{
    window.location.replace("../login.html");
})
