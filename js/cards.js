export function Cards (data) {
    return `
            ${data.map(card => `
                <div class="card">
                    <a href="${card.url}" target="_blank" class="card__link" data-track="${card.title}">
                        <h2 class="card__title">
                            ${card.title}
                        </h2>
                        <p class="card__description">${card.description}</p>
                        <div class="card__tags">
                            ${card.tags.map(tag =>`
                                    <div class="tag tag--${tag.replace(' ', '-')}">
                                        <span>${tag}</span>
                                    </div>`
                                ).join('')
                            }
                        </div>
                        <div class="card__image">
                            <img src="${card.image}">
                        </div>
                    </a>
                </div>
            `).join('')}
        `
};