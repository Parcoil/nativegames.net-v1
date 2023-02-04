if (typeof VERSION_CODE === 'undefined') {
    VERSION_CODE = 'DEV';
}

if (typeof VERSION !== 'undefined') {
    pc.Asset.prototype.getFileUrl = function() {
        var file = this.file;
        if (!file || !file.url) return null;
        var url = file.url;
        if (this.registry && this.registry.prefix && !ABSOLUTE_URL.test(url)) url = this.registry.prefix + url;

        if (this.type !== 'script' && file.hash) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            url += separator + 't=' + file.hash + '?v=' + VERSION;
        } else {
            url += '?v=' + VERSION;
        }

        return url;
    };
}

//initalized commands
window.addEventListener('keydown', function(e) {
    if (typeof app != 'undefined' && app.mode != 'Menu') {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }

        if (e.which == 9 && (e.target == document.body || pc.isMapLoaded)) {
            e.preventDefault();
        }
    }
});

window.addEventListener('keyup', function(e) {
    if (typeof app != 'undefined' && app.mode != 'Menu') {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }

        if (e.which == 9 && e.target == document.body) {
            e.preventDefault();
        }
    }
});

document.addEventListener('wheel', function(e) {
    if (
        e.target.tagName === 'BODY' ||
        e.target.tagName === 'WINDOW' ||
        e.target.tagName === 'HTML' ||
        e.target.tagName === 'CANVAS'
    ) {
        e.preventDefault();
        return false;
    }
}, {
    passive: false
});

if (window.location && window.location.href.search('isMobile') > -1) {
    pc.isMobile = true;
} else {
    pc.isMobile = false;
}

var wrapper;

pc.script.createLoadingScreen(function(app) {
    var showSplash = function() {
        wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        var hints = [
            'Press [B] to buy ability cards in game!',
            'Mistle map has a different game mode, try it out!',
            'Stay in green area to get score!',
            'Unlock ability cards with frag and objective scores!'
        ];

        var description = document.createElement('div');
        description.innerText = '🧐 Tip : ' + hints[
            Math.floor(Math.random() * hints.length)
        ];
        description.id = 'description';

        //wrapper.appendChild(description);

        /*
        var backgroundVideo = document.createElement('video');
            backgroundVideo.id = 'background-video';
            backgroundVideo.src = 'https://venge.io/Background.mp4';
            backgroundVideo.muted = true;
            backgroundVideo.autoplay = true;
            backgroundVideo.playsinline = true;
            backgroundVideo.loop = true;
            
        wrapper.appendChild(backgroundVideo);
        */

        /*
        var backgroundImage = document.createElement('img');
            backgroundImage.id = 'background-image';
            backgroundImage.src = 'https://venge.io/Thumbnail-Large.jpg?v=1.0.0';
        
        wrapper.appendChild(backgroundImage);
        */

        //splash.appendChild(logo);

        var _version = 'DEV';

        if (typeof VERSION_CODE != 'undefined') {
            _version = VERSION_CODE;
        }

        var footer = document.createElement('div');
        footer.id = 'footer';
        footer.innerHTML = 'v' + _version;

        //wrapper.appendChild(footer);

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        //splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

        //Poki SDK code block
        if (typeof PokiSDK !== 'undefined') {
            PokiSDK.gameLoadingStart();
        }
    };

    var hideSplash = function() {
        var splash = document.getElementById('application-splash-wrapper');

        if (splash && splash.parentElement) {
            splash.parentElement.removeChild(splash);
        }

        //Poki SDK code block
        if (typeof PokiSDK !== 'undefined') {
            PokiSDK.gameLoadingFinished();
        }
    };

    var setProgress = function(value) {
        var bar = document.getElementById('progress-bar');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }

        //Poki SDK code block
        if (typeof PokiSDK !== 'undefined') {
            var data = {};
            data.percentageDone = value;
            data.kbLoaded = value * 100;
            data.kbTotal = 100;
            data.fileNameLoaded = 'game.json';
            data.filesLoaded = 1;
            data.filesTotal = 1;

            PokiSDK.gameLoadingProgress(data);
        }
    };

    var createCss = function() {
        var css = [
            'body {',
            '-webkit-touch-callout: none;',
            '  -webkit-user-select: none;',
            '   -khtml-user-select: none;',
            '     -moz-user-select: moz-none;',
            '      -ms-user-select: none;',
            '       -o-user-select: none;',
            '          user-select: none;',

            '-webkit-touch-callout: default;',
            '  -webkit-user-select: text;',
            '   -khtml-user-select: text;',
            '     -moz-user-select: text;',
            '      -ms-user-select: text;',
            '       -o-user-select: text;',
            '          user-select: text;',
            '}',

            '*:not(input):not(textarea){',
            '    -webkit-user-select: none;',
            '    -webkit-touch-callout: none;',
            '}',

            'input:disabled, textarea:disabled, ',
            'input:disabled::placeholder, textarea:disabled::placeholder{',
            '    -webkit-text-fill-color: currentcolor;',
            '    opacity: 1;',
            '}',


            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            //'    background: #191919 no-repeat;',
            '    background-size: cover;',
            '}',

            '#background-video {',
            '    width:100%;',
            '    height:100%;',
            '    position:fixed;',
            '    left:0px;',
            '    top:0px;',
            '    object-fit:cover;',
            '    opacity:0.2;',
            '    z-index:1;',
            '}',

            '#application-splash {',
            '    position: absolute;',
            '    top: 7vh;',
            '    width: 300px;',
            '    left: 3vw;',
            '    z-index:5;',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '}',

            '#progress-bar-container {',
            '    margin-top: 20px;',
            '    height: 10px;',
            '    width: calc(100% - 4vw);',
            '    position: fixed;',
            '    left: 2vw;',
            '    bottom: 2vh;',
            '    background-color: rgba(0, 0, 0, 0.6);',
            '}',

            '#animated-loading-image-1 {',
            '    height: 50vh;',
            '    left: 0px;',
            '    opacity: 0;',
            '    bottom: 0px;',
            '    position: absolute;',
            '    animation-name: loading-image-1;',
            '    animation-duration: 6s;',
            '    animation-fill-mode: bubble 1.0s forwards;',
            '}',

            '@keyframes loading-image-1 {',
            '    from { opacity : 0; left : 0px; }',
            '    to { opacity : 1; left : 30px; }',
            '}',

            '#animated-loading-image-2 {',
            '    height: 20vh;',
            '    right: 30px;',
            '    bottom: 0px;',
            '    opacity: 0;',
            '    position: absolute;',
            '    animation-name: loading-image-2;',
            '    animation-duration: 1s;',
            '    animation-delay: 2s;',
            '    animation-fill-mode: bubble 1.0s forwards;',
            '}',

            '@keyframes loading-image-2 {',
            '    from { opacity : 0; right : -300px; }',
            '    to { opacity : 1; right : 30px; }',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #ffffff;',
            '    box-shadow: 0px 0px 60px #ffffff;',
            '}',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}',

            '.cls-1 {',
            //'   stroke-dasharray: 1000;',
            //'   stroke-dashoffset: 1000;',
            '   stroke-width: 5;',
            //'   animation: dash 5s linear normal;',
            '}',

            '@keyframes dash {',
            '   from {',
            '       stroke-dashoffset: 1000;',
            '   }',
            '   to {',
            '       stroke-dashoffset: 0;',
            '   }',
            '}'
        ].join("\n");

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();
    showSplash();

    app.on('preload:start', function() {

    });

    app.on('preload:end', function() {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});