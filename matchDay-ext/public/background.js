/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ favoritesTeams: ["Vitality", "Karmine"] });
    chrome.storage.sync.set({ token: "" });
    console.log('Chrome extension successfully installed!');
    return;
});


/*global chrome*/
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });