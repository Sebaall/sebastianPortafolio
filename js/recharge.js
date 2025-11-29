window.addEventListener("load", () => {
    setTimeout(() => window.scrollTo(0, 0), 10);
});

window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};
