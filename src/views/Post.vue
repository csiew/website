<template>
  <div class="width-full margin-xl-bottom">
    <router-link v-bind:to="{ name: 'Blog' }" class="button">&#10094;</router-link>
  </div>
  <div class="width-max-640 width-full margin-auto-horizontal">
    <div class="section">
      <div v-if="isLoading.postItem === false" class="card padding-m">
        <div class="width-full flex-inline flex-flow-column padding-s-bottom">
          <h1 class="margin-xs-bottom" style="line-height: 1.125;">{{ postItem.title }}</h1>
          <small class="text-color-secondary">{{ this.formatTimestamp(postItem.date) }}</small>
        </div>
        <hr class="margin-none-top margin-m-bottom padding-none" />
        <div v-if="isLoading.content === false" v-html="postMarkdown"></div>
        <span v-else>
          <div class="width-full align-center justify-center padding-m text-align-center text-color-secondary">Loading...</div>
        </span>
      </div>
      <div v-else class="card">
        <div class="width-full align-center justify-center padding-xl text-align-center text-color-secondary">Loading...</div>
      </div>
    </div>
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
      return marked(this.content, { sanitized: true });
    }
  },
  methods: {
    getPostContent: function (postPath) {
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
    formatTimestamp: function (timestamp) {
      return TimeAndDate.formatTimestamp(timestamp);
    }
  },
  mounted: function () {
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