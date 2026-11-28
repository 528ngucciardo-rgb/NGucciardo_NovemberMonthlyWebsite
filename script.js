 const sideNav = document.getElementById('sideNav');
 const siteHeader = document.getElementById('siteHeader');

 new IntersectionObserver(function (entries) {
    sideNav.classList.toggle('show', !entries[0].isIntersecting);
 }, { rootMargin: '-140px 0px 0px 0px' }).observe(siteHeader);

 const railLinks = document.querySelectorAll('.rail-link');
 const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            railLinks.forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
 }, { rootMargin: '-40% 0px -55% 0px' });
 document.querySelectorAll('main section').forEach(function (sec) {
sectionObserver.observe(sec);
 });

 const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            fadeObserver.unobserve(entry.target);
        }
    });
 }, { threshold: 0.1 });
 document.querySelectorAll('.fade-in').forEach(function (el) {
    fadeObserver.observe(el);
 });

 const leafImages = [
    'imgs/leaf-1.svg',
    'imgs/leaf-2.svg',
    'imgs/leaf-3.svg'
 ];
 const desktop = window.matchMedia('(min-width: 992px').matches;
 const railWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--rail'), 10) || 0;

 function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
 }

 function addLeafGroup(count, minX, maxX, sway, startIndex) {
    const lanes = shuffle(Array.from({ length: count }, (_, i) => i));
    const order = shuffle(Array.from({ length: count }, (_, i) => i));
    const laneWidth = (maxX - minX) /count; 

    for (let i = 0; i < count; i++) {
        const leaf = document.createElement('img');
        leaf.className = 'leaf';
        leaf.src = leafImages[(startIndex + i) % leafImages.length];
        leaf.alt = '';
        leaf.setAttribute('aria-hidden', 'true');

        const duration = 18 + Math.random() * 10;                                   // 18-28s
        const x = minX + lanes[i] * laneWidth + laneWidth * (0.15 + Math.random() * 0.7);
        leaf.style.left = x + 'px';
        leaf.style.fontSize = (1.7 + Math.random() * 0.9) + 'rem';                 // varied sizes
        leaf.style.animationDuration = duration + 's';
        leaf.style.animationDelay = (-(order[i] / count) * duration) + 's';        // even in time
        leaf.style.setProperty('--sway', (Math.random() < 0.5 ? -1 : 1) * sway + 'px');
        leaf.style.setProperty('--spin', (Math.random() < 0.5 ? -1 : 1) * 360 + 'deg');
        document.body.appendChild(leaf);
    }
}

const pageLeft = desktop ? railWidth : 0;
const mainWidth = window.innerWidth - pageLeft - 40;            // keep leaves on screen
const mainCount = Math.max(6, Math.min(14, Math.round(mainWidth / 110)));
addLeafGroup(mainCount, pageLeft, pageLeft + mainWidth, 40, 0);

if (desktop && railWidth > 28) {
    addLeafGroup(3, 4, railWidth - 36, 10, mainCount);          // a few drift down the rail too
}