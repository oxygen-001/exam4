const closeItem = document.querySelector(".closeimg");
const addButton = document.querySelector(".addButton");
const saveButton = document.querySelector(".saveButton");
const imgUrl = document.querySelector("#imgUrl");
const brand = document.querySelector("#brand");
const name1 = document.querySelector("#name");
const type = document.querySelector("#type");
const price = document.querySelector("#price");
let values = [];

document.querySelector(".logOutButton").addEventListener("click", () => {
  window.location.replace("../index.html");
});

closeItem.addEventListener("click", (e) => {
  document.querySelector(".Formodal").style.transform = "translateY(-200%)";
});

addButton.addEventListener("click", () => {
  document.querySelector(".Formodal").style.transform = "translateY(0px)";
});

saveButton.addEventListener("click", getCardsValur);

function getCardsValur() {
  let obj = {
    imgUrl: imgUrl.value,
    brand: brand.value,
    name1: name1.value,
    type: type.value,
    price: price.value,
  };

  document.querySelector(".Formodal").style.transform = "translateY(-200%)";

  let values = Object.keys(obj).filter((key) => !obj[key]);

  fetch("https://exam1-2a2f0-default-rtdb.firebaseio.com/cards.json", {
    method: "POST",

    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (!res.ok) throw new Error("something wrong");
      return res.json();
    })
    .then((res) => {
      console.log(res);
      getAllBooks();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
}

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
    })
    .catch((err) => {})
    .finally(() => {
      renderBookElements();
    });
}

function renderBookElements() {
  let result = values.map((item,index) => {
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
                <button onclick="deleteBookItem(${index})" class="delete_button">Delete</button>
          
    </div>`;

    return result;
  });

  document.querySelector(".forAdminCards").innerHTML = result;
  console.log(result);
}

getAllBooks();

function deleteBookItem(id) {
  let findedElement = values.find((item, index) => index === id);

  fetch(
    `https://exam1-2a2f0-default-rtdb.firebaseio.com/cards/${findedElement.id}.json`,
    {
      method: "DELETE",
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("something wrong : ");

      return res.json();
    })
    .then((res) => {
      console.log("malumot ochdi");

      getAllBooks();
    })
    .catch((err) => {})
    .finally(() => {});
}
