var Notify = require('notifyjs');

function doNotification(content, interval) {
    var myNotification = new Notify( content, {
        body: content + '-' + interval/1000,
        tag: 'unique tag',
        timeout: interval/1000,
        icon: 'assets/CD.jpg'
    });
    myNotification.show();

    //play a sound
    this.audio = new Audio('Kalimba.mp3');
    this.audio.play()

    setTimeout(()=>{
        if(this.audio){
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    }, 30000)
}

function onPermissionGranted() {
    console.log('Permission has been granted by the user');
    doNotification();
}

function onPermissionDenied() {
}

function doNotify(content, interval){
    if (!Notify.needsPermission) {
        this.doNotification(content, interval);
    } else if (Notify.isSupported()) {
        Notify.requestPermission(onPermissionGranted, onPermissionDenied);
    }
}

export {
    doNotification,
    onPermissionGranted,
    onPermissionDenied,
    doNotify
}
