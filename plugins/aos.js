import AOS from 'aos'
import 'aos/dist/aos.css'

export default ({ app }) => {
    app.AOS = new AOS.init({ 
        // AOS configuration options
        once: false,
        delay: 400,
        anchorPlacement: 'bottom-bottom'
    })
}
