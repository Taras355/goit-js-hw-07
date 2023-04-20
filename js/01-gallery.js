import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryMarkup = galleryItems
    .map((item) => {
        const itemMarkup = `
        <li class="gallery__item">
            <a class="gallery__link" href="${item.original}">
                <img
                    class="gallery__image"
                    src="${item.preview}"
                    data-source="${item.original}"
                    alt="${item.description}"
                />
            </a>
        </li>`;
        return itemMarkup;
    })
    .join("");

const galleryEl = document.querySelector(".gallery");
galleryEl.innerHTML = galleryMarkup;

galleryEl.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return;
    }

    const galleryInstance = basicLightbox.create(
        `
    <img class="gallery__image"
    src="${event.target.dataset.source}" width="800" height="600" 
    alt="${event.target.alt}">
    `,
        {
            modifiedKeydown: null,
            onShow(instance) {
                this.modifiedKeydown = onKeydown.bind(instance);
                document.addEventListener("keydown", this.modifiedKeydown);
            },
            onClose() {
                document.removeEventListener("keydown", this.modifiedKeydown);
            }
        }
    );

    // console.log(`Opening "${event.target.alt}" in lightbox`);
    galleryInstance.show();
}

function onKeydown(event) {
    // console.log(event.code);
    if (event.code === "Escape") {
        this.close();
    }
}
