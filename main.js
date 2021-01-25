console.log("i am main");
const btn = document.querySelector(".btn");

// 扩展向content_script通讯
btn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "getImg" },
      async function (response) {
        if (response && response.list) {
          markImgDom(response.list)
          for (const item of response.list) {
            await delayFn(500)
            downloadImg(item)
            console.log(response.list);
          }
        }
      }
    );
  });
});

// 生成预览图
function markImgDom(imgUrlList) {
  const ulDom = document.querySelector('ul')
  let imgStr = `
    <li>
      ${imgUrlList.map(e => (
        `<img src="${e}" alt="">`
      ))}
    </li>
  `
  imgStr = imgStr.replaceAll(',', '')
  ulDom.innerHTML = imgStr
}

// 下载
function downloadImg(url) {
  var x = new XMLHttpRequest();
  x.open("GET", url, true);
  x.responseType = "blob";
  x.onload = function (e) {
    var url = window.URL.createObjectURL(x.response);
    var a = document.createElement("a");
    a.href = url;
    a.download = "";
    a.click();
  };
  x.send();
}

async function delayFn(timer) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timer);
  })
}
