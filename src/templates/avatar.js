import { html } from "lit-html";
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import xss from "xss/dist/xss";

const whitelist_opts = {
    'whiteList': {
        'svg': ['xmlns', 'class', 'width', 'height'],
        'image': ['width', 'height', 'preserveAspectRatio', 'href']
    }
};

const getImgHref = (image, image_type) => {
    return image.startsWith('data:') ? image : `data:${image_type};base64,${image}`;
}

const tpl_svg = (o) => xss.filterXSS(
    `<image width="${o.width}" height="${o.height}" preserveAspectRatio="xMidYMid meet" href="${getImgHref(o.image, o.image_type)}"/>`,
    whitelist_opts
);

export default  (o) => html`
    <svg xmlns="http://www.w3.org/2000/svg" class="avatar ${o.classes}" width="${o.width}" height="${o.height}">
        ${ unsafeSVG(tpl_svg(o)) }
    </svg>`;

