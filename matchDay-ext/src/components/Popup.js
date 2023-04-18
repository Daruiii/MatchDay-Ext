import React, { useEffect, useState } from 'react';

// popup component
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: 'Bearer '
    }
};

/*global chrome*/
chrome.storage.sync.get(['token'], function (result) {
    options.headers.authorization = 'Bearer ' + result.token;
});

const PopupRoster = (teamId) => {
}

export default PopupRoster;