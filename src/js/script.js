let folderList = document.querySelectorAll(".folder");
folderList.forEach(folder => {
    folder.querySelector(".folderName").addEventListener("click", e => {
        folder.classList.toggle("open");
    });
});



document.querySelector("#dismiss").addEventListener("click", e => {
    document.querySelector(".notification").classList.remove("show", "warning", "notify");
});


document.querySelector("#darkThemeSwitch").addEventListener("input", e => {
    if(e.target.checked){
        document.querySelector("body").classList.add('theme-dark');
        document.querySelector("body").classList.remove('theme-light');
    } else {
        document.querySelector("body").classList.add('theme-light');
        document.querySelector("body").classList.remove('theme-dark');
    }
    console.log(e)
});



document.querySelector(".codeEditer").focus();
document.querySelector(".codeEditer").addEventListener("keypress", e => {
    Notifier.warn("Do you really think that I would allow you to type in here?! 😏");
});

class Notifier {
    static warn(message) {
        Notifier._display(message, "warning");
    }
    static notify(message) {
        Notifier._display(message, "notify");
    }
    static _display(message, type) {
        document.querySelector(".notification #message").innerHTML = message;
        document.querySelector(".notification").classList.add(type, "show");
        setTimeout(() => {
            document.querySelector(".notification").classList.remove(type, "show");
        }, 5000);
    }
}






new Typer(document.querySelector('.type'));
