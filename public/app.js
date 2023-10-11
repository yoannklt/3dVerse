var AppConfig = require('./AppConfig.js');

window.addEventListener('load', async () =>
            {
                const connectionInfo = await SDK3DVerse.webAPI.createOrJoinSession(AppConfig.sceneUUID);

                SDK3DVerse.notifier.on('onLoadingStarted', () => document.getElementById("message").innerHTML = "Connecting...");
                SDK3DVerse.notifier.on('onLoadingProgress', (status) => document.getElementById("message").innerHTML = status.message);
                SDK3DVerse.notifier.on('onLoadingEnded', (status) => document.getElementById("message").innerHTML = status.message);

                SDK3DVerse.setupDisplay(document.getElementById('display_canvas'));
                SDK3DVerse.startStreamer(connectionInfo);

            });

const setEntityWithEUID = async (EUID, entity) =>
{
    SDK3DVerse.engineAPI.findEntitiesByEUID(EUID).then(entities =>
        {  
            entity = entities[0];
        });
};
 
setEntityWithEUID('f82224d3-0203-4638-b30c-eb052de8cb5a', cube);

cube.setPosition([0, 0, 0]);
SDK3DVerse.propagateChanges();