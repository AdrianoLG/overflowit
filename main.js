chrome.storage.sync.get(['list'], list => {
   Object.values(list)[0].forEach(item => {
      if(window.location.host == item.url) {
         defaultScrolled();
      }
   });
});


chrome.runtime.onMessage.addListener(popupResponse);

function popupResponse(request, sender, sendResponse) {
   if(request.code == 1) {
      document.getElementsByTagName('body')[0].style.overflow = 'scroll';
   } else {
      console.log(message);
   }
}

function defaultScrolled() {
   setTimeout(() => {
      document.getElementsByTagName('body')[0].style.overflow = 'scroll';
   }, 1000);
}