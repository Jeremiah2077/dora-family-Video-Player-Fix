# dora-family-Video-Player-Fix

Notice: Site officials have fixed the player issues, the project is closed!

This script is designed to fix the video playback issues on the Dora-Family website. It uses a third-party player to play the videos in a new browser window when a video is selected.
## README

# Dora-Family Video Player Fix
![image](https://github.com/user-attachments/assets/16e0634d-d2d8-41e3-adcd-4337f51627eb)

This script is designed to fix the video playback issues on the [Dora-Family website](https://www.dora-family.com/Resource:TV?variant=zh-sg). It uses a third-party player to play the videos in a new browser window when a video is selected.

## How to Use

### Using Chrome Developer Tools

1. Open the [Dora-Family website](https://www.dora-family.com/Resource:TV?variant=zh-sg).
2. Open the Chrome Developer Tools by pressing `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac).
3. Go to the "Console" tab.
4. Copy and paste the following script into the console and press `Enter`:

    ```javascript
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
    ```

5. Now, when you select a video on the website, it will open in a new window using the third-party player.

### Using Tampermonkey

[Tampermonkey](https://www.tampermonkey.net/) is a popular userscript manager that allows you to run custom scripts on websites.

1. Install Tampermonkey for your browser.
2. Click on the Tampermonkey icon in your browser toolbar and select "Create a new script..."
3. Replace the default script content with the following code:

    ```javascript
    // ==UserScript==
    // @name         Dora-Family Video Player Fix
    // @namespace    http://tampermonkey.net/
    // @version      1.0
    // @description  Fixes video playback issues on Dora-Family website using a third-party player.
    // @author       Your Name
    // @match        https://www.dora-family.com/Resource:TV
    // @grant        none
    // ==/UserScript==

    (function() {
        'use strict';

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

    })();
    ```

4. Save the script.
5. Go to the [Dora-Family website](https://www.dora-family.com/Resource:TV?variant=zh-sg).
6. The script will automatically run, and when you select a video, it will open in a new window using the third-party player.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
