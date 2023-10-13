window.addEventListener('load', async () => {
    var canvas = document.getElementById('display_canvas');

    const connectionInfo = await SDK3DVerse.webAPI.createOrJoinSession(AppConfig.sceneUUID);

    SDK3DVerse.notifier.on('onLoadingStarted', () => document.getElementById("message").innerHTML = "Connecting...");
    SDK3DVerse.notifier.on('onLoadingProgress', (status) => document.getElementById("message").innerHTML = status.message);
    SDK3DVerse.notifier.on('onLoadingEnded', (status) => document.getElementById("message").innerHTML = status.message);

    SDK3DVerse.setupDisplay(canvas);

    const settings = {
        speed: 0.25,
        sensitivity: 0.1,
        damping: 0.65,
        angularDamping: 0.65
    };
    SDK3DVerse.updateControllerSetting(settings);

    SDK3DVerse.startStreamer(connectionInfo);

    const viewport = {
        id: 1,
        left: 0, top: 0, width: 1, height: 1,
        defaultControllerType: 4
    };


    SDK3DVerse.installExtension(SDK3DVerse_Gizmos_Ext);
    await SDK3DVerse.connectToEditor();

    
    await SDK3DVerse.setViewports([viewport]);
    SDK3DVerse.actionMap.setFrenchKeyboardBindings();
    SDK3DVerse.actionMap.propagate();
    
    var monstre;

    var entities = await SDK3DVerse.engineAPI.findEntitiesByEUID('2b934113-54ad-4497-9d53-ae3282fc716f');
    monstre = entities[0];

    SDK3DVerse.engineAPI.propagateChanges();
    
});


