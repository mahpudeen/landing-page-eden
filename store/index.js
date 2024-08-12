export const state = () => ({
    modeDesktop: true,
    offsetTop: 0,
    registerMitra: false,
    hideNavbar: false,
    onlyNuxt: true,
    modalTuang: false,
})
export const mutations = {
    setMode(state, value){
        state.modeDesktop = value
    },
    setOffsetTop(state, value){
        state.offsetTop = value
    },
    setRegisterMitra(state, value){
        state.registerMitra = value
    },
    setHideNavbar(state, value){
        state.hideNavbar = value
    },
    setOnlyNuxt(state, value){
        state.onlyNuxt = value
    },
    setModalTuang(state, value){
        state.modalTuang = value
    }
}