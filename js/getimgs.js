console.log("i am down");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == "getImg") {
    //判断是否为要处理的消息
    sendResponse({
      list: getImgListUrl(),
    });
  }

});

// 获取当前web页面的所有图片信息
function getImgListUrl() {
  const imgDoms = document.querySelectorAll("img");
  const imgReg = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
  let urlList = [];
  for (const item of imgDoms) {
    if (imgReg.test(item.src)) {
      urlList.push(item.src)
    }
  }

  return urlList;
}
