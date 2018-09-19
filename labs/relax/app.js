const $ = document.querySelector.bind(document);
let notify;
let timerValue;
let sessionTime;
let counter;

document.addEventListener("DOMContentLoaded", init);

function init() {
    localStorage.setItem("sessionTime", $("#session").value); // default value
    sessionTime = localStorage.getItem("sessionTime");
    $(".in").addEventListener(
        "animationiteration",
        function(event) {
            counter++;
            if (counter > JSON.parse(sessionTime)) {
                $("#counter").textContent = sessionTime; //prevent event workaround;
            } else {
                $("#counter").textContent = counter;
            }
        },
        false
    );
    $(".view").addEventListener("click", () => {
        counter = counter == 0 || counter == undefined ? 1 : null;
    $("#counter").classList.remove("fadeout");
    $("#counter").textContent = counter;
    $(".pulse").classList.toggle("animate");
    setTimeout(function() {
        $(".pulse").classList.toggle("animate");
        $("#counter").textContent = "Done!";
        $("#counter").classList.add("fadeout");
    }, sessionTime * 10000);
});

    // menu
    $(".menu-button").addEventListener("click", () => {
        $(".menu").classList.add("active");
    $("body").classList.add("prevent-click");
    notify = localStorage.getItem("notification");
    timerValue = localStorage.getItem("timerValue");
    console.log(notify, timerValue, sessionTime);

    $(".switch__input").checked = JSON.parse(notify);
    $("#timer").value = timerValue;
    $("#session").value = sessionTime;

    if (JSON.parse(notify)) {
        $("#wrapper-timer").classList.remove("disable");
    } else {
        $("#wrapper-timer").classList.add("disable");
    }
});

    $(".button-close").addEventListener("click", () => {
        $("body").classList.remove("prevent-click");
    $(".menu").classList.remove("active");
});

    $("#timer").addEventListener("input", e => {
        localStorage.setItem("timerValue", e.target.value);
});

    $("#session").addEventListener("input", e => {
        localStorage.setItem("sessionTime", e.target.value);
    sessionTime = localStorage.getItem("sessionTime");
});

    $(".switch__input").addEventListener("change", () => {
        if ($("#wrapper-timer").classList.contains("disable")) {
        $("#wrapper-timer").classList.remove("disable");
        localStorage.setItem("notification", true);
    } else {
        $("#wrapper-timer").classList.add("disable");
        localStorage.setItem("notification", false);
    }
});
}
