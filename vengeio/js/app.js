var segmentsSend = {};
var app = new Vue({
    el: '#wrapper',
    data: {
        title: 'Venge.io - FPS io game',
        loaded: false,
        inventoryUpdated: true,
        disableMatchmakingButton: false,
        gameSceneLoaded: false,
        transition: {
            active: false,
            fadeIn: false,
            display: false,
            completed: false
        },
        captcha: {
            code: '0x4AAAAAAAB0niyvieblnyrL',
            token: false,
        },
        homeBannerLoaded: false,
        mode: 'Menu',
        page: 'Home',
        prevPage: 'Home',
        tab: 'General',
        prevTab: 'General',
        verticalTab: 'General',
        category: 'Casual',
        alertMessage: false,
        prefix: {
            matchmaking: 'https://matchmaking.venge.io/',
            account: 'https://gateway.venge.io/'
        },
        session: {
            hash: '',
            country: 'EU',
            map: 'Sierra',
            maps: [],
            defaultMaps: ['Sierra - POINT', 'Tundra - GUNGAME', 'Mistle - PAYLOAD', 'Temple - BLACKCOIN', 'SandstormBlitz - CUSTOM'],
            mapOnline: {},
            mode: 'POINT',
            is_mobile: false,
            players: [],
            hero: 'Lilium',
            character: 'Lilium',
            username: '',
            version: '1.0.0',
            online: 1000,
            regions: {
                EU: 0,
                SA: 0,
                AU: 0,
                AS: 0,
                NA: 0
            },
            time: '00:00',
            balance: '0 VG',
            server_version: '1.0.22',
            max_player: 6,
            claimedFreeSkin: false,
            localSkins: [],
            inbox: [],
            message: {
                username: '',
                message: '',
                pastMessages: [],
                searchResults: [],
                isSelected: false,
                disabled: false,
                isBlockedUser: false,
            },
            localCharacter: false,
            isWaitingJoin: false,
            inboxNotification: 0
        },
        chat: {
            message: '',
            messages: [],
        },
        pause: {
            isPaused: false,
            try: [{
                    name: 'M4',
                    thumbnail: 'M4-Thumbnail.png',
                    icon: 'M4-Thumbnail-White.png',
                    favorite: false,
                    unlocked: false,
                    description: 'Low shoot time with high spread rate makes it hard to use on long distances.',
                    features: [{
                            key: 'Ammo',
                            value: 25
                        },
                        {
                            key: 'Damage',
                            value: 13
                        }
                    ],
                    action: {
                        call: 'Network:Weapon',
                        value: 'M4'
                    }
                },
                {
                    name: 'AK-47',
                    thumbnail: 'AK-47-Thumbnail.png',
                    icon: 'AK-47-Thumbnail-White.png',
                    favorite: true,
                    unlocked: false,
                    description: 'On close and far combats particularly hard with its high spread rate.',
                    features: [{
                            key: 'Ammo',
                            value: 30
                        },
                        {
                            key: 'Damage',
                            value: 18
                        }
                    ],
                    action: {
                        call: 'Network:Weapon',
                        value: 'AK-47'
                    }
                },
                {
                    name: 'LMG',
                    thumbnail: 'LMG-Thumbnail.png',
                    icon: 'LMG-Thumbnail-White.png',
                    favorite: true,
                    unlocked: false,
                    description: 'LMG is a light-weight machine gun. It has got more ammo capacity than any other weapon in Venge.',
                    features: [{
                            key: 'Ammo',
                            value: 50
                        },
                        {
                            key: 'Damage',
                            value: 20
                        }
                    ],
                    action: {
                        call: 'Network:Weapon',
                        value: 'LMG'
                    }
                },
                {
                    name: 'Desert-Eagle',
                    favorite: false,
                    thumbnail: 'Desert-Eagle-Thumbnail.png',
                    icon: 'Desert-Eagle-Thumbnail-White.png',
                    description: 'It has high damage and and almost no shooting time restrictions but fires with a high recoil and spread rate.',
                    features: [{
                            key: 'Ammo',
                            value: 12
                        },
                        {
                            key: 'Damage',
                            value: 18
                        }
                    ],
                    action: {
                        call: 'Network:Weapon',
                        value: 'Desert-Eagle'
                    }
                }
            ],
            players: []
        },
        friends: [],
        followers: [],
        followings: [],
        result: {
            time: 5,
            isWinning: false,
            nextMap: 'Sierra',
            nextMode: 'Point',
            fadeOut: false,
            commends: [],
            reports: [],
            mvp: {
                username: 'Unknown',
                better: 0,
                kdr: 0
            },
            players: []
        },
        shop: {
            banners: [
                'images/Shin-Christmas-2022.jpg'
            ],
            slides: [{
                tab: 'Crates',
                title: 'Featured Offers',
                image: 'images/Item-Chest.jpg',
                description: 'Get a chance to win a rare item from the chest.'
            }],
            slideWidth: 30,
            slideIndex: 0,
            menu: [{
                    name: 'Featured',
                    icon: 'fa-bullhorn',
                    tab: 'General',
                    view3D: false
                },
                {
                    name: 'Offers',
                    icon: 'fa-bolt',
                    tab: 'Offers',
                    view3D: true
                },
                {
                    name: 'Crates',
                    icon: 'fa-archive',
                    tab: 'Crates',
                    view3D: true
                },
                {
                    name: 'Heroes',
                    icon: 'fa-street-view',
                    tab: 'Heroes',
                    view3D: true
                }
            ],
            time_left: '',
            offers: [],
            crates: [],
            heroes: [],
            rarities: [
                'Common', 'Uncommon', 'Legendary', 'Rare', 'Mythical'
            ],
            types: [
                'Scar', 'Shotgun', 'Sniper', 'Tec-9', 'AK-47', 'M4', 'LMG', 'Desert-Eagle', 'Dagger',
                'Spray', 'Dance', 'Charm',
                'Lilium', 'Shin', 'Echo', 'Kulu'
            ],
            type: '',
            rarity: '',
            activeItem: false,
            lootboxContent: false,
            isUnlocking: false,
            isCustomSkinLoaded: false,
            notEnoughPopup: false,
            lastLootboxDate: 0,
            baseCharacters: ['Echo', 'Shin', 'Lilium'],
            canUnlockWithAds: 0,
            maxUnlockWithAds: 2
        },
        limitedCrate: {
            items: [{
                    icon: 'Scar-ColourfulPolygons.png'
                },
                {
                    icon: 'Scar-Golden.png'
                },
                {
                    icon: 'Scar-ColourfulPolygons.png'
                },
                {
                    icon: 'Scar-Golden.png'
                },
                {
                    icon: 'Scar-ColourfulPolygons.png'
                },
                {
                    icon: 'Scar-ColourfulPolygons.png'
                },
                {
                    icon: 'Scar-Golden.png'
                },
                {
                    icon: 'Scar-ColourfulPolygons.png'
                },
                {
                    icon: 'Scar-Golden.png'
                },
                {
                    icon: 'Scar-ColourfulPolygons.png'
                },
                {
                    icon: 'Scar-ColourfulPolygons.png'
                }
            ],
            index: 0
        },
        leaderboard: {
            table: '',
            title: 'Daily',
            icon: 'fa-eye',
            menu: [{
                    name: 'Daily',
                    icon: 'fa-eye',
                    tab: 'General',
                },
                {
                    name: 'Weekly',
                    icon: 'fa-calendar',
                    tab: 'Weekly',
                },
                {
                    name: 'Global',
                    icon: 'fa-globe',
                    tab: 'Global',
                },
                {
                    name: 'Popular',
                    icon: 'fa-fire',
                    tab: 'Popular',
                },
                {
                    name: 'Headshots',
                    icon: 'fa-crosshairs',
                    tab: 'Headshots',
                },
                {
                    name: 'Kills',
                    icon: 'fa-bomb',
                    tab: 'Kills',
                },
                {
                    name: 'Clans',
                    icon: 'fa-users',
                    tab: 'Clans'
                }
            ],
        },
        invite: {
            hash: '',
            players: [],
            link: 'https://venge.io/',
            isOwner: false
        },
        profile: {
            coins: 0
        },
        table: {},
        settingsTabs: [{
                name: 'General',
                icon: 'fa-cog',
                tab: 'General'
            },
            {
                name: 'Graphics',
                icon: 'fa-video-camera',
                tab: 'Graphics'
            },
            {
                name: 'Controls',
                icon: 'fa-gamepad',
                tab: 'Controls'
            },
            {
                name: 'Audio',
                icon: 'fa-volume-up',
                tab: 'Audio'
            },
            {
                name: 'Crosshair',
                icon: 'fa-crosshairs',
                tab: 'Customs'
            }
        ],
        settings: {
            sensivity: 100,
            adsSensivity: 100,
            quality: 100,
            fov: 60,
            disableSpecialEffects: false,
            disableShadows: false,
            fpsCounter: false,
            hideChat: false,
            hideUsernames: false,
            hideArms: false,
            hideCharms: false,
            hideUIElements: false,
            hideMedals: false,
            weaponBobbing: 100,
            weaponLeaning: 100,
            disableLeaderboard: false,
            disableUsernames: false,
            disableTime: false,
            crosshairScale: 100,
            hideCrosshair: false,
            invertMouse: false,
            cameraSpeed: 100,
            volume: 100
        },
        customSettings: [],
        crosshair: {
            default: '',
            sniper: ''
        },
        maps: [{
                name: 'Sierra',
                mode: 'POINT'
            },
            {
                name: 'Tundra',
                mode: 'GUNGAME'
            },
            {
                name: 'Mistle',
                mode: 'PAYLOAD'
            },
            {
                name: 'Temple',
                mode: 'BLACKCOIN'
            },
            {
                name: 'SandstormBlitz',
                mode: 'CUSTOM'
            }
        ],
        guestMaps: [{
                name: 'Sierra',
                mode: 'POINT'
            },
            {
                name: 'Tundra',
                mode: 'GUNGAME'
            }
        ],
        languages: {
            list: [{
                    code: 'EN',
                    text: 'ENGLISH',
                },
                {
                    code: 'TR',
                    text: 'TÜRKÇE',
                },
                {
                    code: 'ES',
                    text: 'ESPAÑOL',
                },
                {
                    code: 'RU',
                    text: 'РУССКИЙ',
                },
                {
                    code: 'CN',
                    text: '中文',
                },
                {
                    code: 'PT',
                    text: 'PORTUGUÊS',
                },
                {
                    code: 'FR',
                    text: 'Français',
                },
                {
                    code: 'ID',
                    text: 'Indonesia',
                },
            ],
            'Continue': {
                EN: 'Continue',
                TR: 'Devam Et',
                ES: 'Continuar',
                RU: 'Продолжить',
                CN: '继续',
                PT: 'Continuar',
                FR: 'Continuer',
                ID: 'Lanjutkan'
            },
            'Join': {
                EN: 'Join',
                TR: 'Katıl',
                ES: 'Unirse',
                RU: 'Присоединиться',
                CN: '加入',
                PT: 'Juntar-se',
                FR: 'Rejoindre',
                ID: 'Gabung'
            },
            'LOGIN_REASON': {
                'EN': 'Create account to unlock characters, unique weapons!',
                'TR': 'Karakterleri ve özel silahları açmak için hesap oluşturun!',
                'ES': 'Crea una cuenta para desbloquear personajes, armas únicas!',
                'RU': 'Создайте аккаунт, чтобы разблокировать персонажей, уникальные оружия!',
                'CN': '创建账户以解锁角色，唯一武器！',
                'PT': 'Crie uma conta para desbloquear personagens, armas únicas!',
                'FR': 'Créez un compte pour débloquer des personnages, des armes uniques!',
                'ID': 'Buat akun untuk membuka karakter, senjata unik!'
            },
            'OPEN NOW': {
                'EN': 'OPEN NOW',
                'TR': 'ŞİMDİ AÇ',
                'ES': 'ABIERTO AHORA',
                'RU': 'ОТКРОЙ СЕЙЧАС',
                'CN': '現在開門了',
                'PT': 'ABRA AGORA',
                'FR': 'OUVREZ',
                'ID': 'Buka sekarang'
            },
            'PLAY NOW': {
                'EN': 'PLAY NOW',
                'TR': 'ŞİMDİ OYNA',
                'ES': 'JUGAR AHORA',
                'RU': 'ИГРАТЬ СЕЙЧАС',
                'CN': '现在播放',
                'PT': 'JOGUE AGORA',
                'FR': 'JOUER',
                'ID': 'MAIN SEKARANG'
            },
            'ACCOUNT': {
                'EN': 'ACCOUNT',
                'TR': 'HESAP',
                'ES': 'CUENTA',
                'RU': 'АККАУНТ',
                'CN': '帐户',
                'PT': 'CONTA',
                'FR': 'COMPTE',
                'ID': 'AKUN'
            },
            'LOGIN': {
                'EN': 'LOGIN',
                'TR': 'GİRİŞ YAP',
                'ES': 'INICIAR SESIÓN',
                'RU': 'ВХОД НА',
                'CN': '登录',
                'PT': 'ENTRAR',
                'FR': 'CONNEXION',
                'ID': 'GABUNG'
            },
            'REGISTER': {
                'EN': 'REGISTER',
                'TR': 'KAYIT OL',
                'ES': 'REGISTRAR',
                'RU': 'РЕГИСТР',
                'CN': '登记',
                'PT': 'REGISTRO',
                'FR': 'S\'INSCRIRE',
                'ID': 'DAFTAR'
            },
            'Username': {
                'EN': 'Username',
                'TR': 'KULLANICI ADI',
                'ES': 'NOMBRE DE USUARIO',
                'RU': 'ИМЯ ПОЛЬЗОВАТЕЛЯ',
                'CN': '登记',
                'PT': 'NOME DO USUÁRIO',
                'FR': 'Nom d\'utilisateur',
                'ID': 'Nama belakang'
            },
            'Password': {
                'EN': 'Password',
                'TR': 'ŞİFRE',
                'ES': 'CONTRASEÑA',
                'RU': 'ПАРОЛЬ',
                'CN': '密码',
                'PT': 'SENHA',
                'FR': 'Mot de passe',
                'ID': 'Kata sandi'
            },
            'UNLOCK': {
                'EN': 'UNLOCK',
                'TR': 'KİLİT AÇ',
                'ES': 'DESBLOQUEAR',
                'RU': 'отпереть',
                'CN': '开锁',
                'PT': 'DESBLOQUEAR',
                'FR': 'OUVRIR',
                'ID': 'MEMBUKA KUNCI'
            },
            'UNLOCK FREE SKINS': {
                'EN': 'UNLOCK FREE SKINS',
                'TR': 'ÜCRETSİZ KASA',
                'ES': 'PIELES GRATIS',
                'RU': 'БЕСПЛАТНЫЕ СКИНЫ',
                'CN': '免费皮肤',
                'PT': 'SKINS GRÁTIS',
                'FR': 'SKINS GRATUITS',
                'ID': 'BUKA KULIT GRATIS'
            }
        },
        monetization: 'reward',
        currentLanguage: 'EN',
        customMaps: [],
        emoji: {
            list: ['None', '😊 Smiling', '😵 Dizzy', '🤑 DollarSign', '🤯 Exploding', '😷 Mask', '😡 Rage', '😎 SunGlass', '🤔 Thinking', '😤 Triumph', '🤪 Crazy'],
            selected: 'None'
        },
        waitingForKeyboard: false,
        keyboardConfiguration: [{
                key: 'W',
                code: 87,
                default_key: 'W',
                default_code: 87,
                function: 'Forward',
                waiting: false
            },
            {
                key: 'S',
                code: 83,
                default_key: 'S',
                default_code: 83,
                function: 'Backward',
                waiting: false
            },
            {
                key: 'D',
                code: 68,
                default_key: 'D',
                default_code: 68,
                function: 'Right',
                waiting: false
            },
            {
                key: 'A',
                code: 65,
                default_key: 'A',
                default_code: 65,
                function: 'Left',
                waiting: false
            },
            {
                key: 'R',
                code: 82,
                default_key: 'R',
                default_code: 82,
                function: 'Reload',
                waiting: false
            },
            {
                key: 'SPACE',
                code: 32,
                default_key: 'SPACE',
                default_code: 32,
                function: 'Jump',
                waiting: false
            },
            {
                key: 'E',
                code: 69,
                default_key: 'E',
                default_code: 69,
                function: 'Melee',
                waiting: false
            },
            {
                key: 'F',
                code: 70,
                default_key: 'F',
                default_code: 70,
                function: 'Throw',
                waiting: false
            },
            {
                key: 'SHIFT',
                code: 16,
                default_key: 'SHIFT',
                default_code: 16,
                function: 'Focus',
                waiting: false
            },
            {
                key: 'H',
                code: 72,
                default_key: 'H',
                default_code: 72,
                function: 'Dance',
                waiting: false
            },
            {
                key: 'ENTER',
                code: 13,
                default_key: 'ENTER',
                default_code: 13,
                function: 'Chat',
                waiting: false
            },
            {
                key: 'X',
                code: 88,
                default_key: 'X',
                default_code: 88,
                function: 'Fire (Shoot)',
                waiting: false
            },
            {
                key: 'V',
                code: 86,
                default_key: 'V',
                default_code: 86,
                function: 'Spray',
                waiting: false
            }
        ],
        form: {
            username: '',
            password: '',
            new_password: '',
            email: '',
            twitch: '',
            search: ''
        },
        twitch: {
            link: false,
            username: ''
        },
        offers: [],
        killMessage: {
            message: '',
            list: []
        },
        lootbox: {
            animating: false,
            freeCrate: false,
            crate: false,
            active: false,
            unlocking: false,
            items: []
        },
        quest: {
            can_reset: false,
            active: false,
            list: []
        },
        clan: {
            id: '',
            welcome_message: '',
            member_access: false,
            can_accept_requests: false,
            can_manage_chat: false,
            social_link: '',
            name: '',
            slug: '',
            depositCoin: '',
            bankBalance: '',
            bankCoin: '',
            details: '',
            pending_request: {},
            levels: {
                list: [{
                        class: 'base',
                        name: 'Base',
                        color: '#6c6c6c',
                        cost: '0 VG',
                        invite: '25 Players',
                        extra: '',
                        thumbnail: '',
                    },
                    {
                        class: 'level-one',
                        name: 'Level 1',
                        color: 'rgb(35 127 255)',
                        cost: '100K VG',
                        invite: '50 Players',
                        extra: '',
                        thumbnail: '',
                    },
                    {
                        class: 'level-two',
                        name: 'Level 2',
                        color: 'rgb(255 163 36)',
                        cost: '250K VG',
                        invite: '75 Players',
                        extra: '1 Custom Roles',
                        thumbnail: '',
                    },
                    {
                        class: 'level-three',
                        name: 'Level 3',
                        color: 'rgb(255 35 36)',
                        cost: '500K VG',
                        invite: '100 Players',
                        extra: '1 Custom Roles',
                        thumbnail: '',
                    },
                    {
                        class: 'level-four',
                        name: 'Level 4',
                        color: '',
                        cost: '1M VG',
                        invite: '150 Players',
                        extra: '2 Custom Roles',
                        thumbnail: 'Circle-Rainbow.png',
                    },
                ]
            },
            roles: '',
        },
        isWatchingAds: false,
        sliderPosition: 40,
        rewardTime: 0,
        reforge: {
            info: 'Combine 5 items and reforge the new one!',
            count: 5,
            runeCount: 11,
            isWaiting: false,
            isUnlocking: false,
            ready: false,
            selected: [0, 0, 0, 0, 0],
            selectIndex: 0
        },
        inventory: [],
        loadout: [],
        loadoutCategory: [],
        loadoutCurrent: {},
        loadoutItemName: '',
        loadoutItemRarity: '',
        loadoutItemRarityColor: '#fff',
        currentSkins: [],
        currentLoadoutThumbnail: '',
        activeLoadoutMainCategory: 'GENERAL',
        activeLoadoutAltCategory: 'LOADOUT',
        loadoutItemRawData: [],
        loadoutItemDetail: {
            type: 'Hero',
            name: '',
            prevName: '',
            story: '',
            count: 5,
            hero: {
                HP: '',
                complexity: '',
                mainAbilityTitle: '',
                mainAbility: '',
                secondAbilityTitle: '',
                secondAbility: '',
                utility: '',
                defender: '',
                fighter: '',
            },
            currentWeapon: {
                damage: '',
                shootTime: '',
                recoilRate: '',
                spreadRate: '',
                focusSpreadRate: '',
                ammoCapacity: '',
                reloadingTime: '',
                distanceMultiplier: '',
                visionVibrate: '',
                focusFOV: '',
            },
            prevWeapon: {
                damage: '',
                shootTime: '',
                recoilRate: '',
                spreadRate: '',
                focusSpreadRate: '',
                ammoCapacity: '',
                reloadingTime: '',
                distanceMultiplier: '',
                visionVibrate: '',
                focusFOV: '',
            },
        },

        isSpectating: false,
        prevCategory: '',
        backButton: 'MENU',
        currentRarity: false,
        alertText: '',
        loading: false,
        fullLoading: false,
        loadContent: false,
        error: '',
        success: '',
        isMatchmaking: false,
        isMapSelected: false,
        isStarted: false,
        popup: false,
        freeSkin: true,
        abTest: 'None',
        buyVG: {
            active: false,
            state: 'Pack',
            creatorCode: '',
            appliedCreatorCode: '',
            packs: [{
                    thumbnailIndex: 2,
                    price: '1.99',
                    amount: '1500'
                },
                {
                    thumbnailIndex: 3,
                    price: '5.99',
                    amount: '5000'
                },
                {
                    thumbnailIndex: 4,
                    price: '9.99',
                    amount: '10000'
                },
                {
                    thumbnailIndex: 5,
                    price: '20.99',
                    amount: '25000'
                },
                {
                    thumbnailIndex: 6,
                    price: '34.99',
                    amount: '50000'
                },
                {
                    thumbnailIndex: 7,
                    price: '59.99',
                    amount: '100000'
                }
            ]
        },
        lastAdsShow: -1,
        lastRewardAds: -1,
        isFriendListActive: false,
        claimCampaign: false,
        showClaimCampaign: false,
        claimTimer: '05:00',
        claimMaxTime: 60 * 5,
        friends: {
            online: 0,
            list: [],
            added: []
        },
        firstTimePlay: false,
        homeBannerScale: 1,
        thumbnailIndex: (Math.floor(Math.random() * 8) + 1),
        tips: [
            'You can buy different spell cards with pressing [B] button',
            'Did you try different heroes? Venge has 4 different heroes',
            'Tundra map has Gun game mode, this mode has different rules',
        ],
        currentTipMessage: '',
    },
    methods: {
        init: function() {
            this.setEvent('NewCheckPoint', 'Loaded');
            this.loadCaptcha();

            this.currentTipMessage = this.tips[Math.floor(Math.random() * this.tips.length)];

            var crosshairDefault = this.getStorage('Crosshair_Image');

            if (crosshairDefault) {
                this.crosshair.default = crosshairDefault['Crosshair_Image'];
            }

            var customScope = this.getStorage('CustomScope');

            if (customScope) {
                this.crosshair.sniper = customScope['CustomScope'];
            }

            var playerHash = this.getStorage('Hash', true);

            if (playerHash) {
                this.session.hash = playerHash;
                this.getAccountHome(playerHash);

                pc.session = this.session;
            }

            //session maps
            var selectedMaps = this.getStorage('SelectedMaps', true);

            if (selectedMaps) {
                this.session.maps = JSON.parse(selectedMaps);
            } else {

            }

            this.goBack();
            this.getMenu();

            //this.getABTest();
            //this.setRetentionStats();

            this.getClaimCampaign();
            //this.setMainHero();
            this.setLanguage();

            this.setViewState();
            this.resizeBanner();

            this.checkInviteHash();
            window.onhashchange = this.checkInviteHash.bind(this);

            //this.getOffers();
            this.defineCustomDOM();

            //this.getCustomMaps();
            //this.getLoadout();

            //this.getProfileDetails();

            this.onHomePage();

            this.defineMonetization();

            window.addEventListener('keydown', this.onKeyDown.bind(this), this);

            setTimeout(function() {
                //app.loaded = true;	
            }, 100);

            //general tick
            setInterval(function(self) {
                self.tick();
            }, 1000, this)

            //constant slider
            this.setShopSlider();
        },
        loadCaptcha: function() {
            var captchaContainer = document.createElement('div');
            captchaContainer.id = 'captcha-container';

            document.body.appendChild(captchaContainer);

            window.onResetTurnstileCallback = function() {
                turnstile.reset('#captcha-container');
            };

            window.onloadTurnstileCallback = function() {
                turnstile.render('#captcha-container', {
                    sitekey: app.captcha.code,
                    callback: function(token) {
                        app.captcha.token = token;
                    },
                    "timeout-callback": function() {
                        console.log('Captcha timeout');
                        window.onResetTurnstileCallback();
                    }
                });
            };

            var captchaScript = document.createElement('script');
            captchaScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';

            document.head.appendChild(captchaScript);
        },
        tick: function() {
            if (this.page == 'Result') {
                if (this.result.time > 0) {
                    this.result.time--;
                }

                if (this.result.time <= 0) {
                    this.leaveGame();
                }
            }
        },
        setShopSlider: function() {
            clearInterval(this.sliderTimer);
            this.sliderTimer = setInterval(function(self) {
                self.shop.slideIndex++;

                if (self.shop.slideIndex >= self.shop.slides.length) {
                    self.shop.slideIndex = 0;
                }
            }, 2500, this)
        },
        onPlayCanvasLoad: function() {
            console.log('PlayCanvas events defined!');
            pc.app.on('AutoResolution:Set', function(status) {
                if (!app.getStorage('Quality')) {
                    if (status == 'HIGH') {
                        app.settings.quality = 98;
                        app.settings.disableSpecialEffects = false;
                        app.settings.disableShadows = false;

                        app.onSettingsChange();
                    }

                    if (status == 'MEDIUM') {
                        app.settings.quality = 70;
                        app.settings.disableSpecialEffects = true;
                        app.settings.disableShadows = true;

                        app.onSettingsChange();
                    }

                    if (status == 'LOW') {
                        app.settings.quality = 50;
                        app.settings.disableSpecialEffects = true;
                        app.settings.disableShadows = true;

                        app.onSettingsChange();
                    }

                    console.log('Auto resolution set: ', status);
                }
            });

            pc.app.on('CustomSkin:Loaded', function(data) {
                app.shop.isCustomSkinLoaded = false;
            });

            pc.app.on('HeroSelector:Loaded', function() {
                //we need delay for script order
                setTimeout(function() {
                    app.setMainHeroSkin();
                }, 200);
            });

            pc.app.on('WeaponManager:Set', function(weaponName) {
                if (!app.session.hash && weaponName) {
                    var skin = app.getLocalSkin(weaponName);

                    if (skin) {
                        pc.app.fire('WeaponManager:SetSkin', skin.filename);
                    }
                }
            });

            pc.app.on('Player:Character', function(characterName) {
                if (!app.session.hash && characterName) {
                    var skin = app.getLocalSkin(characterName);

                    if (skin) {
                        pc.app.fire('CustomSkin:Set', {
                            skin: skin.filename
                        });
                    }
                }
            });

            pc.app.on('Chat:Message', function(username, message) {
                app.chat.messages.push({
                    username: username,
                    message: message
                });

                setTimeout(function() {
                    app.chat.messages.splice(0, 1);
                }, 1000 * 5);
            });

            pc.app.on('Map:Loaded', function() {
                //pc.app.fire('Game:Mute', true);
                //app.transitionToggle(false);

                if (pc.isSpectator) {
                    app.transition.completed = true;
                    app.transitionToggle(false);
                }
            });

            pc.app.on('Game:NextMap', function(mapName, mapMode) {
                //pc.app.fire('Game:Mute', true);

                app.result.nextMap = mapName;
                app.result.nextMode = mapMode;

                console.log('Next map decided : ', mapName);
            });

            pc.app.on('Game:Mode', function(mapMode, mapName) {
                console.log('Next map decided : ', mapName);

                app.session.map = mapName;
                app.session.mode = mapMode;

                app.transitionToggle(true, mapName, mapMode);
            });

            pc.app.on('Game:PreStart', function() {
                app.transition.completed = false;
            });

            pc.app.on('Game:ReturnLobby', function() {
                app.leaveGame();
            });

            pc.app.on('Game:Respawned', function() {
                app.transition.completed = true;
                app.transitionToggle(false);
            });

            pc.app.on('Network:Finish', function() {
                app.session.isWaitingJoin = true;
            });

            pc.app.on('Server:Tick', function(time) {
                app.session.time = Utils.mmss(time);
            });

            pc.app.on('RoomManager:Ready', function(time) {
                if (app.invite.hash) {
                    app.connectInviteServer();
                }
            });

            app.loaded = true;
        },
        connectInviteServer: function() {
            pc.app.fire('RoomManager:ConnectInvite', {
                success: true,
                result: {
                    hash: this.invite.hash,
                }
            });
        },
        toHHMMSS: function(secs) {
            var sec_num = parseInt(secs, 10)
            var hours = Math.floor(sec_num / 3600)
            var minutes = Math.floor(sec_num / 60) % 60
            var seconds = sec_num % 60

            return [hours, minutes, seconds]
                .map(v => v < 10 ? "0" + v : v)
                .filter((v, i) => v !== "00" || i > 0)
                .join(":");
        },
        setSpectateToggle: function() {
            this.isSpectating = !this.isSpectating;

            if (app.invite.room) {
                window.location.hash = this.isSpectating ? 'Spectate:' + app.invite.room : app.invite.room;
            }
        },
        goBackFromSettings() {
            if (this.pause.isPaused) {
                this.page = 'Pause';

                return false;
            }

            this.goHome();
        },
        goBack: function() {
            window.addEventListener('keydown', ev => {
                if (document.getElementsByClassName('back-button')[0] && !app.popup) {
                    if (['Escape'].includes(ev.key)) {
                        document.getElementsByClassName('back-button')[0].click();
                    }
                } else if (app.popup) {
                    if (['Escape'].includes(ev.key)) {
                        this.quest.active = false;
                        this.popup = false;
                        this.closeBuyVG();
                        this.closeLootbox()
                    }
                }
            });
        },
        popupClose: function() {
            app.closeBuyVG();
            app.closeLootbox();

            app.popup = false;
            app.quest.active = false;
            app.buyVG.active = false;

            app.shop.notEnoughPopup = false;

            //app.stopMatchmaking();
        },
        getClaimCampaign: function() {
            //this.setEvent('ClaimCampaign', 'Called');

            this.service('account', '?request=get_claim_campaign', {}, function(data) {

            });

            var claimCampaign = this.getStorage('ClaimCampaign');

            this.showClaimCampaign = false;

            if (!claimCampaign) {
                this.setEvent('ClaimCampaign_v1', 'Step1');
                this.setStorage('ClaimCampaign', {
                    tier: 0,
                    created_at: Date.now()
                });
            } else if (claimCampaign && Date.now() - claimCampaign.created_at > 1000 * this.claimMaxTime) {
                this.setEvent('ClaimCampaign_v1', 'Step2');
                claimCampaign.tier++;
                claimCampaign.created_at = Date.now();

                if (claimCampaign.tier > 3) {
                    claimCampaign.tier = 1;
                }

                this.showClaimCampaign = true;
            }

            this.claimCampaign = claimCampaign;
        },
        unlockClaimCampaign: function() {
            if (!app.showClaimCampaign) {
                app.alert('Please wait for the next claim!');
                return false;
            }

            PokiSDK.customEvent('game', 'segment', {
                segment: 'rewarded'
            });

            PokiSDK.rewardedBreak().then(function(success) {
                if (success) {
                    app.setStorage('ClaimCampaign', app.claimCampaign);
                    app.setEvent('ClaimCampaign_v1', 'Unlock T' + app.claimCampaign.tier);

                    app.claimCampaign = false;
                    app.showClaimCampaign = false;

                    app._unlockClaimCampaign(success);
                } else {
                    //cant give reward
                    app.showMessage('Please disable Adblock or use Google Chrome browser to receive reward!');
                }
            });
        },
        _unlockClaimCampaign: function() {
            var claimCampaign = this.getStorage('ClaimCampaign');

            this.session.claimedFreeSkin = true;

            if (claimCampaign.tier === 1) {
                this.lootbox.crate = {
                    'name': 'Free Skin - T1',
                    'type': 'Crate',
                    'rarities': [{
                            'name': 'Common',
                            'percentage': '70'
                        },
                        {
                            'name': 'Uncommon',
                            'percentage': '30'
                        },
                        {
                            'name': 'Rare',
                            'percentage': '10'
                        }
                    ]
                };
            }

            if (claimCampaign.tier === 2) {
                this.lootbox.crate = {
                    'name': 'Free Skin - T2',
                    'type': 'Crate',
                    'rarities': [{
                            'name': 'Legendary',
                            'percentage': '5'
                        },
                        {
                            'name': 'Rare',
                            'percentage': '15'
                        },
                        {
                            'name': 'Uncommon',
                            'percentage': '80'
                        }
                    ]
                };
            }

            if (claimCampaign.tier === 3) {
                this.lootbox.crate = {
                    'name': 'Free Skin - T3',
                    'type': 'Crate',
                    'rarities': [{
                            'name': 'Mythical',
                            'percentage': '2'
                        },
                        {
                            'name': 'Legendary',
                            'percentage': '15'
                        },
                        {
                            'name': 'Rare',
                            'percentage': '83'
                        }
                    ]
                };
            }

            this.lootbox.active = true;
            this.lootbox.freeCrate = true;
            this.popup = true;

            this.lootbox.unlocking = false;
            this.lootbox.animating = true;

            pc.app.fire('Sound:Menu', 'Buy');
            pc.app.fire('Sound:Menu', 'Select');

            this.service('account', '?request=buy_free_lootbox', {}, function(data) {
                if (data.success) {
                    pc.app.fire('Sound:Menu', 'Spinning');

                    app.lootbox.unlocking = true;
                    app.lootbox.items = data.items;
                    app.lootbox.item = data.item;

                    app.currentRarity = '';

                    setTimeout(function() {
                        app.currentRarity = data.item.rarity;
                        app.lootbox.animating = false;
                    }, 4500);
                } else {
                    app.popupClose();
                    app.alert(data.message);
                }
            });
        },
        setMainHero: function() {
            var hero = this.getStorage('Character');

            if (hero) {
                this.session.character = hero;
            }

            pc.app.fire('HeroSelector:Select', hero);

            this.setMainHeroSkin();
        },
        setMainHeroSkin: function() {
            var hero = this.session.character;
            var skin = this.inventory.find(function(item) {
                return item.class == hero && item.equiped == true;
            });

            if (skin) {
                var customSkin = {};
                customSkin['Skin:' + hero] = skin.filename;

                pc.app.fire('CustomSkin:Set', customSkin);
            }

            var skin = this.getLocalSkin('Scar');

            if (skin) {
                var customSkin = {};
                customSkin['Skin:Scar'] = skin.filename;

                pc.app.fire('CustomSkin:Set', customSkin);
            }
        },
        setMenu: function() {
            this.setStorage('Server', this.session.country);
            this.setStorage('CurrentMap', this.session.map);
            this.setStorage('CurrentMode', this.session.mode);
        },
        getMenu: function() {
            var serverRegion = this.getStorage('Server');

            if (serverRegion) {
                this.session.country = serverRegion;
            }

            var currentMap = this.getStorage('CurrentMap');

            if (currentMap) {
                this.session.map = currentMap;
            }

            var currentMode = this.getStorage('CurrentMode');

            if (currentMode) {
                this.session.mode = currentMode;
            }

            //auto selection
            if (!currentMap) {
                var item = this.guestMaps[Math.floor(Math.random() * this.guestMaps.length)];

                this.selectMap({
                    name: item.name,
                    mode: item.mode
                });
            }

            this.session.is_mobile = this.isMobile();
            this.refreshMenu();
        },
        getOnlineUsersByMap: function(name) {
            if (this.session.mapOnline[this.session.country] && this.session.mapOnline[this.session.country][name]) {
                return this.session.mapOnline[this.session.country][name];
            } else {
                return false;
            }
        },
        refreshMenu: function() {
            this.service('account', '?request=get_menu_v2', {}, function(data) {
                if (data.success) {
                    if (!app.getStorage('Server')) {
                        app.session.country = data.server;
                    }

                    app.twitch.username = data.preview_text;
                    app.twitch.link = data.preview_link;
                    app.twitch.is_stream = data.is_stream;

                    app.session.version = data.version;
                    app.session.online = data.online;
                    app.session.regions = data.regions;
                    app.session.mapOnline = data.maps;

                    if (app.session.version != VERSION_CODE) {
                        //this TODO
                        app.alert('Please press CTRL + F5 to update your client!');
                    }
                }
            });
        },
        setRetentionStats: function() {
            if (this.session.hash) {
                PokiSDK.customEvent('game', 'segment', {
                    segment: 'registered'
                });
            } else {
                PokiSDK.customEvent('game', 'segment', {
                    segment: 'guest'
                });
            }

            /*
            this.service('account', '?request=retention_stats', {
            	first_cookie_date : this.getStorage('FirstCookieDate'),
            	last_cookie_date : this.getStorage('LastCookieDate'),
            	is_desktop : !this.session.is_mobile,
            	is_mobile  : this.session.is_mobile,
            	is_logged_in : this.session.hash
            }, function(data){
            	if(data.success){
            		if(!app.getStorage('FirstCookieDate')){
            			app.setStorage('FirstCookieDate', data.today);
            		}

            		app.setStorage('LastCookieDate', data.today);
            	}
            });
            */
        },
        onSettingsChange: function() {
            this.setStorage('Sensivity', this.settings.sensivity, true);
            this.setStorage('ADSSensivity', this.settings.adsSensivity, true);
            this.setStorage('WeaponBobbing', this.settings.weaponBobbing, true);
            this.setStorage('WeaponLeaning', this.settings.weaponLeaning, true);
            this.setStorage('FOV', this.settings.fov, true);
            this.setStorage('Quality', this.settings.quality, true);
            this.setStorage('Volume', this.settings.volume, true);
            this.setStorage('InvertMouse', this.settings.invertMouse, true);
            this.setStorage('FPSCounter', this.settings.fpsCounter, true);
            this.setStorage('DisableSpecialEffects', this.settings.disableSpecialEffects, true);
            this.setStorage('DisableShadows', this.settings.disableShadows, true);
            this.setStorage('HideUIElements', this.settings.hideUIElements, true);
            this.setStorage('HideMedals', this.settings.hideMedals, true);
            this.setStorage('HideChat', this.settings.hideChat, true);
            this.setStorage('HideUsernames', this.settings.hideUsernames, true);
            this.setStorage('CrosshairScale', this.settings.crosshairScale, true);
            this.setStorage('HideCrosshair', this.settings.hideCrosshair, true);
            this.setStorage('HideCharms', this.settings.hideCharms, true);
            this.setStorage('HideArms', this.settings.hideArms, true);
            this.setStorage('DisableLeaderboard', this.settings.disableLeaderboard, true);
            this.setStorage('DisableUsernames', this.settings.disableUsernames, true);
            this.setStorage('DisableTime', this.settings.disableTime, true);
            this.setStorage('CameraSpeed', this.settings.cameraSpeed, true);

            pc.app.fire('Menu:Settings');
        },
        onCustomSettingsChange: function(setting) {
            if (setting.type == 'message') return;
            this.setStorage(setting.name, setting.value, true);

            pc.app.fire('Menu:Settings');
            pc.app.fire('Client:CustomSettingsChange', setting);
        },
        loadSettings: function() {
            this.settings.sensivity = this.getStorage('Sensivity');
            this.settings.adsSensivity = this.getStorage('ADSSensivity');
            this.settings.weaponBobbing = this.getStorage('WeaponBobbing');
            this.settings.weaponLeaning = this.getStorage('WeaponLeaning');
            this.settings.fov = this.getStorage('FOV');
            this.settings.quality = this.getStorage('Quality');
            this.settings.volume = this.getStorage('Volume');
            this.settings.invertMouse = this.getStorage('InvertMouse');
            this.settings.fpsCounter = this.getStorage('FPSCounter');
            this.settings.disableSpecialEffects = this.getStorage('DisableSpecialEffects');
            this.settings.disableShadows = this.getStorage('DisableShadows');
            this.settings.hideUIElements = this.getStorage('HideUIElements');
            this.settings.hideMedals = this.getStorage('HideMedals');
            this.settings.hideChat = this.getStorage('HideChat');
            this.settings.hideUsernames = this.getStorage('HideUsernames');
            this.settings.crosshairScale = this.getStorage('CrosshairScale');
            this.settings.hideCrosshair = this.getStorage('HideCrosshair');
            this.settings.hideCharms = this.getStorage('HideCharms');
            this.settings.hideArms = this.getStorage('HideArms');
            this.settings.disableLeaderboard = this.getStorage('DisableLeaderboard');
            this.settings.disableUsernames = this.getStorage('DisableUsernames');
            this.settings.disableTime = this.getStorage('DisableTime');
            this.settings.cameraSpeed = this.getStorage('CameraSpeed');

            for (i = 0; i < this.customSettings.length; i++) {
                if (this.customSettings[i].type == 'message') continue;
                if (this.customSettings[i].type == 'checkbox') this.customSettings[i].value = this.getStorage(this.customSettings[i].name);
                if (this.customSettings[i].type == 'slider') {
                    var value = this.getStorage(this.customSettings[i].name);
                    if (value == null) value = this.customSettings[i].value;
                    this.customSettings[i].value = value;
                }
            }
        },
        onKeyDown: function(event) {
            /*if(app.waitingForKeyboard && Utils){
            	var keyCode  = event.keyCode;
                var keyboardSettings = Utils.getItem('KeyConfiguration');
                
                if(keyboardSettings){
                    keyboardSettings = JSON.parse(keyboardSettings);
                }else{
                    keyboardSettings = {};
                }
                
                if(app.waitingForKeyboard.key){
                    keyboardSettings[app.waitingForKeyboard.key] = keyCode;
                }
                
                //save new settings
                Utils.setItem('KeyConfiguration', JSON.stringify(keyboardSettings));
                pc.app.fire('Menu:KeyboardConfiguration');

                app.waitingForKeyboard.key = keyboardMap[keyCode];
                app.waitingForKeyboard.waiting = false;
                app.waitingForKeyboard = false;
            }*/

            if (this.waitingForKeyboard && Utils) {
                var key = event.key;
                var keyCode = event.keyCode;
                var keyboardConfiguration = this.keyboardConfiguration;
                var keyboardSettings = Utils.getItem('KeyConfiguration');

                if (keyboardSettings) {
                    keyboardSettings = JSON.parse(keyboardSettings);
                }
                //
                for (var index in keyboardConfiguration) {
                    if (keyboardConfiguration[index].default_key == this.waitingForKeyboard.default_key) {
                        keyboardConfiguration[index].key = key.toUpperCase();
                        keyboardConfiguration[index].code = keyCode;
                        keyboardConfiguration[index].waiting = false;
                    }
                }
                keyboardSettings = keyboardConfiguration;

                //save new settings
                Utils.setItem('KeyConfiguration', JSON.stringify(keyboardSettings));
                pc.app.fire('Menu:KeyboardConfiguration');

                this.waitingForKeyboard = false;
            }

            if (
                app.mode == 'Menu' &&
                app.page == 'Result' &&
                event.key == 'Enter' &&
                document.activeElement.tagName != 'INPUT'
            ) {
                var chatInput = document.getElementById('chat-message');

                if (chatInput) {
                    chatInput.focus();
                }
            }
        },
        updateKeyboardBind: function(item) {
            this.waitingForKeyboard = item;
            this.waitingForKeyboard.waiting = true;
        },
        resetKeyboardBind: function(item) {
            /*item.key = item.default_key;

			var keyboardSettings = Utils.getItem('KeyConfiguration');
			    
		    if(keyboardSettings){
		        keyboardSettings = JSON.parse(keyboardSettings);
		    }else{
		        keyboardSettings = {};
		    }

		    delete keyboardSettings[item.key];

			Utils.setItem('KeyConfiguration', JSON.stringify(keyboardSettings));
			pc.app.fire('Menu:KeyboardConfiguration');*/

            item.key = item.default_key;
            item.code = item.default_code;

            var keyboardSettings = this.keyboardConfiguration;

            for (var index in keyboardSettings) {
                if (keyboardSettings[index].default_key == item.default_key) {
                    keyboardSettings[index].key = item.default_key;
                }
            }

            Utils.setItem('KeyConfiguration', JSON.stringify(keyboardSettings));
            pc.app.fire('Menu:KeyboardConfiguration');
        },
        loadKeyboardBindings: function() {
            /*var keyboardConfiguration = this.getStorage('KeyConfiguration');

            for(var index in this.keyboardConfiguration){
            	var keyboard = this.keyboardConfiguration[index];

            	if(keyboardConfiguration[keyboard.key]){
            		keyboard.key = keyboardMap[keyboardConfiguration[keyboard.key]];
            	}
            }*/

            if (!Utils.getItem('KeyConfiguration')) {
                Utils.setItem('KeyConfiguration', JSON.stringify(this.keyboardConfiguration));
                return false;
            }

            var newKeyboard = JSON.parse(Utils.getItem('KeyConfiguration'));
            var defaultKeyboard = this.keyboardConfiguration;
            var dynamic = newKeyboard;
            var check = null;

            if (defaultKeyboard.length > newKeyboard.length) {
                dynamic = defaultKeyboard;
                check = true;
            } else if (defaultKeyboard.length < newKeyboard.length) {
                check = false;
            }

            for (var index in dynamic) {
                if (newKeyboard[index].default_key == defaultKeyboard[index].default_key) {
                    defaultKeyboard[index].key = newKeyboard[index].key;
                    defaultKeyboard[index].code = newKeyboard[index].code;
                    this.keyboardConfiguration = defaultKeyboard;
                } else if (!check) {
                    //If the cache data is wrong, it deletes the wrong value.
                    dynamic.splice(index, 1);
                } else {
                    //If a new data is added to the keyboard and the cache data does not have this value, it equates the newly added data to the cache data.
                    var removed = dynamic.splice(index, 1)[0];
                    newKeyboard.splice(index, 0, removed);
                    defaultKeyboard.splice(index, 0, removed);
                }
            }

        },
        selectMap: function(map, withoutHomeRedirect) {
            this.session.map = map.name;
            this.session.mode = map.mode;

            if (this.session.maps.indexOf(map.name) > -1) {
                this.session.maps.splice(this.session.maps.indexOf(map.name), 1);
            } else {
                this.session.maps.push(map.name);
            }

            this.setStorage('SelectedMaps', this.session.maps);

            pc.app.fire('Map:Load', map.name);

            if (!withoutHomeRedirect) {
                this.setStorage('CurrentMap', this.session.map);
                //this.goHome();
            }

            PokiSDK.customEvent('game', 'segment', {
                segment: 'map:' + map.name
            });
        },
        isActiveMap: function(map) {
            return this.session.maps.indexOf(map.name) > -1;
        },
        selectMapAndCreateLink: function(map) {
            this.selectMap(map, true);
            this.createInvite();
        },
        startMatchmaking: function() {
            this.disableMatchmakingButton = true;

            clearTimeout(this.matchmakingButtonTimer);
            this.matchmakingButtonTimer = setTimeout(function() {
                app.disableMatchmakingButton = false;
            }, 2000);

            if (!this.homeBannerLoaded) {
                this.isMatchmaking = true;

                clearTimeout(this.homeBannerWaiter);
                this.homeBannerWaiter = setTimeout(function(self) {
                    self.startMatchmaking();
                }, 500, this);

                return false;
            }

            if (PokiSDK && PokiSDK.isAdBlocked()) {
                pc.app.fire('Mouse:Lock');
                app.loadGameSceneAndStartMatchmaking();
            } else {
                this.midrollAds(function() {
                    pc.app.fire('Mouse:Lock');
                    app.loadGameSceneAndStartMatchmaking();
                });
            }
        },
        midrollAds: function(callback) {
            try {
                document.exitPointerLock();
            } catch (event) {

            }

            this.isWatchingAds = true;

            pc.app.fire('Game:Mute', false);
            PokiSDK.commercialBreak().then(function(data) {
                app.isWatchingAds = false;

                if (callback) {
                    callback();
                }

                pc.app.fire('Game:Mute', true);
            });

            this.lastAdsShow = Date.now();
        },
        loadGameSceneAndStartMatchmaking: function() {
            var self = this;

            this.loadGameScene(function() {
                self._startMatchmaking();
            });
        },
        loadGameSceneAndStartSession: function() {
            var self = this;

            this.loadGameScene(function() {
                self.startRoomManager();
            });
        },
        loadGameScene: function(callback) {
            if (app.gameSceneLoaded) {
                callback();
                return false;
            }

            var self = this;
            var scene = pc.app.scenes.find('Prototype');

            clearTimeout(this.sceneCallbackTimer);

            if (!scene || !pc.app.scenes) {
                this.sceneCallbackTimer = setTimeout(function(self) {
                    self.loadGameScene(callback);
                }, 500, this);

                return false;
            }

            pc.app.scenes.loadSceneHierarchy(scene.url + '?v=' + VERSION_CODE, function(data) {
                callback();
            });

            app.gameSceneLoaded = true;
        },
        _startMatchmaking: function() {
            this.setEvent('NewCheckPoint', 'ClickPlay');
            this.isMatchmaking = true;

            var maps = this.session.map + ' - ' + this.session.mode;

            if (this.session.maps.length > 0) {
                maps = this.session.maps.join(',');
            }

            if (this.session.maps.length === 0) {
                maps = this.session.defaultMaps.join(',');
            }

            this.service(
                'matchmaking',
                '?request=find_room_v3&auth=' + this.session.hash, {
                    country: this.session.country,
                    maps: maps,
                    is_mobile: this.session.is_mobile,
                    version: this.session.server_version,
                    max_player: this.session.max_player
                },
                function(data) {
                    if (data) {
                        app.isMatchmaking = false;
                        pc.app.fire('Sound:Menu', 'MatchFound');

                        app.setEvent('NewCheckPoint', 'MatchFound');

                        if (data.success) {
                            app.invite.hash = '';
                            app.invite.link = '';

                            window.onhashchange = null;
                            app.setGameData(data);

                            if (data.map) {
                                var mapParse = data.map.split(' - ');

                                app.page = 'Loading';
                                app.transitionToggle(true, mapParse[0], mapParse[1]);
                            }

                            PokiSDK.gameplayStart();
                        } else {
                            app.alert(data.message);
                            app.stopMatchmaking();
                        }
                    } else {
                        app.setEvent('NewCheckPoint', 'MatchError');

                        app.alert('An error occured');
                        app.stopMatchmaking();
                    }
                }
            );
        },
        setGameData: function(data) {
            if (!pc.isNetworkLoaded) {
                clearTimeout(this.networkTimer);
                this.networkTimer = setTimeout(function() {
                    app.setGameData(data);
                }, 1000);

                console.log('Waiting for network connector...');
            } else {
                app.setSessionSettings();

                if (app.invite.hash) {
                    console.log('Invite join');
                    window.location.hash = app.invite.hash;
                    pc.app.fire('Network:Options', data.result);
                } else {
                    console.log('Hash join');
                    window.location.hash = data.room.hash;
                    pc.app.fire('Network:Options', data.room);
                }
            }
        },

        connectInvite: function(data) {
            if (!pc.isNetworkLoaded) {
                clearTimeout(this.networkTimer);
                this.networkTimer = setTimeout(function() {
                    app.connectInvite(data);
                }, 1000);

                console.log('Waiting for network connector...');
            } else {
                pc.app.fire('RoomManager:ConnectInvite', data);
            }
        },
        connectGame: function() {
            console.log('Connect game!');
            this.startRoomManager();
        },
        stopMatchmaking: function() {
            try {
                document.exitPointerLock();
            } catch (event) {

            }

            this.isMatchmaking = false;
            this.mode = 'Menu';
            this.page = 'Home';
            this.tab = 'General';

            clearTimeout(this.networkTimer);

            PokiSDK.gameplayStop();
        },
        openInvite: function() {
            this.page = 'Invite';
            this.tab = 'General';
            this.isMapSelected = false;

            this.getCustomMaps();
        },
        setInviteStatus: function(owner) {
            app.page = 'Invite';
            app.isMapSelected = true;
            app.invite.isOwner = owner;

            //app.invite.hash    = window.location.hash.split('#')[1];
        },
        getHashOnly: function(hash) {
            var hashOnly = hash.split(':');

            console.log(hashOnly);
            if (hashOnly.length > 1) {
                return hashOnly[1];
            } else {
                return hashOnly[0];
            }
        },
        checkInviteHash: function() {
            this.invite.hash = window.location.hash.split('#')[1];

            if (!this.invite.hash) {
                return false;
            }

            this.service(
                'matchmaking',
                '?request=get_room&hash=' + this.getHashOnly(this.invite.hash), {},
                function(data) {
                    if (data) {
                        if (data.success) {
                            var parts = data.result.map.split(' - ');

                            app.selectMap({
                                name: parts[0],
                                mode: parts[1]
                            });

                            app.setMenu();

                            app.page = 'Invite';
                            app.isMapSelected = true;

                            app.connectInvite(data);

                            if (app.isSpectating) {
                                app.invite.link = 'https://venge.io/#Spectate:' + data.result.hash;
                            } else {
                                app.invite.link = 'https://venge.io/#' + data.result.hash;
                            }

                            app.invite.room = data.result.hash;
                            //app.invite.hash = data.result.hash;
                        } else {
                            app.invite.hash = '';
                            app.invite.link = '';
                            app.invite.room = '';

                            window.location.hash = '';
                        }
                    } else {
                        app.alert('An error occured');
                    }
                }
            );
        },
        leaveGame: function() {
            PokiSDK.destroyAd(document.getElementById('result-banner'));
            PokiSDK.destroyAd(document.getElementById('pause-banner'));

            this.page = 'Home';
            pc.app.fire('Player:Leave');

            PokiSDK.gameplayStop();
        },
        continueNextGame: function() {
            PokiSDK.destroyAd(document.getElementById('result-banner'));

            this.startMatchmaking();
        },
        continueGame: function() {
            this.hidePauseMenu();

            pc.app.fire('Player:PointerLock');
            pc.app.fire('Network:Continue');

            PokiSDK.gameplayStart();
            this.session.isWaitingJoin = false;
        },
        showPauseMenu: function(players) {
            this.pause.isPaused = true;

            this.page = 'Pause';
            this.mode = 'Menu';
            this.pause.players = players;

            this.pause.try = this.shuffle(this.pause.try);

            PokiSDK.gameplayStop();

            PokiSDK.customEvent('game', 'segment', {
                segment: 'pause-show'
            });

            //TODO
            //pc.app.fire('');
        },
        hidePauseMenu: function() {
            this.pause.isPaused = false;

            this.page = 'Home';
            this.mode = 'Game';
        },
        gameplayStartEvent: function() {
            PokiSDK.gameplayStart();
        },
        shuffle: function(array) {
            let currentIndex = array.length,
                randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex != 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }

            return array;
        },
        pauseTry: function(item) {
            if (item.unlocked) {
                pc.app.fire(item.action.call, item.action.value);
                pc.app.fire('Sound:Menu', 'Select');

                return false;
            }

            item.unlocked = true;

            pc.app.fire('Game:Mute', false);
            PokiSDK.customEvent('game', 'segment', {
                segment: 'pause-reward'
            });
            PokiSDK.rewardedBreak().then(function(success) {
                if (success) {
                    pc.app.fire(item.action.call, item.action.value);
                    pc.app.fire('Sound:Menu', 'Select');
                } else {
                    app.showMessage('Please disable Adblock or use Google Chrome browser to receive reward!');
                }

                pc.app.fire('Game:Mute', true);
            });
        },
        createInvite: function(callback) {
            this.page = 'Invite';
            this.isMapSelected = true;
            this.isStarted = false;

            this.service(
                'matchmaking',
                '?request=create_room_v2&auth=' + this.session.hash, {
                    country: this.session.country,
                    maps: this.session.map + ' - ' + this.session.mode,
                    is_mobile: this.session.is_mobile,
                    version: this.session.server_version,
                    max_player: this.session.max_player
                },
                function(data) {
                    if (data) {
                        if (data.success) {
                            pc.app.fire(
                                'RoomManager:ConnectInvite', data
                            );

                            if (callback) {
                                callback(data.result.hash);
                            }

                            window.onhashchange = null;
                            window.location.hash = '#' + data.result.hash;

                            if (app.isSpectating) {
                                app.invite.link = 'https://venge.io/#Spectate:' + data.result.hash;
                            } else {
                                app.invite.link = 'https://venge.io/#' + data.result.hash;
                            }
                            //app.invite.link = 'https://venge.io/#' + data.result.hash;
                            app.invite.hash = data.result.hash;
                            app.invite.room = data.result.hash;
                        } else {
                            app.alert(data.message);
                        }
                    } else {
                        app.alert('An error occured');
                    }
                }
            );
        },
        getCustomMaps: function() {
            this.service(
                'account',
                '?request=get_published_maps', {},
                function(data) {
                    if (data) {
                        if (data.success) {
                            app.customMaps = data.result;
                        }
                    }
                }
            );
        },
        getCustomMapsByCategory: function(category) {
            this.category = category;

            this.service(
                'account',
                '?request=get_maps', {
                    category: category
                },
                function(data) {
                    if (data) {
                        if (data.success) {
                            app.customMaps = data.result;
                        }
                    }
                }
            );
        },
        searchCustomMap: function() {
            this.service(
                'account',
                '?request=search_custom_game', {
                    keyword: this.form.search
                },
                function(data) {
                    if (data) {
                        if (data.success) {
                            app.customMaps = data.result;
                        } else {
                            app.showMessage(data.message);
                        }
                    }
                }
            );
        },
        startInviteSession: function() {
            //if(app.invite.players.length === 1){
            if (this.invite.players.length === 1) {
                app.alert('Please wait for your friends!', false);
            } else {
                if (this.isStarted) {
                    return false;
                }

                this.startRoomManager();

                setTimeout(function() {
                    pc.app.fire('RoomManager:Start');
                }, 1000);

                this.isStarted = true;
            }
        },
        startRoomManager: function() {
            this.service(
                'matchmaking',
                '?request=get_room&hash=' + this.getHashOnly(this.invite.hash), {},
                function(data) {
                    if (data) {
                        if (data.success) {
                            app.setGameData(data);
                        }
                    } else {
                        app.alert('An error occured');
                    }
                }
            );
        },
        cancelInvite: function() {
            this.page = 'Home';
            window.location.hash = '';
            pc.app.fire('RoomManager:Leave');

            this.service(
                'matchmaking',
                '?request=destroy_room', {},
                function(data) {
                    if (data) {
                        if (data.success) {

                        }
                    } else {
                        app.alert('An error occured');
                        app.stopMatchmaking();
                    }
                }
            );
        },
        goAccount: function() {
            this.popupClose();
            this.getProfileDetails();

            if (this.profile.success) {
                this.page = 'Profile';
            } else {
                this.page = 'Login';
            }
        },
        goHeroes: function() {
            if (this.isPoki() || !this.session.hash) {
                this.goShop();

                this.getWeeklyShopOffers(function() {
                    app.setShopTab({
                        tab: 'Heroes'
                    });
                });
            } else {
                this.goLoadoutMenu();
            }
        },
        goHome: function() {
            this.page = 'Home';
            this.tab = 'General';
        },
        goShop: function() {
            this.page = 'Shop';
            this.tab = 'General';

            this.getBalance();

            /*
            if(this.isPoki()){
            	this.getWeeklyShopOffers(function(){
            		app.setShopTab({ tab : 'Heroes' });
            	});
            }
            */
        },
        goLeaderboard: function() {
            this.page = 'Leaderboard';
            this.tab = 'General';

            this.getLeaderboardData();
        },
        goSettings: function() {
            this.page = 'Settings';
            this.tab = 'General';

            this.loadSettings();
        },
        goBackLoadout: function() {
            if (this.tab == 'General') {
                this.page = 'Home';
                this.getLoadout();
            } else if (this.tab == 'Skins') {
                this.tab = 'Loadout';
            } else {
                this.tab = 'General';
            }
        },
        resetContent: function() {
            app.page = 'Home';
            app.tab = 'General';
            app.verticalTab = 'General';

            //Session Reset
            app.session.character = 'Lilium';
            app.session.hash = '';
            app.setStorage('Hash', '', true);
            app.session.balance = 0;
            app.profile = {
                coins: 0
            };
            app.clan.details = '';
            app.error = '';

            //Lootbox Reset
            app.lootbox.animating = false;
            app.lootbox.crate = false;
            app.lootbox.active = false;
            app.lootbox.unlocking = false;
            app.lootbox.items = [];
        },
        goLoadoutMenu: function() {
            this.getLoadout();

            this.page = 'Heroes';
            this.tab = 'General';
        },
        goCharacterSelection: function() {
            this.goLoadoutMenu();

            setTimeout(function() {
                app.setLoadoutCategory(app.loadout[0]);
                app.activeLoadout(app.loadout[0]);
            }, 300);
        },
        getLootboxAdsRatio: function() {
            if (this.lootbox && this.lootbox.active) {
                var missing = parseInt(this.lootbox.crate.price) - parseInt(this.profile.coins);
                return Math.round(Math.floor(missing) / 200);
            } else {
                return '1';
            }
        },
        canBuy: function() {
            if (this.lootbox && this.lootbox.active) {
                if (parseInt(this.profile.coins) <= parseInt(this.lootbox.crate.price)) {
                    return false;
                } else {
                    return true;
                }
            }

            if (!this.popup) {
                return false;
            }

            if (parseInt(this.profile.coins) <= parseInt(this.popup.price)) {
                return false;
            } else {
                return true;
            }
        },
        showItem: function(item) {
            if (item.class == 'Crate') {
                this.lootbox.freeCrate = false;
                this.setLootbox(item);
                this.popup = true;
                this.resizePopup();
                return false;
            }

            this.popup = item;
            this.resizePopup();
        },
        resizePopup: function() {
            var calcScale = 1.4;
            if (window.innerHeight < 450 && app.buyVG.active) {
                calcScale = 0.65;
            } else if (app.buyVG.active) {
                calcScale = 1.1;
            }

            document.querySelectorAll('.popup').forEach(function(element) {
                var scale = window.innerWidth / 960;
                scale = Math.min(scale, calcScale);
                element.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
            });
        },
        resizeBanner: function() {
            var scale = 1 / (1900 * 1 / window.innerWidth);

            this.homeBannerScale = scale;
        },
        buyOffer: function(item) {
            this.popup = false;

            if (item.type == 'market_item') {
                this.service('account', '?request=buy_item', {
                    id: item.id
                }, function(data) {
                    if (data.success) {
                        app.alert(data.message, true);
                        //app.getOffers();
                    } else {
                        app.page = 'Login';
                        app.error = data.message;
                    }
                });
            } else {
                this.service('account', '?request=buy_offer', {
                    offer_id: item.id
                }, function(data) {
                    if (data.success) {
                        app.alert(data.message, true);
                    } else {
                        app.page = 'Login';
                        app.error = data.message;
                    }
                });
            }

            this.getBalance();
        },
        playHoverSound: function() {
            pc.app.fire('Sound:Menu', 'Hover');
        },
        claimFreeSkin: function() {
            this.setEvent('FreeSkin', 'Clicked');

            PokiSDK.customEvent('game', 'segment', {
                segment: 'rewarded'
            });
            PokiSDK.rewardedBreak().then(function(success) {
                if (success) {
                    app.setEvent('FreeSkin', 'Success');
                    app.getFreeSkin(success);
                } else {
                    //cant give reward
                    app.setEvent('FreeSkin', 'Success');
                    app.showMessage('Please disable Adblock or use Google Chrome browser to receive reward!');
                }
            });
        },
        getFreeSkin: function() {
            this.session.claimedFreeSkin = true;
            this.lootbox.crate = {
                'name': 'Free Skin',
                'type': 'Crate',
                'rarities': [{
                        'name': 'Common',
                        'percentage': '70'
                    },
                    {
                        'name': 'Uncommon',
                        'percentage': '30'
                    },
                    {
                        'name': 'Rare',
                        'percentage': '10'
                    }
                ]
            };

            this.lootbox.active = true;
            this.popup = true;

            this.lootbox.unlocking = false;
            this.lootbox.animating = true;

            this.service('account', '?request=buy_free_lootbox', {}, function(data) {
                if (data.success) {
                    app.lootbox.unlocking = true;
                    app.lootbox.items = data.items;

                    app.currentRarity = '';

                    setTimeout(function() {
                        app.currentRarity = data.item.rarity;
                        app.lootbox.animating = false;
                    }, 4500);
                } else {
                    app.popupClose();
                    app.alert(data.message);
                }
            });
        },
        redeemReward: function() {
            PokiSDK.customEvent('game', 'segment', {
                segment: 'rewarded'
            });
            PokiSDK.rewardedBreak().then(function(success) {
                if (success) {
                    app.claimReward(success);
                } else {
                    //cant give reward
                    app.showMessage('Please disable Adblock or use Google Chrome browser to receive reward!');
                }
            });
        },
        openBuyVG: function() {
            this.buyVG.active = true;
            this.popup = true;
            app.resizePopup();

            var creatorCode = app.getStorage('CreatorCode', true);

            if (creatorCode) {
                this.buyVG.appliedCreatorCode = creatorCode
                this.buyVG.creatorCode = creatorCode;
            }
        },
        selectVGPack: function(pack) {
            this.buyVG.state = 'Redirecting';

            this.service('account', 'payment.token.php', {
                quantity: parseInt(pack.amount),
                content_creator: this.buyVG.creatorCode
            }, function(data) {
                if (data.success) {
                    app.loadXsolla(data);
                } else {
                    app.popupClose();
                    app.alert(data.message);

                    app.goAccount();
                }
            });
        },
        applyCreatorCode: function() {
            //will be loading
            //this.service...
            this.error = '';

            this.service('account', '?request=check_creator_code', {
                creator_code: this.buyVG.creatorCode
            }, function(data) {
                if (!data.success) {
                    app.error = (data.message);
                } else {
                    app.buyVG.appliedCreatorCode = data.creator;
                    app.setStorage('CreatorCode', app.buyVG.appliedCreatorCode, true);
                    app.alert(data.message, true);
                }
            });
        },
        loadXsolla: function(result) {
            var options = {
                access_token: result.token,
                lightbox: {
                    closeByClick: false
                }
            };

            var self = this;

            var s = document.createElement('script');
            s.type = "text/javascript";
            s.async = true;
            s.src = "//static.xsolla.com/embed/paystation/1.0.7/widget.min.js";
            s.addEventListener('load', function(e) {
                XPayStationWidget.on(XPayStationWidget.eventTypes.CLOSE, function() {
                    app.buyVG.state = 'Pack';
                    app.buyVG.active = false;
                    app.popupClose();

                    app.getBalance();
                });

                XPayStationWidget.init(options);

                setTimeout(function() {
                    //self.buyButton.enabled = true;
                    XPayStationWidget.open();
                }, 100);
            }, false);

            var head = document.getElementsByTagName('head')[0];
            head.appendChild(s);
        },
        focusInput: function(elementId) {
            setTimeout(function() {
                var element = document.querySelector(elementId);

                if (element) {
                    element.focus();
                }
            }, 50);
        },
        closeBuyVG: function() {
            this.buyVG.active = false;
        },
        watchAdsToBuy: function() {
            PokiSDK.customEvent('game', 'segment', {
                segment: 'rewarded'
            });
            PokiSDK.rewardedBreak().then(function(success) {
                if (success) {
                    app.claimReward(success);
                } else {
                    //cant give reward
                    app.showMessage('Please disable Adblock or use Google Chrome browser to receive reward!');
                }
            });
        },
        claimReward: function() {
            this.service('account', '?request=redeem_reward', {}, function(data) {
                if (!data.success) {
                    app.alert(data.message);
                } else {
                    app.alert(data.message, true);
                }

                app.rewardTime = 10;
                app.getBalance();
            });
        },
        setLootbox: function(item) {
            this.lootbox.crate = item
            this.lootbox.active = true;

            this.lootbox.animating = false;
        },
        openLootbox: function() {
            if (!this.session.hash && !this.canBuy()) {
                return false;
            }

            this.lootbox.unlocking = false;
            this.lootbox.animating = true;

            pc.app.fire('Sound:Menu', 'Buy');
            pc.app.fire('Sound:Menu', 'Select');
            //pc.app.fire('Sound:Menu', 'Whip');

            this.callLootbox();
        },
        callLootbox: function() {
            pc.app.fire('Sound:Menu', 'Spinning');
            this.service('account', '?request=buy_lootbox', {
                offer_id: this.lootbox.crate.id
            }, function(data) {
                if (data.success) {
                    app.lootbox.unlocking = true;
                    app.lootbox.items = data.items;

                    app.currentRarity = '';

                    setTimeout(function() {
                        pc.app.fire('Sound:Menu', 'Successful');
                        app.currentRarity = data.item.rarity;
                        app.lootbox.animating = false;
                    }, 4500);
                } else {
                    app.lootbox.active = false;
                    app.alert(data.message);
                }
            });

            this.getBalance();
        },
        closeLootbox: function() {
            this.lootbox.crate = false;
            this.lootbox.active = false;
            this.lootbox.unlocking = false;
        },
        getQuests: function() {
            this.popup = true;
            this.quest.active = true;
            this.resizePopup();

            this.service('account', '?request=get_quests', {}, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.quest.list = data.quests;
                    app.quest.can_reset = data.can_reset_quest;
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        newQuests: function() {
            this.service('account', '?request=clear_quests', {}, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.alert(app.success);
                    app.getQuests();
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        claimQuestReward: function(data) {
            this.service('account', '?request=claim_quest_reward', {
                index: data
            }, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.alert(app.success);
                    app.getQuests();
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });

            var questTitle = app.quest.list[data].title;

            PokiSDK.customEvent('game', 'segment', {
                segment: 'quest-completed:' + questTitle
            });
        },
        getLoadout: function(type) {
            app.loadContent = true;
            this.service('account', '?request=get_loadout_v4', {
                type: type
            }, function(data) {
                if (data.success) {

                    app.loadout = data.result;
                    app.error = '';

                    if (app.loadout.length > 0) {
                        app.loadoutCurrent = app.loadout[0];

                        if (app.loadoutCurrent) {
                            //app.session.character   = app.loadoutCurrent.weapon_name;
                            app.currentLoadoutThumbnail = app.loadoutCurrent.thumbnail;
                            app.loadContent = false;
                            //app.setStorage('Character', app.session.character);
                        }
                    }
                } else {
                    app.loadContent = false;
                    app.page = 'Login';
                    app.error = data.message;
                }
            });

            this.getInventory();
        },
        customizeItem: function() {
            app.tab = 'Skins';
            app.getInventory();
        },
        setFavoriteItem: function(item) {
            this.service('account', '?request=set_favorite_item', {
                item_id: item.id
            }, function(data) {
                if (data.success) {
                    app.alert(data.message, true);
                    app.fetchInventory(true);
                } else {
                    if (error) {
                        error(data);
                    }
                }
            });
        },
        fetchInventory: function(isUpdated, callback, error) {
            if (isUpdated) {
                this.inventoryUpdated = true;
            }

            if (!this.inventoryUpdated) {
                if (callback) {
                    callback({
                        success: true,
                        result: this.inventory
                    });
                }

                return false;
            }

            this.inventoryUpdated = false;
            this.service('account', '?request=get_inventory_v2', {}, function(data) {
                if (data.success) {
                    app.inventory = data.result;

                    if (callback) {
                        callback(data);
                    }
                } else {
                    if (error) {
                        error(data);
                    }
                }
            });
        },
        getInventory: function() {
            this.loadContent = true;
            pc.app.fire('Sound:Menu', 'Echo');

            this.fetchInventory(true, function(data) {
                app.currentSkins = [];

                for (var index in app.inventory) {
                    var item = app.inventory[index];

                    if (item.class == app.loadoutCurrent.weapon_name) {
                        app.currentSkins.push(item);
                        app.activeLoadout('Skin/' + app.currentSkins[0].class)

                        if (item.equiped) {
                            app.loadContent = false;
                            app.currentLoadoutThumbnail = item.thumbnail;

                            if (item.name != "Default") {
                                app.loadoutItemName = item.name.toUpperCase();
                                app.loadoutItemRarity = item.rarity.toUpperCase();
                                app.loadoutItemRarityColor = item.rarity;
                            } else {
                                app.loadoutItemName = '';
                                app.loadoutItemRarity = '';
                                app.loadoutItemRarityColor = '';
                            }
                        }
                    }
                }
            }, function(data) {
                //app.fullLoading = false;
                app.loadContent = false;
                app.page = 'Login';
                app.error = data.message;
            })
        },
        getInventoryEquip: function(_loadout) {
            var loadout = this.loadoutCurrent;

            if (_loadout) {
                loadout = _loadout;
                loadout.weapon_name = loadout.hero;
            }

            var output = 'https://assets.venge.io/' + loadout.thumbnail;

            if (this.inventory) {
                for (var index in this.inventory) {
                    var item = this.inventory[index];

                    if (
                        item.equiped &&
                        item.class == loadout.weapon_name
                    ) {
                        output = 'https://assets.venge.io/' + item.thumbnail + '?v=1.1';
                    }
                }
            }

            return output;
        },
        getActiveItem: function() {
            var output = false;

            if (this.inventory) {
                for (var index in this.inventory) {
                    var item = this.inventory[index];

                    if (
                        item.equiped &&
                        item.class == this.loadoutCurrent.weapon_name
                    ) {
                        output = item;
                    }
                }
            }

            return output;
        },
        activeLoadout: function(data) {
            var type = data != undefined ? data.type : '';


            if (type == 'Hero') {
                this.activeLoadoutMainCategory = 'HEROES';
                this.prevCategory = this.activeLoadoutMainCategory; //Prev Category
                this.backButton = 'LOADOUT';
            } else if (type != 'Hero' && type && this.tab != 'Skins') {
                this.activeLoadoutMainCategory = type.toUpperCase();
                this.prevCategory = this.activeLoadoutMainCategory; //Prev Category	
                this.backButton = 'LOADOUT';
            } else if (this.tab == 'Skins' && !type) {
                var _itemName = data.trim().split('/')[1].toUpperCase();
                this.activeLoadoutMainCategory = _itemName;
                this.activeLoadoutAltCategory = 'SKINS';
                this.backButton = this.prevCategory;
            } else if (data == 'Prev' && this.tab != 'General') {
                this.activeLoadoutMainCategory = this.prevCategory;
                this.activeLoadoutAltCategory = 'LOADOUT';
                this.backButton = 'LOADOUT';
            } else if (data == 'Prev' && !type) {
                this.activeLoadoutMainCategory = 'GENERAL';
                this.activeLoadoutAltCategory = 'LOADOUT';
                this.backButton = 'MENU'
            }
        },
        equipLootboxItem: function() {
            this.equipItem(this.lootbox.item);
            this.popupClose();

            app.alert('Equiped! Please make sure you are logged in!', true);
        },
        equipItem: function(item) {
            if (item.id === -1) {
                var activeItem = this.getActiveItem();

                this.service('account', '?request=unequip_item', {
                    id: activeItem.id
                }, function(data) {
                    if (data.success) {
                        app.getInventory();
                    }
                });
            } else {
                this.service('account', '?request=equip_item', {
                    id: item.id
                }, function(data) {
                    if (data.success) {
                        app.getInventory();
                    }
                });
            }
        },
        unequipItem: function(item) {
            this.service('account', '?request=unequip_item', {
                id: item.id
            }, function(data) {
                if (data.success) {
                    app.getInventory();
                }
            });
        },
        setLoadout: function(item) {
            this.sliderPosition = 40;

            //set the item
            app.loadoutCurrent.weapon_name = item.name;
            app.loadoutCurrent.thumbnail = item.thumbnail;

            var itemId = -1;

            if (item.id) {
                itemId = item.id;
            }

            pc.app.fire('Sound:Menu', 'Echo');
            this.service('account', '?request=set_loadout_v2', {
                itemId: itemId,
                itemName: app.loadoutCurrent.weapon_name,
                itemType: app.loadoutCurrent.type
            }, function(data) {
                if (data.success) {
                    app.setLoadoutCategory();

                    //to fix loadout
                    if (app.loadoutCurrent.type == 'Hero') {
                        app.session.character = app.loadoutCurrent.weapon_name;
                        app.setStorage('Character', app.loadoutCurrent.weapon_name);
                    }
                } else {
                    if (data.action == 'AccountManager:Login') {
                        app.page = 'Login';
                        app.error = data.message;
                    } else {
                        app.alert(data.message);
                    }
                }
            });
        },
        setLoadoutCategory: function(item) {
            this.tab = 'Loadout';

            if (item) {
                this.loadoutCurrent = item;
            }

            this.service('account', '?request=get_weapons_v3', {
                type: this.loadoutCurrent.type
            }, function(data) {
                if (data.success) {
                    app.loadoutCategory = data.result;
                    app.setActiveThumbnail();
                    app.loadoutDetail(app.loadoutCurrent.type);
                    app.error = '';

                    //Reset
                    app.loadoutItemName = '';
                    app.loadoutItemRarity = '';
                    app.loadoutItemRarityColor = '';
                } else {
                    app.page = 'Login';
                    app.error = data.message;
                }
            });
        },
        setActiveThumbnail: function() {
            var output = '';

            for (var index in app.loadoutCategory) {
                var item = app.loadoutCategory[index];

                if (item.active) {
                    output = item.thumbnail;
                }
            }

            this.currentLoadoutThumbnail = output;
        },
        loadoutDetail: function(item) {
            var requestUrl = '';
            var requestType = item == 'Hero' ? 'hero' : (item != 'Hero' && item != 'Charm' ? 'weapon' : false);
            var name = app.loadoutCurrent.weapon_name;


            if (requestType != false && !app.loadoutItemRawData[name]) {
                requestUrl = 'get_' + requestType + '_types';
                app.getLoadoutDetail(requestUrl);
            } //First Call
            else {
                app.setLoadoutDetail();
            } //Rerun 
        },
        getLoadoutDetail: function(requestUrl) {
            this.service('account', '?request=' + requestUrl, {}, function(data) {
                if (data.success) {
                    var result = data.data;
                    app.loadoutItemRawData = result;
                    app.setLoadoutDetail();
                } else {
                    app.error = data.message;
                }
            });
        },
        setLoadoutDetail: function(name, type) {
            if (type == 'Hero') {
                return;
            } //Disable multiple run

            var _type = app.loadoutCurrent.type;
            var _name = app.loadoutCurrent.weapon_name;
            var item = name == null ? name = _name : name;
            var result = app.loadoutItemRawData;
            app.loadoutItemDetail.type = _type;
            app.loadoutItemDetail.name = _name;

            if (_type == 'Hero') {
                app.loadoutItemDetail.hero = result[_name];
                app.loadoutItemDetail.story = result[_name].story;
            } else {

                //Prev Weapon
                if (result[item]) {
                    app.loadoutItemDetail.prevWeapon = result[item];
                    app.loadoutItemDetail.prevName = item;
                }

                //Selected Weapon
                if (result[_name]) {
                    app.loadoutItemDetail.currentWeapon = result[_name];
                    app.loadoutItemDetail.story = result[_name].description;
                }
            }
        },
        loadoutCompareBar: function(current, previous, int) {
            if (previous) {
                var currentPercentage = 100 * current / int;
                var previousPercentage = 100 * previous / int;
                var dist = Math.abs(currentPercentage - previousPercentage);
            }
            return dist + '%';
        },
        loadoutCompareBarPosition: function(current, previous, int) {
            if (previous) {
                var currentPercentage = 100 * current / int;
                var previousPercentage = 100 * previous / int;
                var dist = currentPercentage - previousPercentage;

                if (current > previous) {
                    dist = currentPercentage - dist;
                } else {
                    dist = previousPercentage - currentPercentage;
                    dist = currentPercentage;
                }
            }
            return dist + '%';
        },
        getOffers: function() {
            this.service('account', '?request=get_offers_v3', {}, function(data) {
                if (data.success) {
                    var output = {};

                    for (var index in data.items) {
                        var item = data.items[index];

                        if (!output[item.campaign]) {
                            output[item.campaign] = [];
                        }

                        output[item.campaign].push(item);
                    }

                    app.offers = output;
                } else {
                    app.error = data.message;
                }
            });

            this.getBalance();
        },
        getBalance: function() {
            this.service('account', '?request=get_coin_details', {}, function(data) {
                if (data.success) {
                    app.session.balance = data.balance;
                    app.session.coins = parseInt(data.balance_integer);
                    app.profile.coins = parseInt(data.balance_integer);

                    if (app.rewardTime > 0) {
                        if (app.canBuy()) {
                            app.rewardTime = 0;
                        }
                    }
                }
            });
        },
        setCrate: function(crate) {
            this.currentCrate = '';

            clearTimeout(this.crateTimer);
            this.crateTimer = setTimeout(function(self) {
                self.currentCrate = crate;
            }, 10, this);
        },
        getProfileDetails: function() {
            if (!this.session.hash) {
                return false;
            }

            this.service('account', '?request=get_details', {}, function(data) {
                if (data.success) {
                    app.profile = data;
                    app.session.character = data.hero;

                    //app.page  = 'Profile';
                    app.error = '';

                    if (data.hash) {
                        app.session.hash = data.hash;
                        app.session.username = data.username;

                        app.setStorage('Hash', data.hash, true);
                    }

                    app.activeFriendList();
                } else {
                    app.resetContent();
                    app.page = 'Login';
                    app.error = data.message;
                    app.success = '';
                }
            });
        },
        getInboxNotifications: function() {
            if (!this.session.hash) {
                return false;
            }

            this.service('account', '?request=get_inbox_notification', {}, function(data) {
                if (data.success === true) {
                    app.session.inboxNotification = data.notification;

                    if (app.session.inboxNotification > 0) {
                        document.title = app.session.inboxNotification + " New Message - Venge.io"
                        pc.app.fire('Sound:Menu', 'Echo');
                    } else {
                        document.title = app.title;
                    }
                }
            });
        },
        getInbox: function() {
            if (!this.session.hash) {
                return false;
            }

            this.service('account', '?request=get_messages', {}, function(data) {
                if (data.success === true) {
                    app.session.inbox = data.messages;
                    app.session.inboxNotification = 0;
                }
            });
        },
        searchFriends: function(query) {
            this.session.message.searchResults = [];
            this.session.message.isSelected = false;

            if (query) {
                for (var index in this.friends.list) {
                    var username = this.friends.list[index].username;

                    if (username.toLowerCase().search(query) > -1 && this.session.message.searchResults.length < 3) {
                        this.session.message.searchResults.push(username);
                    }
                }
            }
        },
        selectSearchResult: function(username) {
            if (this.session.message.searchResults.length > 0) {
                username = this.session.message.searchResults[0];
            }

            this.session.message.username = username;
            this.session.message.searchResults = [];
            this.session.message.isSelected = true;

            this.session.message.pastMessages = [];

            //fetch past results
            this.getPastMessages(username);

            document.getElementById('message-to-input').blur();

            if (username) {
                document.getElementById('message-box').focus();
            }
        },
        getPastMessages(username) {
            if (username) {
                this.service('account', '?request=get_messages', {
                    username: username
                }, function(data) {
                    if (data.success === true) {
                        //Sort Message by id
                        data.messages.sort(function(a, b) {
                            return (a.id - b.id);
                        });
                        app.session.message.pastMessages = data.messages;
                        app.scrollBottom('message-inbox');
                    }
                });
            }
        },
        sendMessage: function() {
            if (!this.session.hash) {
                return false;
            }

            var message = this.session.message.message;
            var to = this.session.message.username;

            if (!message) {
                return false;
            }

            if (!to) {
                return false;
            }

            this.session.message.pastMessages.push({
                sender: this.profile.username,
                message: message
            });

            this.session.message.message = '';

            this.service('account', '?request=send_message', {
                receiver: to,
                message: message
            }, function(data) {
                app.getPastMessages(to);
                if (data.success === true) {

                } else {
                    app.alert(data.message);
                }
            });
        },
        scrollBottom: function(name) {
            setTimeout(function() {
                var messageInbox = document.getElementById(name)
                messageInbox.scrollTo(0, messageInbox.scrollHeight);
            }, 10);
        },
        deleteMessage: function(item) {
            if (!this.session.hash) {
                return false;
            }

            this.service('account', '?request=delete_message', {
                id: item.id
            }, function(data) {
                if (data.success === true) {
                    app.getInbox();
                    app.alert(data.message, true);
                }
            });
        },
        getMessages: function(item) {
            if (this.session.message.disabled) {
                return false;
            }

            if (!item) {
                this.session.message.username = '';
                this.session.message.message = '';
                this.session.message.isSelected = false;
                this.session.message.pastMessages = [{
                    sender: 'venge',
                    message: 'Start your conversation with someone by typing their username above.'
                }];
            } else {
                this.session.message.username = item.sender ? item.sender : item.username;
                this.session.message.isSelected = true;
                this.session.message.message = '';
                this.session.message.pastMessages = [];

                app.hasBlocked(item.sender);

                this.getPastMessages(item.sender ? item.sender : item.username);
            }

            this.verticalTab = 'Message';
        },
        setBlockedUsers: function(username) {
            this.service('account', '?request=block_username', {
                username: username
            }, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.alert(app.success);
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        hasBlocked: function(item) {
            for (var i = 0; i < app.followings.length; i++) {
                if (app.followings[i].username == item) {
                    app.session.message.isBlockedUser = app.followings[i].blocked;
                }
            }
        },
        getFriendList: function() {
            this.service('account', '?request=get_friends', {}, function(data) {
                if (data.success) {
                    app.followers = data.followers;
                    app.followings = data.followings;
                }
            });
        },
        activeFriendList: function() {
            if (this.isFriendListActive) {
                return false;
            }

            chat.connect(app.session.hash);
            //chat.showNotification('Open friends with SHIFT + C');

            this.isFriendListActive = true;
        },
        openFriendsMenu: function() {
            chat.toggle();
        },
        goFollowings: function() {
            this.page = 'Profile';
            this.tab = 'Followings';

            app.getTableData('followings');
        },
        getAccountHome: function(hash) {
            this.service('account', '?request=get_details&hash=' + hash, {}, function(data) {
                if (data.success) {
                    app.profile = data;

                    app.session.hash = data.hash;
                    app.session.username = data.username;
                    app.session.character = data.hero;

                    app.fetchInventory(false, function() {
                        app.setMainHero();
                    });

                    app.activeFriendList();
                }
            });
        },
        getLeaderboardData: function(url) {
            this.fullLoading = true;
            var callUrl = url ? url : '?request=leaderboard&sort=rank';
            this.service('account', callUrl, {}, function(data) {
                app.fullLoading = false;
                if (data.success) {
                    app.leaderboard.table = data.result;
                    app.error = '';
                } else {
                    app.error = data.message;
                    app.success = '';
                }
            });
        },
        setLeaderboardTab: function(item) {
            this.tab = item.tab;
            this.leaderboard.icon = item.icon;
            this.leaderboard.title = item.name;

            if (this.tab == 'General') {
                this.getLeaderboardData('?request=leaderboard&sort=rank');
            } else if (this.tab == 'Weekly') {
                this.getLeaderboardData('?request=leaderboard&sort=weekly');
            } else if (this.tab == 'Global') {
                this.getLeaderboardData('?request=leaderboard&sort=score');
            } else if (this.tab == 'Popular') {
                this.getLeaderboardData('?request=leaderboard&sort=followers');
            } else if (this.tab == 'Headshots') {
                this.getLeaderboardData('?request=leaderboard&sort=headshots');
            } else if (this.tab == 'Kills') {
                this.getLeaderboardData('?request=leaderboard&sort=kills');
            } else if (this.tab == 'Clans') {
                this.getLeaderboardData('?request=leaderboard&sort=clans');
            }

        },
        getTableData: function(data, search = '') {
            var tabData = data.toLowerCase().trim();
            this.service('account', '?request=get_' + tabData, {
                search_term: search
            }, function(data) {
                if (data.success) {
                    app.table = data.result;
                    app.error = '';
                } else {
                    app.page = 'Login';
                    app.error = data.message;
                    app.success = '';
                }
            });
        },
        setTableData: function(data) {
            var tabData = data.toLowerCase().trim();
            this.service('account', '?request=set_' + tabData, {}, function(data) {
                if (data.success) {
                    app.table = data.result;
                    app.error = '';
                } else {
                    app.page = 'Login';
                    app.error = data.message;
                    app.success = '';
                }
            });
        },
        commendPlayer: function(username) {
            var message = username + ' commended! 👏';

            pc.app.fire('Network:Chat', message);

            this.service('account', '?request=commend_user', {
                username: username
            }, function(data) {
                if (data.success) {
                    app.alert(message);
                } else {
                    app.alert(app.message);
                }
            });

            this.result.commends.push(username);
        },
        reportPlayer: function(username) {
            pc.app.fire('Network:Report', username);

            this.service('account', '?request=report_user', {
                username: username
            }, function(data) {
                if (data.success) {
                    app.alert('Player reported, report code #' + data.code, true);
                } else {
                    app.alert(app.message);
                }
            });

            this.result.reports.push(username);
        },
        addFriend: function(username) {
            this.service('account', '?request=add_friend', {
                username: username
            }, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.alert(app.success);
                    if (app.tab == "Followings") {
                        app.getTableData('followings');
                    }
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });

            this.friends.added.push(username);
        },
        hasFriend: function(username) {
            return this.friends.added.indexOf(username) === -1;
        },
        hasCommended: function(username) {
            return this.result.commends.indexOf(username) === -1;
        },
        hasReported: function(username) {
            return this.result.reports.indexOf(username) === -1;
        },
        removeFriend: function(data) {
            this.service('account', '?request=remove_friend', {
                username: data
            }, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.alert(app.success);
                    app.getTableData('followings');
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        getProfileSettings: function(data) {
            this.service('account', '?request=get_account', {}, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;

                    app.form.email = data.email;
                    app.form.twitch = data.twitch;
                    app.killMessage.message = data.kill_message;

                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });

            this.service('account', '?request=get_death_screen_messages', {}, function(data) {
                if (data.success) {
                    app.error = '';
                    app.killMessage.list = data.data;
                }
            });
        },
        setProfileSettings: function() {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(app.form.email)) {
                app.alert("You have entered an invalid email address!");
                return false;
            }

            this.service('account', '?request=save_account', {
                password: app.form.new_password.trim().length > 0 ? app.form.new_password : '',
                email: app.form.email.trim().length > 0 ? app.form.email : '',
                twitch: app.form.twitch.trim().length > 0 ? app.form.twitch : '',
            }, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.alert(app.success);
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        joinClan: function(data) {
            this.service('account', '?request=join_clan', {
                id: data
            }, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.alert(app.success);
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        createClan: function() {
            this.service('account', '?request=create_clan', {
                name: app.clan.name,
                slug: app.clan.slug,
                social_link: app.clan.social_link
            }, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.alert(app.success);

                    //Reset
                    app.verticalTab = 'General';
                    app.getProfileDetails();
                    app.clanDetails();
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        quitClan: function() {
            this.service('account', '?request=quit_clan', {}, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.alert(app.success);
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        clanDetails: function() {
            this.service('account', '?request=get_clan_details', {}, function(data) {
                if (data.success) {
                    app.error = '';
                    app.clan.details = data;
                    app.clan.welcome_message = data.welcome_message;
                    app.clan.social_link = data.social_link;
                } else {
                    app.error = data.message;
                }
            });

            //Approve Request
            this.service('account', '?request=is_clan_owner&can_accept_requests=true', {}, function(data) {
                if (data.success) {
                    app.clan.member_access = true;
                }
            });
        },
        clanMembers: function() {
            this.service('account', '?request=get_clan_members', {}, function(data) {
                if (data.success) {
                    app.table = data.result;
                    app.error = '';
                } else {
                    app.page = 'Login';
                    app.error = data.message;
                    app.success = '';
                }
            });

            //Get Pending Request
            this.service('account', '?request=get_waiting_clan_members', {}, function(data) {
                if (data.success) {
                    app.clan.pending_request = data.result;
                    app.error = '';
                } else {
                    app.page = 'Login';
                    app.error = data.message;
                    app.success = '';
                }
            });
        },
        clanMemberKick: function(data) {
            this.service('account', '?request=kick_clan_member', {
                username: data
            }, function(data) {
                if (data.success) {
                    app.success = data.message;
                    app.alert(app.success);
                    app.clanMembers();
                } else {
                    app.error = data.message;
                    app.success = '';
                }
            });
        },
        clanMemberApprove: function(data) {
            this.service('account', '?request=approve_clan_member', {
                username: data
            }, function(data) {
                if (data.success) {
                    app.success = data.message;
                    app.alert(app.success);
                    app.clanMembers();
                } else {
                    app.error = data.message;
                    app.success = '';
                }
            });
        },
        clanMatches: function() {
            this.service('account', '?request=get_clan_matches', {}, function(data) {
                if (data.success) {
                    app.table = data.result;
                    app.error = '';
                } else {
                    app.page = 'Login';
                    app.error = data.message;
                    app.success = '';
                }
            });
        },
        clanBank: function() {
            this.service('account', '?request=get_clan_balance', {}, function(data) {
                if (data.success) {
                    app.clan.bankBalance = data;
                    app.error = '';
                } else {
                    app.page = 'Login';
                    app.error = data.message;
                    app.success = '';
                }
            });

            this.service('account', '?request=get_coin_details', {}, function(data) {
                if (data.success) {
                    app.clan.bankCoin = data;
                    app.error = '';
                } else {
                    app.page = 'Login';
                    app.error = data.message;
                    app.success = '';
                }
            });
        },
        depositCoin: function() {
            this.service('account', '?request=deposit_clan', {
                coins: app.clan.depositCoin
            }, function(data) {
                if (data.success) {
                    app.success = data.message;
                    app.alert(app.success);
                    app.clanBank();
                    app.clanDetails();
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        getClanRoles: function(data) {
            this.service('account', '?request=get_member_settings', {
                username: data,
            }, function(data) {
                if (data.success) {
                    app.success = data.message;
                    app.clan.roles = data;
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        updateClanRole: function() {
            console.log(app.clan.roles);
            this.service('account', '?request=update_member_settings_v2', {
                username: app.clan.roles.username,
                role: app.clan.roles.role,
                can_accept_requests: app.clan.roles.can_accept_requests,
                can_manage_chat: app.clan.roles.can_manage_chat
            }, function(data) {
                if (data.success) {
                    app.success = data.message;
                    app.alert(app.success);
                    app.clanMembers();
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                    app.getClanRoles(app.clan.roles.username);
                }
            });
        },
        removeClanRole: function(data) {
            this.service('account', '?request=remove_clan_role', {
                username: data,
            }, function(data) {
                if (data.success) {
                    app.success = data.message;
                    app.alert(app.success);
                    app.clanMembers();
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        updateClanSettings: function() {
            this.service('account', '?request=update_clan_settings', {
                welcome_message: app.clan.welcome_message,
                social_link: app.clan.social_link
            }, function(data) {
                if (data.success) {
                    app.success = data.message;
                    app.alert(app.success);
                    app.clanDetails();
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        leaveClan: function() {
            this.service('account', '?request=quit_clan', {}, function(data) {
                if (data.success) {
                    app.success = data.message;
                    app.alert(app.success);

                    //Reset
                    app.clan.details = '';
                    app.getProfileDetails();
                    app.getTableData('clans');
                    app.clanDetails();
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        deleteClan: function() {
            this.service('account', '?request=delete_clan', {}, function(data) {
                if (data.success) {
                    app.success = data.message;
                    app.alert(app.success);

                    //Reset
                    app.clan.details = '';
                    app.getProfileDetails();
                    app.getTableData('clans');
                    app.clanDetails();
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        setEmoji: function() {
            this.service('account', '?request=select_emoji', {
                emoji: app.emoji.selected.split(' ')[1]
            }, function(data) {
                if (data.success) {
                    app.error = data.message;
                    app.alert(app.error);
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        setKillMessage: function() {
            this.service('account', '?request=save_account', {
                kill_message: app.killMessage.message,
            }, function(data) {
                if (data.success) {
                    app.error = '';
                    app.success = data.message;
                    app.alert(app.success);
                } else {
                    app.error = data.message;
                    app.success = '';
                    app.alert(app.error);
                }
            });
        },
        login: function() {
            this.loading = true;
            this.error = '';

            this.session.localSkins = [];
            this.session.localCharacter = false;

            if (app.captcha.token) {
                app.service('account', '?request=login_v2', {
                    username: app.form.username,
                    password: app.form.password,
                    token: app.captcha.token
                }, function(data) {
                    app.loading = false;

                    if (data.success) {
                        app.resetContent();

                        app.session.hash = data.hash;

                        if (data.hash) {
                            app.setStorage('Hash', app.session.hash, true);
                        }

                        app.activeFriendList();

                        app.getProfileDetails();
                        app.page = 'Home';
                        app.verticalTab = 'General';
                        app.error = '';
                    } else {
                        app.error = data.message;
                        app.success = '';
                    }
                });
            } else {
                alert('An error occured with captcha, please refresh the page!');
            }
        },
        logout: function() {
            this.loading = true;
            this.error = '';

            this.session.localSkins = [];
            this.session.localCharacter = false;

            this.service('account', '?request=logout', {}, function(data) {
                app.loading = false;

                if (data.success) {
                    app.resetContent()
                } else {
                    app.error = data.message;
                    app.success = '';
                }
            });
        },
        register: function() {
            this.loading = true;
            this.error = '';

            if (app.captcha.token) {
                app.service('account', '?request=create_account_v2', {
                    username: app.form.username,
                    password: app.form.password,
                    token: app.captcha.token
                }, function(data) {
                    app.loading = false;

                    if (data.success) {
                        app.session.hash = data.hash;
                        app.page = 'Home';
                        app.error = '';

                        app.getProfileDetails();
                    } else {
                        app.error = data.message;
                        app.success = '';
                    }
                });
            } else {
                alert('An error occured with captcha, please refresh the page!');
            }
        },
        getSettings: function() {
            //get data from local storage
        },
        setSettings: function() {
            //set settings to the game system
        },
        setStorage: function(key, _value, noJSON) {
            var value = JSON.stringify(_value);

            if (noJSON) {
                value = _value;
            }

            if (this.isLocalStorageSupported()) {
                window.localStorage.setItem(key, value);
            } else {
                this.createCookie(key, value);
            }
        },
        getStorage: function(key, noJSON) {
            var data = false;

            if (this.isLocalStorageSupported()) {
                data = window.localStorage.getItem(key);
            } else {
                data = this.readCookie(key);
            }

            if (data && data != 'undefined') {
                if (noJSON) {
                    return data;
                } else {
                    return JSON.parse(data);
                }
            } else {
                return false;
            }
        },
        createCookie: function(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        readCookie: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        isLocalStorageSupported: function() {
            var isSupported = false;
            var mod = 'localStorageSupportTest';

            try {
                localStorage.setItem(mod, mod);
                localStorage.removeItem(mod);

                isSupported = true;
            } catch (e) {
                isSupported = false;
            }

            return isSupported;
        },
        alert: function(message, success) {
            if (success) {
                this.success = message;
            }

            this.alertText = message;
            pc.app.fire('Sound:Menu', 'Error');

            clearTimeout(this.alertTimer);
            this.alertTimer = setTimeout(function(self) {
                self.alertText = '';
            }, 5000, this);
        },
        showMessage: function(message) {
            this.alertMessage = message;
        },
        closeMessage: function() {
            this.alertMessage = false;
        },
        fileUpload: function(event, key, placeholder) {
            var file = event.files[0];

            this.encodeFile(file, function(data) {
                var json = {};
                json[key] = data;

                window.localStorage.setItem(key, JSON.stringify(json));

                app.crosshair[placeholder] = data;
            });
        },
        clearUpload: function(key, placeholder) {
            window.localStorage.removeItem(key);
            app.crosshair[placeholder] = false;
        },
        encodeFile: function(file, callback) {
            var FR = new FileReader();

            FR.addEventListener("load", function(e) {
                callback(e.target.result);
            });

            FR.readAsDataURL(file);
        },
        service: function(prefix, URL, data, success) {
            var params = typeof data == 'string' ? data : Object.keys(data).map(
                function(k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
                }
            ).join('&');

            var self = this;
            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

            if (URL == 'payment.token.php' || prefix == 'matchmaking') {
                xhr.open('POST', this.prefix[prefix] + URL);
            } else if (this.session.hash) {
                xhr.open('POST', this.prefix[prefix] + URL + '&hash=' + this.session.hash);
            } else {
                xhr.open('POST', this.prefix[prefix] + URL);
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState > 3 && xhr.status == 200) {
                    success(JSON.parse(xhr.responseText));
                }
            };
            //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            xhr.withCredentials = true;

            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
        },

        numberFormat: function(number, type) {
            var self = number;
            if (self != undefined && type == 'time') {
                var days = Number((parseFloat(self) / 24).toFixed(1));
                var hourFormat = Number((parseFloat(self)).toFixed(1)).toLocaleString();
                var minutesFormat = parseFloat(self.split(":")[1] / 60).toFixed(1).split(".")[1];
                return hourFormat + (minutesFormat != 0 ? '.' + minutesFormat + ' hrs' : ' hrs') + ' (' + days + ' days)';
            } else {
                return Number((parseFloat(number)).toFixed(1)).toLocaleString();
            }

        },
        cleanMarkup: function(username) {
            if (username && username.replace) {
                return username.replace(/\[color="(.*?)"\]/g, '')
                    .replace(/\[\/color]/g, '')
                    .replace(/\[rainbow\](.*?)\[\/rainbow] /g, '')
                    .replace(/\\/g, '').replace(/\[(.*?)\]/g, '').trim();
            }
        },
        formatMarkup: function(data) {
            if (data && data.replace && !data.includes("[rainbow]")) {
                return data
                    .replace(/\[color="(.*?)"\]/g, '<span style="color:$1">')
                    .replace(/\[\/color]/g, '</span>')
                    .replace(/\\/g, '');
            } else if (data && data.replace && data.includes("[rainbow]")) {
                return data
                    .replace(/\[rainbow\]/g, '<span class="rainbow">[')
                    .replace(/\[\/rainbow]/g, ']</span>')
            } else {
                return data;
            }
        },
        formatNumber: function(data) {
            if (data && data.replace) {
                return data.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            } else {
                return data;
            }
        },
        copyLink: function(data) {
            console.log(data);
            var text = data;

            navigator.clipboard.writeText(text).then(function() {
                app.alert('Link copied!', true);
            }, function(err) {
                app.alert('Cant copied, please select input and CTRL+C and CTRL+V');
            });
        },
        isMobile: function() {
            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile || (pc.isMobile)) {
                return true;
            } else {
                return false;
            }
        },
        isPoki: function() {
            return window.location.host.search('poki') > -1;
        },
        setEvent: function(event, value) {
            if (typeof gtag !== 'undefined') {
                gtag('event', value, {
                    'event_category': event,
                    'event_label': value
                });
            }
        },
        onLanguageChange: function(data) {
            this.currentLanguage = data;
            this.setStorage('Language', this.currentLanguage);
        },
        setLanguage: function() {
            if (this.getStorage('Language')) {
                this.currentLanguage = this.getStorage('Language');
            } else if (typeof window.navigator.language !== 'undefined') {
                this.currentLanguage = window.navigator.language.split('-')[0].toUpperCase();
            } else {
                this.currentLanguage = 'EN';
            }
        },
        playWhooshSound: function() {
            pc.app.fire('Sound:Menu', 'Whoosh');
        },
        getTranslation: function(key) {
            var isExist = this.languages[key][this.currentLanguage];

            if (isExist) {
                return isExist;
            } else {
                if (this.languages[key]['EN']) {
                    return this.languages[key]['EN'];
                } else {
                    return 'UNKNOWN';
                }
            }
        },
        setSessionSettings: function() {
            if (typeof pc !== 'undefined') {
                console.log('Character has been set');
                //pc.session.character = app.session.character;
            }
        },
        getCurrentShopItem: function() {
            var self = this;

            return this.shop.menu.find(function(item) {
                return item.tab == self.tab;
            });
        },
        showItem3D: function(item) {
            if (!item) {
                return false;
            }

            if (item.class != 'Crate') {
                this.shop.isCustomSkinLoaded = true;
            }

            pc.app.fire('Sound:Menu', 'Echo');

            pc.app.fire('View:State', 'Shop', true);

            if (item.class == 'Character') {
                pc.app.fire('Shop:SetItem', item.name, true);
                pc.app.fire('CustomSkin:Set', {
                    skin: item.name + '-Default.jpg'
                });
                this.shop.isCustomSkinLoaded = false;
            } else {
                pc.app.fire('Shop:SetItem', item.class, true);
            }

            pc.app.fire('CustomSkin:Set', {
                skin: item.filename,
                emission: item.emission
            });

            this.shop.activeItem = item;

            this.setViewState();
        },
        canWatchReward: function() {
            return Date.now() - this.lastRewardAds > 1000 * 60 * 5;
        },
        getWatchAdsResult: function() {
            this.service('account', '?request=request_ads_coin', {}, function(response) {
                if (response.success) {
                    pc.app.fire('Sound:Menu', 'Select');

                    if (response.coins < 500) {
                        app.showMessage('You have received ' + response.coins + ' VG for watching ads! This might not be enough to buy crates, but you can spend on market or watch more ads 5 minutes later!');
                    } else {
                        app.showMessage('You have received ' + response.coins + ' VG for watching ads!');
                    }

                    app.lastRewardAds = Date.now();
                    app.getBalance();
                } else {
                    app.showMessage(response.message);
                    app.lastRewardAds = Date.now();
                }
            });
        },
        watchRewardAds: function() {
            PokiSDK.rewardedBreak().then(function(success) {
                if (success) {
                    app.getWatchAdsResult();
                } else {
                    //cant give reward
                    app.showMessage('Please disable Adblock or use Google Chrome browser to receive reward!');
                }
            });
        },
        buyItem: function(item) {
            //enough coin
            if (!this.session.hash) {
                console.log('User isnt logged in, show reward ads');

                PokiSDK.rewardedBreak().then(function(success) {
                    if (success) {
                        pc.app.fire('Sound:Menu', 'Buy');
                        pc.app.fire('Sound:Menu', 'Select');

                        app.alert('Successfuly purchased ' + item.name, true);
                        app.addLocalSkin(item);
                    } else {
                        //cant give reward
                        app.showMessage('Please disable Adblock or use Google Chrome browser to receive reward!');
                    }
                });
            } else {
                if (this.session.coins >= item.price) {
                    this.service('account', '?request=buy_weekly_offer', {
                        item_id: item.id
                    }, function(response) {
                        if (response.success) {
                            pc.app.fire('Sound:Menu', 'Buy');
                            pc.app.fire('Sound:Menu', 'Select');

                            app.alert('Successfuly purchased ' + item.name, true);

                            app.getWeeklyShopOffers();
                            app.getBalance();
                            app.getInventory();
                        } else {
                            app.alert(response.message);
                        }
                    });
                } else {
                    //show optional popup
                    app.shop.notEnoughPopup = true;
                }
            }

            //not enough coin
            //show reward ads and xsolla
        },
        resellItem: function(item, withNumber) {
            var count = null;

            if ((item.requireConfirmation && !withNumber) || item.favorite) {
                //show javascript prompt to confirm
                var confirm = window.confirm('Are you sure you want to sell ' + item.name + ' for ' + item.resell + '?');

                if (!confirm) {
                    return false;
                }
            }

            if (withNumber) {
                //ask how much they wanna sell with js prompt
                var count = window.prompt('How many ' + item.name + ' do you want to sell?', 1);

                if (count === null) {
                    return false;
                }

                if (parseInt(count) < 0) {
                    app.showMessage('Number should be more than 1');
                    return false;
                }

                if (parseInt(count) > parseInt(item.quantity.replace('x', ''))) {
                    app.showMessage('You can not sell more than you have!');
                    return false;
                }
            }

            pc.app.fire('Sound:Menu', 'Echo');

            this.service('account', '?request=resell_item', {
                id: item.id,
                count: count
            }, function(response) {
                if (response.success) {
                    pc.app.fire('Sound:Menu', 'Resell');

                    app.alert('Successfuly quick sold: ' + item.name, true);

                    app.fetchInventory(true);
                    app.getBalance();
                } else {
                    app.alert(response.message);
                }
            });
        },
        unlockCrate: function(item) {
            if (!item) {
                return false;
            }

            if (Date.now() - this.shop.lastLootboxDate < 1500) {
                return false;
            }

            pc.app.fire('Sound:Menu', 'Echo');

            this.shop.isUnlocking = true;
            this.shop.lootboxContent = false;
            this.service('account', '?request=unlock_crate', {
                item_id: item.id
            }, function(data) {
                app.getBalance();

                if (data.success) {
                    setTimeout(function(_data) {
                        app.shop.lootboxContent = data.item;
                        app.shop.isUnlocking = false;
                    }, 1500, data);

                    pc.app.fire('Chest:Open', data.item);
                } else {
                    if (data.action == 'NotEnoughCoin') {
                        app.shop.notEnoughPopup = true;
                    }

                    app.shop.isUnlocking = false;
                    app.alert(data.message);
                }
            });

            this.shop.lastLootboxDate = Date.now();
        },
        unlockHeroWithAds: function(item) {
            if (!item) {
                return false;
            }

            if (this.getLocalSkinByName(item.name)) {
                pc.app.fire('Sound:Menu', 'Select');

                app.alert('Successfuly selected ' + item.name, true);
                app.session.localCharacter = item.name;

                app.session.character = item.name;
                app.setStorage('Character', item.name);

                return false;
            }

            PokiSDK.rewardedBreak().then(function(success) {
                if (success) {
                    pc.app.fire('Sound:Menu', 'Buy');
                    pc.app.fire('Sound:Menu', 'Select');

                    app.alert('Successfuly purchased ' + item.name, true);
                    app.session.localCharacter = item.name;

                    app.session.character = item.name;
                    app.setStorage('Character', item.name);

                    app.addLocalSkin(item);
                } else {
                    //cant give reward
                    app.showMessage('Please disable Adblock or use Google Chrome browser to receive reward!');
                }
            });
        },
        unlockCrateWithAds: function(item) {
            if (!item) {
                return false;
            }

            if (this.shop.canUnlockWithAds === 0) {
                //show ads
                PokiSDK.rewardedBreak().then(function(success) {
                    if (success) {
                        pc.app.fire('Sound:Menu', 'Buy');
                        pc.app.fire('Sound:Menu', 'Select');

                        app.alert('Successfuly purchased ' + item.name, true);
                        app.shop.canUnlockWithAds = app.shop.maxUnlockWithAds;

                        app.unlockCrateWithAds(item);
                    } else {
                        //cant give reward
                        app.showMessage('Please disable Adblock or use Google Chrome browser to receive reward!');
                    }
                });
            } else {
                if (this.shop.canUnlockWithAds > 0) {
                    this.shop.canUnlockWithAds--;
                }

                //call service
                if (Date.now() - this.shop.lastLootboxDate < 1500) {
                    return false;
                }

                pc.app.fire('Sound:Menu', 'Echo');
                this.shop.isUnlocking = true;

                this.shop.lootboxContent = false;
                this.service('account', '?request=unlock_demo_crate', {
                    item_id: item.id
                }, function(data) {
                    if (data.success) {
                        setTimeout(function(_data) {
                            app.shop.lootboxContent = data.item;
                            app.shop.isUnlocking = false;
                        }, 1500, data);

                        app.addLocalSkin(data.item);
                        pc.app.fire('Chest:Open', data.item);
                    } else {
                        app.alert(data.message);
                    }
                });

                this.shop.lastLootboxDate = Date.now();
            }
        },
        addLocalSkin: function(item) {
            this.session.localSkins.push(item);
        },
        getLocalSkin: function(type) {
            var skins = this.session.localSkins;

            for (var i = 0; i < skins.length; i++) {
                if (skins[i].class == type) {
                    return skins[i];
                }
            }

            return false;
        },
        getLocalSkinByName: function(name) {
            var skins = this.session.localSkins;

            for (var i = 0; i < skins.length; i++) {
                if (skins[i].name == name) {
                    return skins[i];
                }
            }

            return false;
        },
        filterInventory: function(item) {
            if (item.name == 'Default') {
                return false;
            } else {
                if (this.shop.type != '' && this.shop.rarity != '') {
                    return item.class == this.shop.type && item.rarity == this.shop.rarity;
                } else if (this.shop.type != '') {
                    return item.class == this.shop.type;
                } else if (this.shop.rarity != '') {
                    return item.rarity == this.shop.rarity;
                } else {
                    return true;
                }
            }
        },
        isUnlockedSkin: function(activeSkin) {
            if (this.session.hash) {
                if (this.shop.baseCharacters.indexOf(activeSkin.name) > -1) {
                    return true;
                } else {
                    return this.inventory.find(function(item) {
                        return item.id == activeSkin.id;
                    });
                }
            } else {
                return this.session.localSkins.find(function(item) {
                    return item.name == activeSkin.name;
                });
            }
        },
        isItemEquiped: function(activeSkin) {
            var item = this.inventory.find(function(item) {
                return item.id == activeSkin.id;
            });

            if (item) {
                return item.equiped;
            } else {
                return false;
            }
        },
        setShopTab: function(item) {
            this.tab = item.tab;
            this.shop.lootboxContent = false;

            pc.app.fire('Chest:Close', false);

            if (this.tab == 'Crates') {
                this.showItem3D(this.shop.crates[0]);
            }

            if (this.tab == 'Offers') {
                this.showItem3D(this.shop.offers[0]);
            }

            if (this.tab == 'Heroes') {
                this.showItem3D(this.shop.heroes[0]);
            }

            this.setViewState();
        },
        getWeeklyShopOffers: function(callback) {
            var self = this;

            this.fetchInventory();
            this.service('account', '?request=get_weekly_offer', {}, function(response) {
                if (response.success) {
                    app.shop.offers = response.offers;
                    app.shop.crates = response.crates;
                    app.shop.heroes = response.heroes;

                    app.shop.time_left = response.time_left;

                    if (callback) {
                        callback();
                    }
                }
            });
        },
        formatCrateRarities: function(rarities) {
            return rarities.split("\n");
        },
        setViewState: function() {
            if (this.page == 'Settings') {
                pc.app.fire('View:State', 'Pause');
            } else if (this.page == 'Pause' && this.pause.isPaused && this.session.isWaitingJoin) {
                //probably not needed since it will only work in game
                //pc.app.fire('View:State', 'ESC');
                pc.app.fire('View:State', 'Pause');
            } else if (this.page == 'Result' && this.mode == 'Menu') {
                pc.app.fire('View:State', 'Result');
            } else if (this.mode == 'Menu') {
                if (this.page == 'Home') {
                    pc.app.fire('View:State', 'Hero');
                } else if (this.page == 'Shop') {
                    var currentShopItem = this.getCurrentShopItem();

                    this.getWeeklyShopOffers();

                    if (currentShopItem) {
                        pc.app.fire('View:State', 'Shop', currentShopItem.view3D);
                    }
                } else {
                    pc.app.fire('View:State', 'Game');
                }
            } else {
                pc.app.fire('View:State', 'Game');
            }
        },
        getRandomShopBanner: function() {
            //get random banners from shop banners
            return 'url(' + this.shop.banners[Math.floor(Math.random() * this.shop.banners.length)] + ')';
        },
        getReforge: function() {
            pc.app.fire('Sound:Menu', 'MatchFound');
            pc.app.fire('View:State', 'Shop');
            app.reforge.isUnlocking = false;
            app.reforge.ready = false;
            app.shop.activeItem = false;

            app.reforge.isWaiting = false;
            app.reforge.selected = [0, 0, 0, 0, 0];

            this.fetchInventory(true, function() {

            });
        },
        getAvailableFirstReforgeSlot: function() {
            var slots = this.reforge.selected;

            for (var i = 0; i < slots.length; i++) {
                if (slots[i] === 0) {
                    return i;
                }
            }

            return -1;
        },
        getFilledFirstSlot: function() {
            var slots = this.reforge.selected;

            for (var i = 0; i < slots.length; i++) {
                if (slots[i] !== 0) {
                    return i;
                }
            }

            return -1;
        },
        filterReforgeItem: function(item) {
            var slot = this.getFilledFirstSlot();
            var count = this.reforge.selected.filter(function(item) {
                return item !== 0;
            }).length;

            if (count > 0) {
                return item.rarity == this.reforge.selected[slot].rarity;
            } else {
                return true;
            }
        },
        selectReforgeItem: function(item) {
            var count = this.reforge.selected.filter(function(item) {
                return item !== 0;
            }).length;

            if (count >= this.reforge.count) {
                app.alert('You can select a maximum of ' + this.reforge.count + ' items.');
                return false;
            }

            if (!item.quantityOriginalNumber) {
                //clone number
                item.quantityOriginalNumber = parseInt(item.quantityNumber + '');
            }

            if (item.quantityNumber > 0) {
                var slot = this.getAvailableFirstReforgeSlot();

                console.log(slot);
                if (slot > -1) {
                    this.reforge.selected[slot] = item;
                    item.quantityNumber--;
                }
            }
        },
        removeReforgeItem: function(item) {
            if (!item) {
                return false;
            }

            var index = this.reforge.selected.indexOf(item);

            this.reforge.selected[index] = 0;
            this.$forceUpdate();

            if (item.quantityNumber < item.quantityOriginalNumber) {
                item.quantityNumber++;
            }

            this.reforge.selectIndex--;
        },
        reforgeItems: function() {
            var itemIds = this.reforge.selected.map(function(item) {
                return item.id;
            });

            var count = this.reforge.selected.filter(function(item) {
                return item !== 0;
            }).length;

            if (this.reforge.ready) {
                this.getReforge();

                return false;
            }

            if (count < 3) {
                app.alert('Please select at least one item to reforge.');
                return false;
            }

            if (this.reforge.isUnlocking) {
                app.alert('Please wait for reforge process...');
                return false;
            }

            if (itemIds.length != this.reforge.count) {
                app.alert('Please select ' + this.reforge.count + ' items to reforge.');
                return false;
            }

            this.reforge.isWaiting = true;
            this.reforge.isUnlocking = true;
            this.reforge.ready = false;

            pc.app.fire('Sound:Menu', 'Reforge');
            pc.app.fire('Sound:Menu', 'Select');
            pc.app.fire('Sound:Menu', 'Unlock');

            setTimeout(function() {
                app.service('account', '?request=reforge', {
                    itemIds: itemIds,
                }, function(response) {
                    app.reforge.isUnlocking = false;
                    app.reforge.ready = true;
                    app.reforge.selected = [];

                    if (response.success) {
                        pc.app.fire('Sound:Menu', 'FinishReforge');
                        pc.app.fire('Sound:Menu', 'Unlock');

                        pc.app.fire('Reforge:Effect');

                        app.showItem3D(response.item);
                        pc.app.fire('Timeline:Weapons');
                    } else {
                        app.alert(response.message);
                    }
                });
            }, 2000);
        },

        defineCustomDOM: function() {
            this.setViewState();

            setTimeout(function(self) {
                self._defineCustomDOM();
            }, 10, this);
        },
        _defineCustomDOM: function() {
            var elements = document.querySelectorAll('.button-sound');
            var key = 0;

            elements.forEach(function(element) {
                element.onmouseover = function() {
                    if (typeof pc !== 'undefined' && key == 0) {
                        pc.app.fire('Sound:Menu', 'Hover');
                        key = 1;
                    }
                };

                element.onmousedown = function() {
                    if (typeof pc !== 'undefined') {
                        pc.app.fire('Sound:Menu', 'Click');
                    }
                };

                element.onmouseleave = function() {
                    //console.log('leave?');
                    key = 0
                };
            });
        },
        defineMonetization: function() {
            /*
            if(adblockEnabled){
            	this.monetization = 'xsolla';
            }else{
            	this.monetization = 'reward';
            }
            */

            //this.monetization = 'reward';
            this.monetization = 'xsolla';
        },
        onHomePage: function() {
            this.getProfileDetails();
            this.getInboxNotifications();

            this.setDOMWaiter(function() {
                app.showHomeBanner();
            });

            this.setMainHeroSkin();
        },
        setDOMWaiter: function(callback) {
            setTimeout(function(self) {
                callback();
            }, 100, this);
        },
        showHomeBanner: function() {
            var self = this;

            if (PokiSDK && !PokiSDK.isAdBlocked()) {
                this.homeBannerLoaded = false;

                PokiSDK.destroyAd(document.getElementById('home-banner'));
                PokiSDK.displayAd(document.getElementById('home-banner'), '728x90', function() {
                    self.homeBannerLoaded = true;
                });

                //5 second timeout
                setTimeout(function(self) {
                    self.homeBannerLoaded = true;
                }, 5000, this);
            } else {
                this.homeBannerLoaded = true;
            }
        },
        showResultBanner: function() {
            if (PokiSDK && !PokiSDK.isAdBlocked()) {
                PokiSDK.destroyAd(document.getElementById('result-banner'));
                PokiSDK.displayAd(document.getElementById('result-banner'), '728x90', function() {

                });
            }
        },
        showPauseBanner: function() {
            if (PokiSDK && !PokiSDK.isAdBlocked()) {
                PokiSDK.destroyAd(document.getElementById('pause-banner'));
                PokiSDK.displayAd(document.getElementById('pause-banner'), '728x90', function() {

                });
            }
        },
        sendChatMessage: function() {
            /*
            if(app.chat.message.length === 0){
            	var chatInput = document.getElementById('chat-message');	

            	if(chatInput){
            		chatInput.blur();
            	}

            	return false;
            }
            */

            if (app.chat.message.length > 0) {
                pc.app.fire('Network:Chat', app.chat.message);
                app.chat.message = '';
            }
        },
        setMVP: function(player, secondPlayer) {
            var better = 0;

            if (secondPlayer) {
                better = parseInt(secondPlayer.score * 100 / player.score);
            }

            this.result.mvp.username = player.username;
            this.result.mvp.better = better;

            if (player.isMe) {
                this.result.isWinning = true;
            } else {
                this.result.isWinning = false;
            }

            this.result.mvp.kdr = parseFloat(player.kill / player.death).toFixed(2);

            //check if it's infinity make it zero
            if (isNaN(this.result.mvp.kdr) || this.result.mvp.kdr === 'Infinity') {
                this.result.mvp.kdr = 0;
            }

            pc.app.fire('MVP:Select', player.skin);
            console.log(player.heroSkin, player);

            if (player.heroSkin != 'Default') {
                var customSkin = {};
                customSkin['Result:' + player.skin] = player.heroSkin;

                setTimeout(function(self) {
                    pc.app.fire('CustomSkin:Set', customSkin);
                }, 200, this);
            }
        },
        onPausePage: function() {
            this.setDOMWaiter(function() {
                app.showPauseBanner();
            });
        },
        onResultPage: function(players) {
            PokiSDK.gameplayStop();

            this.result.players = players;

            this.page = 'Result';
            this.mode = 'Menu';

            this.result.time = 20;

            //set MVP
            if (players && players.length > 1) {
                this.setMVP(players[0], players[1]);
            }

            this.transitionToggle(false);

            app.result.fadeOut = false;

            /*
            setTimeout(function(){
            	pc.app.fire('Sound:Menu', 'ResultFadeOut');
            	app.result.fadeOut = true;

            	setTimeout(function(){
            		app.transitionToggle(true);
            	}, 1500);

            	PokiSDK.customEvent('game', 'segment', { segment: 'result-next' });
            }, this.result.time * 1000);
            */

            this.setDOMWaiter(function() {
                app.showResultBanner();
            });

            PokiSDK.customEvent('game', 'segment', {
                segment: 'result-show'
            });
        },
        transitionToggle: function(state, mapName, mapMode) {
            if (state) {
                //pc.app.fire('Game:Mute', false);
                this.transition.active = true;

                if (mapName) {
                    pc.app.fire(
                        'Transition:Show',
                        mapMode,
                        mapName
                    );
                } else {
                    pc.app.fire(
                        'Transition:Show',
                        app.result.nextMode,
                        app.result.nextMap
                    );
                }
            } else {
                //pc.app.fire('Game:Mute', true);
                this.transition.active = false;

                pc.app.fire(
                    'Transition:Hide'
                );
            }
        }
    },
    mounted: function() {
        this.init();
        chat.init();
    },
    watch: {
        page: function() {
            //on page change
            this.defineCustomDOM();
            this.setViewState();

            if (this.page == 'Home') {
                this.onHomePage();
            }

            if (this.page == 'Result') {
                //this.onResultPage();
            }

            if (this.page == 'Pause') {
                this.onPausePage();
            }
        },
        mode: function() {
            this.setViewState();

            if (this.mode == 'Menu') {
                this.getClaimCampaign();
            }

            if (this.page == 'Home' && this.mode == 'Menu') {
                this.onHomePage();
            }
        },
        'session.character': function() {
            this.setMainHero();
        }
    }
});

document.body.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

window.addEventListener('keydown', ev => {
    if (['ArrowDown', 'ArrowUp'].includes(ev.key) && app.mode == 'Game') {
        ev.preventDefault();
    }
});

window.addEventListener('resize', ev => {
    if (app.mode == 'Menu') {
        app.resizePopup();
        app.resizeBanner();
    }
});

window.addEventListener('wheel', function(ev) {
    if (app.mode == 'Game') {
        ev.preventDefault();
    }
}, {
    passive: false
});

// Reload confirmation
window.onbeforeunload = function(event) {
    if (app.mode == 'Game') {
        event.preventDefault();
        event.returnValue = 'Reload Cancelled';
        return 'You have some unsaved changes';
    }
};