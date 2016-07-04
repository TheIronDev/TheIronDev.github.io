'use strict';

function scrollTopToView() {
    let aboutMe = document.getElementById('aboutMe');
    let aboutMeHeight = aboutMe.clientHeight;
    let headerHeight = document.getElementById('portfolioHeader').clientHeight;
    let paddingTop = window.outerHeight - aboutMeHeight - headerHeight + 150;
    let cssText = '';

    // If we scroll passed the initial page and refresh, skip the css transition
    console.log(window.scrollY, window.innerHeight);
    if (window.scrollY > window.innerHeight) {
        cssText = 'transition: none;';
    }
    cssText += `padding-top: ${paddingTop}px`;
    aboutMe.style.cssText = cssText;
}

(function awaitFontLoaded() {
    let font =  'http://fonts.gstatic.com/s/titilliumweb/v4/7XUFZ5tgS-tD6QamInJTcSGR3J8a2Jm30YJvJ3tIMOY.woff2';
    fetch(font).then(() => {
        document.body.classList.add('fontLoaded');
    });
})();

(function loadPortfolioSections() {

    function buildPortfolioSection(portfolio) {
        let {id, title, description, icon, heroImage, timeline, backgroundColor} = portfolio;
        let section = document.createElement('article');
        section.setAttribute('id', id);
        section.style.cssText = `background: ${backgroundColor}`;
        section.classList.add('portfolio-section');

        let iconImgSection = document.createElement('img');
        iconImgSection.setAttribute('class', 'portfolio-sectionIcon');
        section.appendChild(iconImgSection).setAttribute('src', icon);

        let sectionHeader = document.createElement('header');
        sectionHeader.setAttribute('class', 'portfolio-sectionHeader');
        sectionHeader.appendChild(document.createTextNode(title));

        let timeSection = document.createElement('div');
        timeSection.appendChild(document.createTextNode(timeline));

        section.appendChild(sectionHeader);
        section.appendChild(timeSection);

        if (heroImage) {
            let hero = document.createElement('div');
            let heroImg = document.createElement('img');
            hero.setAttribute('class', 'portfolio-section-hero');
            heroImg.setAttribute('src', heroImage);
            heroImg.setAttribute('class', 'portfolio-section-heroImg');
            section.appendChild(hero).appendChild(heroImg);
        }

        section
            .appendChild(document.createElement('p'))
            .appendChild(document.createTextNode(description));
        return section;
    }

    function buildNavigationItem(portfolio) {
        let {id, icon} = portfolio;
        let navItem = document.createElement('a');
        let iconImg = document.createElement('img');

        navItem.setAttribute('href', `#${id}`);
        navItem.setAttribute('class', 'portfolio-iconAnchor');
        iconImg.setAttribute('class', 'portfolio-icon');
        navItem.appendChild(iconImg).setAttribute('src', icon);
        return navItem;
    }

    fetch('./scripts/data/portfolioSections.json')
        .then(response => response.json())
        .then(portfolios => {
            let portfolioToRender = document.createDocumentFragment();
            let portfolioNavItems = document.createDocumentFragment();

            let portfolioItemElements = portfolios.map(portfolio => {
                return {
                    section: buildPortfolioSection(portfolio),
                    navItem: buildNavigationItem(portfolio)
                }
            });

            portfolioItemElements.forEach(({section, navItem}) => {
                portfolioToRender.appendChild(section);
                portfolioNavItems.appendChild(navItem);
            });

            document.getElementById('portfolioNav').appendChild(portfolioNavItems);
            document.getElementById('portfolio').appendChild(portfolioToRender);
        })
        .then(() => {
            setTimeout(scrollTopToView, 60);
        });
})();

let debouncer;
window.addEventListener('resize', () => {
    if (debouncer) clearTimeout(debouncer);
    debouncer = setTimeout(scrollTopToView, 60)
});