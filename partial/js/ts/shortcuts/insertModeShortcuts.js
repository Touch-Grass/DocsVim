import { docs } from "../docs";
docs.textTarget.addEventListener('keydown', (e) => {
    document.addEventListener('keydown', (e) => {
        console.log("key pressed", e.code);
    });
});
