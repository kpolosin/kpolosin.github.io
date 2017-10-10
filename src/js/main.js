const ImageLoop = (() => {
    let s;

return {
    settings() {
        return {
            image: document.querySelectorAll('.team__img'),
            link: document.querySelectorAll('.team__link'),
            intervalTime: 250
        };
    },

    init() {
        s = this.settings();
        this.bindEvents();
    },

    bindEvents() {
        this.hideImg();
        this.hoverImg();
    },

    hideImg() {
        [].forEach.call(s.image, img => {
            [].forEach.call(img.children, (moreImg, idx) => {
            if (idx !== 0) {
            moreImg.style.display = 'none';
        }
    });
    });
    },

    hoverImg() {
        [].forEach.call(s.link, link => {
            let interval;
        let count = 0;

        link.addEventListener('mouseenter', e => {
            const target = e.target.children[0];
        // Idx 1 because of the span tag/preloader
        const img = target.children[1].children;
        const length = img.length;

        interval = setInterval(() => {
            img[count].style.display = 'none';

        if (count === length - 1) {
            count = 0;
        } else {
            count++;
        }

        img[count].style.display = 'block';
    }, s.intervalTime);
    });

        link.addEventListener('mouseleave', () => {
            clearInterval(interval);
    });
    });
    }
};
})();

ImageLoop.init();
