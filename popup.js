var count = 0;

getList();

window.onload = function() {
	document.getElementById('submit').onclick = function(e) {
		e.preventDefault();
		var name = document.getElementById('name').value;
		var url = document.getElementById('url').value;
		if (name && url) {
			chrome.storage.sync.get(
				[
					'list'
				],
				list => {
					if (list) {
						var tempList = Object.values(list)[0] || [];
						tempList.push({ name: name, url: url });
						chrome.storage.sync.set({ list: tempList }, () => {
                     document.getElementById('name').value = '';
                     document.getElementById('url').value = '';
							document.getElementById('list').innerHTML = '';
							count = 0;
                     getList();
                     closeLinks();
						});
					} else {
						var tempList = [
							{ name: name, url: url }
						];
						setList(tempList);
					}
				}
			);
		}
   };

   document.getElementsByTagName('button')[0].onclick = function(e) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
         chrome.tabs.sendMessage(tabs[0].id, {code: 1});
      });
   };

   closeLinks();
};

function getList() {
	chrome.storage.sync.get(
		[
			'list'
		],
		list => {
			if (Object.values(list)[0].length > 0) {
				Object.values(list)[0].forEach(item => {
					count++;
					document.getElementById('list').innerHTML +=
						'<li title="' + item.url + '"><p>' + item.name + '</p><a href="#" class="close">x</a></li>';
				});
			} else {
				document.getElementById('list').innerHTML = '<li><i>No elements in the list</i></li>';
			}
		}
	);
}

function setList(tempList) {
   chrome.storage.sync.set({ list: tempList }, () => {
      document.getElementById('list').innerHTML = '';
      count = 0;
      getList();
   });
}

function closeLinks() {
   setTimeout(() => {
      var links = document.getElementsByClassName('close');
      for(var i = 0; i < links.length; i++) {
         links[i].onclick = function(e) {
            e.preventDefault();
            var item = this.parentNode.childNodes[0].textContent;
            chrome.storage.sync.get(['list'], list => {
               console.log(Object.values(list)[0]);
               var tempList = Object.values(list)[0];
               for(var i = 0; i < tempList.length; i++) {
                  if(tempList[i].name == item) {
                     tempList.splice(i, 1);
                     break;
                  }
               }
               setList(tempList);
            });
         };
      }
   }, 1000);
}
