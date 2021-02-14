<template>
  <div id="postNavbar" class="nav nav-border-bottom position-sticky anchor-top flex-inline flex-flow-row align-center justify-start width-full padding-xs card-enter-down">
    <router-link v-bind:to="{ name: 'Blog' }" class="button line-height-1">&#10094; See all posts</router-link>
  </div>
  <div class="width-max-960 width-full anchor-top margin-auto-horizontal padding-l">
    <article class="section">
      <div v-if="isLoading.postItem === false && isLoading.content === false" class="card card-enter padding-m">
        <div class="post-header width-full flex-inline flex-flow-column padding-xs-bottom">
          <h1 class="margin-xs-top margin-xs-bottom" style="line-height: 1.125;">{{ postItem.title }}</h1>
          <small class="timestamp text-color-secondary">{{ formatTimestamp(postItem.date) }}</small>
        </div>
        <hr class="margin-xs-top margin-m-bottom padding-none" />
        <div v-html="postMarkdown" class="post-content"></div>
      </div>
      <div v-else class="card">
        <div class="width-full align-center justify-center padding-xl text-align-center text-color-secondary">Loading...</div>
      </div>
    </article>
  </div>
</template>

<script>
import axios from 'axios';
import marked from 'marked';
import TimeAndDate from '@/utils/TimeAndDate.js';
import postManifest from '@/assets/post_manifest.json';

export default {
  name: 'Post',
  props: {
    id: String
  },
  data() {
    return {
      isLoading: {
        postItem: true,
        content: true
      },
      postItem: {
        title: "",
        date: {}
      },
      content: ""
    }
  },
  computed: {
    postMarkdown: function () {
      return marked(this.content);
    }
  },
  methods: {
    getPostContent(postPath) {
      this.isLoading.content = true;
      if (postPath !== null) {
        try {
          axios.get(postPath).then(response => {
            this.content = response.data;
            this.isLoading.content = false;
          });
        } catch (e) {
          console.warn(e);
        }
      }
    },
    formatTimestamp(timestamp) {
      return TimeAndDate.formatTimestamp(timestamp);
    }
  },
  mounted() {
    this.isLoading.postItem = true;
    if (postManifest) {
      for (var item of postManifest.posts) {
        if (item.id === this.id) {
          this.postItem = item;
          this.getPostContent(item.path);
          this.isLoading.postItem = false;
          break;
        }
      }
    }
  }
}
</script>

<style scoped>
article {
  font-family: 'Newsreader', var(--FONT-FAMILY-SYSTEM);
}

.post-header h1 {
  font-family: 'Newsreader', var(--FONT-FAMILY-SYSTEM);
  font-weight: 400;
  font-size: 3rem;
  letter-spacing: -1px;
}
.post-content {
  font-size: 1.5rem;
  line-height: 1.25;
  letter-spacing: -0.25px;
}

.timestamp {
  font-size: 0.9rem;
}
</style>
