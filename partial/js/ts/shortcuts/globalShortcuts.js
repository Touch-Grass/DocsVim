import { docs } from '../docs';
if (docs.keyListenerStatus === false) {
    console.log(docs.keyListenerStatus, "status");
    docs.textTarget.addEventListener('keydown', docs.keydownInit);
}
