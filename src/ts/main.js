"use strict";
const docs = {
    id: window.location.href.split('/document/d/')[1].split('/')[0],
    name() {
        var _a;
        return (_a = document.querySelector('.docs-title-input-label-inner').textContent) === null || _a === void 0 ? void 0 : _a.trim();
    },
};
console.log(docs.name);
