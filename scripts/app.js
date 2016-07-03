
let font =  'http://fonts.gstatic.com/s/titilliumweb/v4/7XUFZ5tgS-tD6QamInJTcSGR3J8a2Jm30YJvJ3tIMOY.woff2';
fetch(font).then(() => {
    document.body.classList.add('fontLoaded');
});

fetch('./scripts/data/portfolioSections.json')
    .then(response => response.json())
    .then(portfolio => {
        let portfolioToRender = document.createDocumentFragment();
        let portfolioNavItems = document.createDocumentFragment();

        let portfolioItemElements = portfolio.map(portfolio => {
            let {id, title, description, icon, heroImage, timeline, backgroundColor} = portfolio;
            let section = document.createElement('article');
            section.setAttribute('id', id);
            section.style.cssText = `background: ${backgroundColor}`;
            section.classList.add('portfolio-section');
            if (heroImage) {
                let hero = document.createElement('div');
                hero.setAttribute('class', 'portfolio-section-hero');
                hero.style.backgroundImage = `url(${heroImage})`;
                section.appendChild(hero);
            }

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
            section
                .appendChild(document.createElement('p'))
                .appendChild(document.createTextNode(description));

            let navItem = document.createElement('a');
            let iconImg = document.createElement('img');

            navItem.setAttribute('href', `#${id}`);
            navItem.setAttribute('class', 'portfolio-iconAnchor');
            iconImg.setAttribute('class', 'portfolio-icon');
            navItem.appendChild(iconImg).setAttribute('src', icon);

            return {
                section,
                navItem
            }
        });

        portfolioItemElements.forEach(({section, navItem}) => {
            portfolioToRender.appendChild(section);
            portfolioNavItems.appendChild(navItem);
        });

        document.getElementById('portfolioNav').appendChild(portfolioNavItems);
        document.getElementById('portfolio').appendChild(portfolioToRender);
    });