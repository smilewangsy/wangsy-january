import { create } from '../common/create';

create({
  relations: {
    '../badge/index': {
      type: 'descendant',

      linked(target) {
        this.data.badges.push(target);
        this.setActive();
      },

      unlinked(target) {
        this.data.badges = this.data.badges.filter(item => item !== target);
        this.setActive();
      }
    }
  },

  props: {
    active: {
      type: Number,
      value: 0,
      observer: 'setActive'
    }
  },

  data: {
    badges: []
  },

  attached() {
    this.currentActive = -1;
  },

  methods: {
    setActive(badge) {
      let { active } = this.data;
      if (badge) {
        active = this.data.badges.indexOf(badge);
      }

      if (active === this.currentActive) {
        return;
      }

      if (this.currentActive !== -1) {
        this.$emit('change', active);
      }

      this.currentActive = active;
      this.data.badges.forEach((badge, index) => {
        badge.setActive(index === active);
      });
    }
  }
});
