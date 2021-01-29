export class Accordion {
    constructor(container, config) {
        this.config = config ? config : {}
        this.container = document.querySelector(container)
        this.init()
    }
    init() {
        if(this.container) {
            let btn = this.container.querySelector("[data-button]") 
            let el = this.container.querySelector("[data-panel]")

            if(btn && el) {
                let tl = gsap.timeline({reversed: true, paused: true})
                    tl.from(el, {height: 0, ease: Power2.easeOut})
                    tl.to(el, {height: el.scrollHeight + "px", ease: Power2.easeIn})

                btn.addEventListener("click", (e) => {
                    e.preventDefault()
                    tl.reversed() ? tl.play() : tl.reverse()
                })
            }
        }
    }
    // open(tl) {tl.play()}
    // close(tl) {tl.reverse()}
}