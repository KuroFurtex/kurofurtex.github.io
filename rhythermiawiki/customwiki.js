function renderPage(title, image, info, quote, leadContent, bodyContent) {

    const container = document.querySelector(".c");

    let infoHTML = "";
    let infobox = "";
    let quotebox = "";

    for (const line of info) {

        const split = line.split("=");

        if (split.length >= 2) {
            infoHTML += `
            <tr>
            <th>${split[0].trim()}</th>
            <td>${processWikiMarkup(split.slice(1).join("=").trim())}</td>
            </tr>
            `;
        }
    }

    if (infoHTML != "") {
        infobox = `
        <aside class="infobox">
            ${image ? `<img src="${image}" alt="${title}">` : ""}
            <table>
            ${infoHTML}
            </table>
        </aside>
        `
    } else {
        leadContent = `${image ? `<img src="${image}" alt="${title}">` : ""} ${leadContent}`
    }

    if (quote[0]) {
        console.log(quote)
        quotebox = `
        <div class="quote">
            <p><i>"${quote[0]}"</i></p>
            <font size=2>- ${quote[1]}</font>
        </div>
        `
    }

    container.innerHTML = `
    <div class="wiki-page">
        <h1>${title}</h1>
        <div class="wiki-layout">
            <article class="content">
                ${quotebox}
                ${leadContent}
            </article>
            ${infobox}
        </div>
        <article class="content">
            ${bodyContent}
        </article>
    </div>
    `;
}

function processWikiMarkup(text) {
    // Wiki links
    text = text.replace(
        /\[\[link:([^:]+):([^\]]+)\]\]/g,
                        (_, name, page) =>
                        `<a href="?p=${page}">${name}</a>`
    );

    // Images
    text = text.replace(
        /\[\[img:([^:]+):([^\]]+)\]\]/g,
                        (_, caption, src) =>
                        `
                        <figure class="wiki-image">
                        <img src="${src}" alt="${caption}">
                        <figcaption>${caption}</figcaption>
                        </figure>
                        `
    );

    return text;
}

function parseWiki(text) {
    const lines = text.split("\n");

    let title = "";
    let image = "";
    let info = [];
    let leadContent = "";
    let bodyContent = "";
    let quote = [
        "",
        ""
    ];

    let heading = false;

    let mode = "";

    for (const line of lines) {

        if (line.startsWith("@title ")) {
            title = line.substring(7);
        }

        else if (line.startsWith("@image ")) {
            image = line.substring(7);
        }

        else if (line === "@info") {
            mode = "info";
        }

        else if (line === "@quote") {
            mode = "quote";
        }

        else if (line.startsWith("- ") && mode === "quote") {
            quote[1] = line.substring(2);
        }

        else if (line === "@content") {
            mode = "";
        }

        else if (line.startsWith("# ")) {
            bodyContent += `<h2>${line.substring(2)}</h2>`;
            heading = true;
            mode = "";
        }

        else if (line.startsWith("## ")) {
            bodyContent += `<h3>${line.substring(3)}</h3>`;
        }

        else {
            if (mode === "info") {
                info.push(line);
            } else if (mode === "quote" && line != "") {
                quote[0] = line;
            } else {
                let html = `${processWikiMarkup(line)}`;

                if (html.startsWith("- ")) {
                    html = `<p class="point">➤ ${html.substring(2)}</p>`;
                } else if (html.startsWith("-- ")) {
                    html = `<p class="m-point">➤ ${html.substring(3)}</p>`;
                } else {
                    html = `<p>${html}</p>`;
                }

                if (!heading)
                    leadContent += html;
                else
                    bodyContent += html;
            }
        }
    }

    renderPage(title, image, info, quote, leadContent, bodyContent);
}

async function loadPage() {
    const params = new URLSearchParams(location.search);

    const page = params.get("p") || "home";

    const response = await fetch(`rhythermiawiki/wikipage/${page}.rdwiki`);

    const text = await response.text();

    parseWiki(text);
}



