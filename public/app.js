window.addEventListener('load', async () => {
    var canvas = document.getElementById('display_canvas');

    const connectionInfo = await SDK3DVerse.webAPI.createOrJoinSession(AppConfig.sceneUUID);

    SDK3DVerse.notifier.on('onLoadingStarted', () => document.getElementById("message").innerHTML = "Connecting...");
    SDK3DVerse.notifier.on('onLoadingProgress', (status) => document.getElementById("message").innerHTML = status.message);
    SDK3DVerse.notifier.on('onLoadingEnded', (status) => document.getElementById("message").innerHTML = status.message);

    SDK3DVerse.setupDisplay(canvas);
    SDK3DVerse.startStreamer(connectionInfo);

    SDK3DVerse.installExtension(SDK3DVerse_Gizmos_Ext);
    SDK3DVerse.connectToEditor();

    canvas.addEventListener(
        'mouseup',
        async (e) => {
            var keepOldSelection = e.ctrlKey || e.metaKey;
            var { entity } = await SDK3DVerse.engineAPI.castScreenSpaceRay(e.clientX, e.clientY, true, keepOldSelection);

            if (entity) {
                document.getElementById('selected_entity').innerHTML = `Selected entity : <strong>${entity.getName()}</strong>`;
            }
        },
        false
    );
    
    
    var cube;
    console.log("initialized cube");

    SDK3DVerse.engineAPI.findEntitiesByEUID('f82224d3-0203-4638-b30c-eb052de8cb5a').then(entities => {
        return cube = entities[0];
    })

    cube.setPosition([1, 1, 1]);
    console.log("cube position updated");

    SDK3DVerse.engineAPI.propagateChanges();

    console.log("end of code");

});


