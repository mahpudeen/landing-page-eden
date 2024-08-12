<template>
  <div class="menu" :class="{ active: isActive }">
    <div class="toggle" @click="toggleMenu">
      <b-icon icon="share"></b-icon>
    </div>
    <li v-for="(item, i) in items" :key="i" :style="getListItemStyle(i)">
      <a :href="item.url" target="_blank"><img v-lazy-load :src="item.img" alt=""></a>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      items: [],
    };
  },
  props: {
    tuangtuang: {
      type: Object,
    },
  },
  watch:{
    tuangtuang: {
      handler: function (val, oldVal) {
        this.items = [
          {
            img: require("~/assets/icons/tuang_instagram.png"),
            url: this.tuangtuang.instagram_url,
          },
          {
            img: require("~/assets/icons/tuang_tiktok.png"),
            url: this.tuangtuang.tiktok_url,
          },
          {
            img: require("~/assets/icons/tuang_tokopedia.png"),
            url: this.tuangtuang.tokopedia_url,
          },
          {
            img: require("~/assets/icons/tuang_shopee.png"),
            url: this.tuangtuang.shopee_url,
          },
          {
            img: require("~/assets/icons/tuang_tiktokshop.png"),
            url: this.tuangtuang.tiktokshop_url,
          },
        ];
      },
      deep: true,
    },
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },
    getListItemStyle(i) {
      return {
        "--i": i + 2,
        "--clr": '#CF1823',
      };
    },
  },
};
</script>

<style scoped>
.menu {
  position: fixed;
  width: 50px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 10px;
  bottom: 20px;
}
.menu .toggle {
  position: absolute;
  height: 40px;
  width: 40px;
  background: #CF1823;
  border: #fff 2px solid;
  border-radius: 50%;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 1.25s;
  z-index: 5;
}
.menu.active .toggle {
  transform: rotate(360deg);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15), 0 0 0 2px #CF1823, 0 0 0 8px #fff;
}
.menu li {
  position: absolute;
  left: -40px;
  list-style: none;
  transition: 0.5s;
  transform: rotate(calc(360deg / 8 * var(--i)));
  transform-origin: 70px;
  scale: 0;
  transition-delay: calc(0.05s * var(--i));
}
.menu.active li {
  scale: 1;
}
.menu li a {
  position: relative;
  display: flex;
  transform: rotate(calc(360deg / -8 * var(--i)));
  width: 30px;
  height: 30px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1rem;
  color: var(--clr);
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  transition: 0.5s;
}
.menu li:hover a {
  font-size: 1.15rem;
  box-shadow: 0 0 0 2px var(--clr), 0 0 0 6px #fff;
}
</style>
