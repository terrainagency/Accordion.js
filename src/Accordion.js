class Accordions {
    constructor(container, config) {
        this.accordions = this.build(container) 
        this.nested = config.nested || false
        this.open = config.open || false
        this.init()
    }
    build(container) {
        const accordions = container.querySelectorAll(".\\@accordion")
        let arr = []

        accordions.forEach(container => {
            let obj = {
                container: container,
                btn: container.querySelector(".\\@expand"),
                content: container.querySelector(".\\@content"),
                tl: gsap.timeline(),
                active: false,
            }
            arr.push(obj)
        })
        return arr
    }
    init() {
        this.accordions.forEach(accordion => {
            accordion.tl.from(accordion.content, {duration: 0.3, height: 0})

            accordion.open = () => {
                let scrollHeight = accordion.content.scrollHeight
                accordion.tl.to(accordion.content, {duration: 0.5, height: scrollHeight})
                accordion.container.classList.add('active')
                accordion.active = true
            }
            accordion.close = () => {
                accordion.tl.to(accordion.content, {duration: 0.3, height: 0})
                accordion.container.classList.remove('active')
                accordion.active = false
            }
            accordion.btn.addEventListener('click', (e) => {
                e.preventDefault()

                if(this.nested === true && accordion.active !== true) {
                    this.closeAll()
                }   

                accordion.active ? accordion.close() : accordion.open()    
            })
        }) 

        if(this.nested === true && this.open === true) {
            this.accordions[0].open()
        }
    }
    closeAll() {
        this.accordions.forEach(accordion => {
            accordion.close()
        })
    }
}