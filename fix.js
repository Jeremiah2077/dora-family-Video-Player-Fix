// Function to create a new window and display the player with the given URL
function openPlayerInNewWindow(url) {
    const playerHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,minimal-ui">
            <meta name="referrer" content="no-referrer">
            <title>xgplayer</title>
            <style type="text/css">
              html, body {width:100%;height:100%;margin:auto;overflow: hidden;}
            </style>
          </head>
          <body>
            <div id="mse"></div>
            <script src="//unpkg.byted-static.com/xgplayer/2.31.6/browser/index.js" charset="utf-8"></script>
            <script>
              let player = new Player({
                "id": "mse",
                "url": "${url}",
                "playsinline": true,
                "whitelist": [""],
                "playbackRate": [null],
                "autoplay": true,
                "fluid": true
              });
            </script>
          </body>
        </html>
    `;

    const newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.write(playerHTML);
    newWindow.document.close();
}

// Function to handle cell selection and play the selected video
function handleCellSelection(cell) {
    const url = cell.getAttribute('data-src');
    console.log(url);
    if (url) {
        openPlayerInNewWindow(url);
    }
}

// Create a MutationObserver to monitor class changes
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target;
            if (target.classList.contains('selected')) {
                handleCellSelection(target);
            }
        }
    });
});

// Attach the observer to all .listCell elements
document.querySelectorAll('.listCell').forEach(cell => {
    observer.observe(cell, { attributes: true });
});
