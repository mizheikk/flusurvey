export function getGeolocation(options) {
    if (!navigator.geolocation) {
        return false
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
}
