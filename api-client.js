//
//   -----------------Get Data At Start--------------------
//

async function paginaLaden(jsonData) {
  console.log("paginaLaden() starting with jsonData:");
  console.log(jsonData);

  for (let nummer of jsonData) {
    const listItem = document.createElement("li"); // Create element
    listItem.className = "todoItem";
    listItem.setAttribute("id", nummer._id);
    // console.log(nummer._id);
    listItem.innerHTML = nummer.description;

    const huidigeList = document.querySelector("ul"); //  Selecteer waarin het moet
    huidigeList.appendChild(listItem); // plaats element

    // nu de prullenbak image plaatsen

    let prullenbakImage = document.createElement("img"); // creeer een image element in de DOM
    prullenbakImage.className = "prullenbak";
    prullenbakImage.src = "/img/prullenbak.jpg";

    listItem.appendChild(prullenbakImage);
  }
}
async function getDataStart() {
  try {
    let res = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    let json = await res.json();
    paginaLaden(json);
    //
    //   -----------------Data in de DOM plaatsen At Start--------------------
    //

    return json;
  } catch (error) {
    console.log("foutmelding: ", error);
  }
}

//
//   -----------------------------------------AddEvent Listener op Button--------------------------------------------------
//

const pakButton = document.querySelector("button");
pakButton.addEventListener("click", function (event) {
  event.preventDefault();
  let resultaat = document.getElementById("taak").value;

  //
  // ------------------Na click button, Post nieuwe Data--------------------
  //
  const data = { description: resultaat, done: false };

  async function postData() {
    try {
      let res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      let json = await res.json();
      console.log("post data inner is: ", json);
      //let postData2 = postData();
      //console.log("post data is: ", postData2);

      //
      //   ------------------------Get new Data---------------------------
      //
      paginaLaden([json]);
      return json;
    } catch (error) {
      console.log("foutmelding: ", error);
    }
  }
  postData();
  return;

  async function getData() {
    try {
      let res = await fetch("http://localhost:3000/", {
        method: "GET",
        headers: { "content-type": "application/json" },
      });

      let json = await res.json();

      // eerst list nog verwijderen uit de DOM------------------------------------===>>>>>>
      /* 

      let x = 0;
      for (x = 0; x < 1000; x++) {
        const ouder = document.getElementById("ingevoerdeLijst");
        const kind = ouder.getElementsByTagName("li")[x];
        console.log("kinds is: ", kind);
        ouder.removeChild(kind);
      }

       */

      function verwijder() {
        for (let x of json) {
          const ouder = document.getElementById("ingevoerdeLijst");
          const kind = ouder.getElementsByTagName("li")[0];

          console.log("kinds is: ", kind);

          ouder.removeChild(kind);
        }
      }

      //    verwijder();

      //--------------------------------------------------------------------------===>>>>>>

      //
      //   -----------------Data in de DOM plaatsen--------------------
      //

      for (let nummer of json) {
        const listItem = document.createElement("li"); // Create element
        listItem.className = "todoItem";
        listItem.innerHTML = nummer.description;

        const huidigeList = document.querySelector("ul"); //  Selecteer waarin het moet
        huidigeList.appendChild(listItem); // plaats element

        let prullenbakImage = document.createElement("img"); // creeer een image element in de DOM
        prullenbakImage.className = "prullenbak";
        prullenbakImage.src = "/img/prullenbak.jpg";

        listItem.appendChild(prullenbakImage);
      }

      return json;
    } catch (error) {
      console.log("foutmelding: ", error);
    }
  }
  //getData();
});

// HOOFDSTUK 2
//
//   -----------------------------------------AddEvent Listener op List Item--------------------------------------------------
//
const gekozenPrullenbak = document.getElementById("ingevoerdeLijst");
gekozenPrullenbak.addEventListener("click", function (event) {
  event.preventDefault();

  console.log("event.target is: ", event.target);
  console.log("event.target.id is: ", event.target.id);

  localHost = "http://localhost:3000/" + event.target.id;
  console.log("Local host is: ", localHost);

  async function deleteData() {
    try {
      let res = await fetch(localHost, {
        method: "DELETE",
      });
      //let json = await res.json();
      //console.log("deleteData() deleted: ", json);
      return true;
    } catch (error) {
      console.log("foutmelding: ", error);
      return false;
    }
  }

  let result = deleteData();
  if (result === false) {
    return;
  }
  console.log("removing from list, id: " + event.target.id);

  const kind = document.getElementById(event.target.id);
  console.log("kinds is: ", kind);
  const ouder = document.getElementById("ingevoerdeLijst");
  ouder.removeChild(kind);
  return;

  // ------------------------------------ opnieuw refresh ----------------------

  //   ------------------------Get new Data---------------------------
  //

  async function getData() {
    try {
      let res = await fetch("http://localhost:3000/", {
        method: "GET",
        headers: { "content-type": "application/json" },
      });

      let json = await res.json();

      // eerst list nog verwijderen uit de DOM------------

      function verwijder() {
        for (let x of json) {
          const ouder = document.getElementById("ingevoerdeLijst");
          const kind = ouder.getElementsByTagName("li")[0];
          console.log("kinds is: ", kind);
          ouder.removeChild(kind);
        }
      }

      verwijder();

      //
      //   -----------------Data in de DOM plaatsen refresh--------------------
      //

      for (let nummer of json) {
        const listItem = document.createElement("li"); // Create element
        listItem.className = "todoItem";
        listItem.setAttribute("id", nummer._id);
        // console.log(nummer._id);
        listItem.innerHTML = nummer.description;

        const huidigeList = document.querySelector("ul"); //  Selecteer waarin het moet
        huidigeList.appendChild(listItem); // plaats element

        // nu de prullenbak image plaatsen

        let prullenbakImage = document.createElement("img"); // creeer een image element in de DOM
        prullenbakImage.className = "prullenbak";
        prullenbakImage.src = "/img/prullenbak.jpg";

        listItem.appendChild(prullenbakImage);
      }

      return json;
    } catch (error) {
      console.log("foutmelding: ", error);
    }
  }
});
