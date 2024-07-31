class API {
  async list() {
    return await fetch("/webhook/list").then((res) => res.json());
  }
  async get(id) {
    return fetch(`/webhook/get/${id}`).then((res) => res.json());
  }
  async delete(id) {
    return fetch(`/webhook/delete/${id}`).then((res) => res.json());
  }
}

const api = new API();

function checkOnlyOne(element) {
  const checkboxes = document.getElementsByName("webhookType");

  checkboxes.forEach((cb) => {
    cb.checked = false;
  });

  element.checked = true;
}

window.onload = () => {
  const editEle = document.querySelector("#edit");
  const popupEle = document.querySelector("#popup");
  editEle.addEventListener("click", (e) => {
    popupEle.classList.toggle("on");
  });

  const timeTableEle = document.querySelector("#timeTable > tbody");
  const reqHeaderEle = document.querySelector("#reqHeader");
  const reqBodyEle = document.querySelector("#reqBody");

  const ipEle = document.querySelector("#ip");
  const methodEle = document.querySelector("#method");
  const pathEle = document.querySelector("#path");
  const qsEle = document.querySelector("#querystring");

  function init() {
    ipEle.innerHTML = "";
    methodEle.innerHTML = "";
    pathEle.innerHTML = "";
    qsEle.innerHTML = "";
    reqHeaderEle.innerHTML = "";
    reqBodyEle.innerHTML = "";
  }
  function setRequest(data) {
    ipEle.innerText = data.ip;
    methodEle.innerText = data.method;
    pathEle.innerText = data.path;
    qsEle.innerText = data.query;

    Object.keys(data.headers).forEach((key) => {
      const tr = mk("tr");
      const td1 = mktxt("td", key);
      const td2 = mktxt("td", data.headers[key]);
      tr.appendChild(td1);
      tr.appendChild(td2);
      reqHeaderEle.appendChild(tr);
    });
    Object.keys(data.body).forEach((key) => {
      const tr = mk("tr");
      const td1 = mktxt("td", key);
      const td2 = mktxt("td", data.body[key]);
      tr.appendChild(td1);
      tr.appendChild(td2);
      reqBodyEle.appendChild(tr);
    });
  }
  function setList(array) {
    const [_, id, time, method_path] = array;

    const tr = mkcls("tr", id);
    const td1 = mkcls_with_txt("td", id, time);
    const td2 = mkcls_with_txt("td", id, method_path);

    tr.appendChild(td1);
    tr.appendChild(td2);

    timeTableEle.appendChild(tr);
    tr.addEventListener("click", (e) => {
      init();
      const id = e.target.classList[0];
      api.get(id).then((data) => setRequest(data));
    });
  }
  api.list().then((json) => {
    json.forEach(setList);
  });
};
