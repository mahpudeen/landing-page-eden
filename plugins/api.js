export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'appVersion' : process.env.APP_VERSION_API
        },
        baseURL: process.env.EDEN_URL,
    })

    const http = $axios.create({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        baseURL: process.env.DASHBOARD_URL,
    })

    const surl = $axios.create({
        baseURL: process.env.STRAPI_URL,
    })
  
    // Inject to context as $api
    inject('api', api)
    inject('http', http)
    inject('surl', surl)
}