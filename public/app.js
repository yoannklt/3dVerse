window.addEventListener('load', async () =>
{
    const connectionInfo = await SDK3DVerse.webAPI.createOrJoinSession(AppConfig.sceneUUID);

    SDK3DVerse.notifier.on('onLoadingStarted', () => document.getElementById("message").innerHTML = "Connecting...");
    SDK3DVerse.notifier.on('onLoadingProgress', (status) => document.getElementById("message").innerHTML = status.message);
    SDK3DVerse.notifier.on('onLoadingEnded', (status) => document.getElementById("message").innerHTML = status.message);

    SDK3DVerse.setupDisplay(document.getElementById('display_canvas'));
    SDK3DVerse.startStreamer(connectionInfo);

    async function setEntitiesWithEUID(EUID)
    { 
        return  SDK3DVerse.engineAPI.findEntitiesByEUID(EUID)[0]
    }

    var cube = setEntitiesWithEUID('f82224d3-0203-4638-b30c-eb052de8cb5a');

    cube.setPosition([1, 1, 1]);

    const commitChanges = () =>
    {
        SDK3DVerse.engineAPI.commitChanges();
    }

    const propagateChanges = () =>
    {
        SDK3DVerse.engineAPI.propagateChanges();
    }

    commitChanges();

    console.log("nique ta mère");

});


