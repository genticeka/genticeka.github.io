const sections = document.querySelectorAll('section');
const progressBar = document.querySelector('.progress-bar');
const sideNav = document.querySelector('.side-nav');
const dots = sideNav.querySelectorAll('.nav-dot');

let isScrolling = false;

function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.height = progress + '%';
}

function updateActiveDot() {
    if (isScrolling) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let current = 'about';

    if (scrollTop >= docHeight - 50) {
        current = 'contact';
    } else if (scrollTop < 50) {
        current = 'about';
    } else {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
                current = section.id;
            }
        });
    }

    setActive(current);
}

function setActive(id) {
    dots.forEach(dot => {
        dot.classList.toggle('active', dot.dataset.section === id);
    });
}

sideNav.addEventListener('click', (e) => {
    const dot = e.target.closest('.nav-dot');
    if (!dot) return;

    const sectionId = dot.dataset.section;
    const target = document.getElementById(sectionId);
    if (!target) return;

    setActive(sectionId);

    isScrolling = true;
    window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
    });

    setTimeout(() => {
        isScrolling = false;
    }, 800);
});

window.addEventListener('scroll', () => {
    updateProgress();
    updateActiveDot();
});

updateProgress();
updateActiveDot();
