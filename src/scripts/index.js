// ---------------------------------------------------- constants
const burger = document.querySelector(".burger");
const menuPopup = document.querySelector(".popup");
const page = document.querySelector(".page");
const videoButton = document.querySelector(".performance__video-play");
const videoCover = document.querySelector(".performance__video-cover");
const videoIframe = document.querySelector(".performance__iframe");

// ---------------------------------------------------- functions
function openPopup(popup) {
    popup.classList.add("popup_opened");
    addCloseListeners();
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    deleteCloseListeners();
}

function setCloseListeners() {
    const popups = document.querySelectorAll(".popup");
    popups.forEach((popup) => {
        popup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                closePopup(popup);
            }
            if (evt.target.classList.contains("popup__close-button")) {
                closePopup(popup);
            }
        });
    });
}

const handleEscape = (evt) => {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
};

const swiperFeedback = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    direction: "horizontal",
    loop: true,

    pagination: {
        el: ".reviews__slider-feedback-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".reviews__slider-feedback-button-next",
        prevEl: ".reviews__slider-feedback-button-prev",
    },

    speed: 800,
    simulateTouch: true,
    grabCursor: true,

    breakpoints: {
        930: {
            slidesPerView: 2,
        },

        1321: {
            slidesPerView: 3,
        },
    },
});

const swiperReview = new Swiper(".swiperReview", {
    slidesPerView: 1,
    spaceBetween: 30,
    direction: "horizontal",
    loop: true,

    pagination: {
        el: ".reviews__slider-critique-pagination",
        clickable: true,
    },
    centeredSlides: false,
    autoHeight: true,

    navigation: {
        nextEl: ".reviews__slider-critique-button-next",
        prevEl: ".reviews__slider-critique-button-prev",
    },

    speed: 800,

    breakpoints: {
        1000: {
            slidesPerView: 1.5,
                    }
    },

});

// ---------------------------------------------------- listeners
burger.addEventListener("click", () => {
    openPopup(menuPopup);
});

const addCloseListeners = () => {
    page.addEventListener("keydown", handleEscape);
};

const deleteCloseListeners = () => {
    page.removeEventListener("keydown", handleEscape);
};
// ---------------------------------------------------- execution

setCloseListeners();

//YOUTUBE VIDEO API---------------------------------------

const tag = document.createElement("script");
tag.src = "//www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function hideVideoElements() {
    videoButton.classList.remove("performance__video-play_hide");
    videoCover.classList.remove("performance__video-cover_hide");
}

function showVideElements() {
    videoButton.classList.add("performance__video-play_hide");
    videoCover.classList.add("performance__video-cover_hide");
}

function onYouTubeIframeAPIReady() {
    let status;
    player = new YT.Player(videoIframe, {
        events: {
            onStateChange: onPlayerStateChange,
        },
    });

    function onPlayerStateChange(e) {
        if (e.data == YT.PlayerState.PAUSED) {
            status = YT.PlayerState.PAUSED;
            hideVideoElements();
        } else if (e.data == YT.PlayerState.PLAYING) {
            status = YT.PlayerState.PLAYING;
            showVideElements();
        }
    }

    videoButton.addEventListener("click", () => {
        if (status == YT.PlayerState.PLAYING) {
            player.pauseVideo();
            status = YT.PlayerState.PAUSED;
            hideVideoElements();
        } else {
            player.playVideo();
            status = YT.PlayerState.PLAYING;
            showVideElements();
        }
    });
}

//--------------------------------------------------------

