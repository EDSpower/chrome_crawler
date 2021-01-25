console.log("i am main");
const btn = document.querySelector(".btn");

let imgUrlList = []

// 初始化
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { type: "getImg" },
    function (response) {
      if (response && response.list) {
        const descDom = document.querySelector('.desc')

        imgUrlList = response.list
        descDom.innerHTML = `当前页面监测到【${imgUrlList.length}】张图片`
        markImgDom(response.list);
      }
    }
  );
});

// 点击扩展向content_script通讯
btn.addEventListener("click", async () => {
  for (const item of imgUrlList) {
    await delayFn(800);
    downloadImg(item);
  }

  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   chrome.tabs.sendMessage(
  //     tabs[0].id,
  //     { type: "getImg" },
  //     async function (response) {
  //       if (response && response.list) {
  //         markImgDom(response.list);

  //       }
  //     }
  //   );
  // });
});

// 生成预览图
function markImgDom(imgUrlList) {
  const ulDom = document.querySelector("ul");
  let imgStr = `
    <li>
      ${imgUrlList.map((e) => `<img src="${e}" alt="">`)}
    </li>
  `;
  imgStr = imgStr.replaceAll(",", "");
  ulDom.innerHTML = imgStr;
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
      resolve();
    }, timer);
  });
}
