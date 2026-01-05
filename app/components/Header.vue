<script setup lang="ts" vapor>

const menu = [
  {
    name: 'Home',
    path: '/'
  }, {
    name: 'experience',
    path: '#experience'
  }, {
    name: 'Tech Stack',
    path: '#techstack'
  }, {
    name: 'Contact',
    path: '#contact'
  }
]
</script>
<template>
  <nav>
    <div class="header-content">
      <h1 style="font-size: 1.5rem;margin: 0;">Meanc/27y</h1>
      <ul class="header-menu">
        <li v-for="item in menu" :key="item.path">
          <a class="pixelify-sans" :href="item.path">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<style scoped>
nav {
  padding-left: var(--padding-layout);
  padding-right: var(--padding-layout);
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  padding: var(--padding-default);
}

.header-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;

  li {
    font-size: 0.9rem;

    a {
      text-decoration: none;
      color: inherit;
      opacity: 0.5;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }
    }
  }
}

@media (max-width: 750px) {
  .header-menu {
    display: none;
  }
}
</style>
