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
    if (!event.target.classList.contains("gallery__image")) {
        return;
    }
    const galleryInstance = basicLightbox.create(`
    <img class="gallery__image"
    src="${event.target.dataset.source}" width="800" height="600" 
    alt="${event.target.alt}">
    `);
    // console.log(`Opening "${event.target.alt}" in lightbox`);
    galleryInstance.show();

    document.addEventListener("keydown", onKeydown);
    function onKeydown(event) {
        // console.log("Pressed:", event.code);
        if (!galleryInstance.visible()) {
            document.removeEventListener("keydown", onKeydown);
        }
        if (event.code === "Escape") {
            galleryInstance.close();
            document.removeEventListener("keydown", onKeydown);
            return;
        }
    }
}
