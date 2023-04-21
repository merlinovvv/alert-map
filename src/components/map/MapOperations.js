export default function MapOperations(states) {
    console.log("БД", states);

    const pathElements = document.getElementsByTagName('path');

    for (let i = 0; i < states.length; i++) {
        const stateId = states[i].id;
        const stateAlert = states[i].alert;
        const stateChange = new Date(states[i].changed);
        const currentTime = new Date();
        for (let j = 0; j < pathElements.length; j++) {
            const pathId = Number(pathElements[j].getAttribute('id'));
            if (pathId === stateId) {
                if (stateAlert) {
                    pathElements[j].setAttribute('fill', currentTime - stateChange >= 3600000 ? 'rgba(255,0,0,0.4)' : 'rgba(255,0,0,0.5)');
                    pathElements[j].setAttribute('stroke', currentTime - stateChange >= 3600000 ? 'rgba(255,0,0,0.5)' : 'rgba(255,0,0,0.5)');
                    pathElements[j].setAttribute('fill', currentTime - stateChange >= 3600000 * 24 || stateChange === null ? 'rgba(255,0,0,0.1)' : 'rgba(255,0,0,0.35)');
                    pathElements[j].setAttribute('stroke', currentTime - stateChange >= 3600000 * 24 || stateChange === null ? 'rgba(255,0,0,0.8)' : 'rgba(255,0,0,0.5)');
                } else {
                    pathElements[j].setAttribute('fill', '#1E1E1E');
                    pathElements[j].setAttribute('stroke', '#3D3D3D')
                }
            }
        }
    }

    function nowTime() {
        const now = new Date();
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        const seconds = ('0' + now.getSeconds()).slice(-2);

        return `${hours}:${minutes}:${seconds}`;
    }

    console.log('pathElements has been updated!', nowTime());
}