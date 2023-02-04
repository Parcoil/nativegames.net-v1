ASSET_PREFIX = "";
SCRIPT_PREFIX = "";
SCENE_PATH = "1340773.json?v=" + VERSION;
CONTEXT_OPTIONS = {
    'antialias': false,
    'alpha': false,
    'preserveDrawingBuffer': false,
    'preferWebGl2': true,
    'powerPreference': 'high-performance'
};
SCRIPTS = [];
CONFIG_FILENAME = "config.json?v=" + VERSION;
INPUT_SETTINGS = {
    useKeyboard: true,
    useMouse: true,
    useGamepads: false,
    useTouch: true
};
pc.script.legacy = false;
PRELOAD_MODULES = [{
    'moduleName': 'Ammo',
    'glueUrl': 'https://venge.io/files/assets/31040882/1/ammo.wasm.js',
    'wasmUrl': 'https://venge.io/files/assets/31040883/1/ammo.wasm.wasm?v=1.0',
    'fallbackUrl': 'https://venge.io/files/assets/31040881/1/ammo.js?v=1.0',
    'preload': true
}];